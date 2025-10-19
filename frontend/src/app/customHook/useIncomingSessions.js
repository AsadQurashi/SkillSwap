"use client";

import { useEffect, useState } from "react";
import { GetAllSessions, RespondSession } from "../services/sessionServices";
import socket from "../utils/socket";
import { getToken } from "../utils/token";

// Helper to decodew jwt
function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

export const useIncomingSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }

    const payload = parseJwt(token);
    const myId = payload?.sub;

    if (!myId) {
      setLoading(false);
      return;
    }

    // 1) Initial load
    (async () => {
      try {
        const data = await GetAllSessions(token);
        const incoming = data.filter(
          (s) => s.reciever_id === myId && s.status === "pending"
        );
        setSessions(incoming);
      } catch (err) {
        console.error("Faild to load session", err);
        setError("Faild to load session");
      } finally {
        setLoading(false);
      }
    })();

    const handleNewSession = (sessionsData) => {
      console.log(
        "Incoming session:",
        sessionsData,
        "myId:",
        myId,
        "typeof : ",
        typeof myId
      );
      if (
        sessionsData.reciever_id === Number(myId) &&
        sessionsData.status === "pending"
      ) {
        setSessions((prev) => [sessionsData, ...prev]);
        console.log("Sessions updated successfully");
      } else {
        console.log(
          "Incoming session:",
          sessionsData,
          "myId:",
          myId,
          "typeof : ",
          typeof myId
        );
        console.log("Session data not updated : ", sessionsData);
      }
    };

    socket.on("new_session", handleNewSession);

    // return () => {
    //   socket.off("new_session", handleNewSession);
    // };
    return () => socket.off("new_session", handleNewSession);
  }, []);

  // Helper for responding
  const respond = async (id, action) => {
    try {
      const token = getToken();
      await RespondSession(id, action, token);
      setSessions((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Responding failed : ", respond);
    }
  };

  return { sessions, loading, error, respond };
};


// need to explain