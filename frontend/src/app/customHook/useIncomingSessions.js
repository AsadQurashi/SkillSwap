"use client";

import { useState, useEffect, use } from "react";
import socket from "../utils/socket";
import { getToken } from "../utils/token";
import { GetAllSessions, RespondSession } from "../services/sessionServices";

// Helper to decodew jwt
function parseJwt(token)
{
    try {
        return JSON.parse(atob(token.split(".")[1]));
    }
    catch
    {
        return null;
    }
}

export const useIncomingSessions = async () =>
{
    const [session, setSession] = useState([]);
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
        } catch (err) {
          console.error("Faild to load session", err);
          setError("Faild to load session");
        } finally {
          setLoading(false);
        }
      })();
      // Socket Connect
      socket.connect();
      socket.emit("join", { token });

      const handleNewSession = (session) => {
        if (session.reciever_id === myId && session.status === "pending") {
          setSession((prev) => [session, ...prev]);
        }
      };

      socket.on("new_session", handleNewSession);
      return () => {
        socket.off("new_session", handleNewSession);
        socket.disconnect();
      };
    },[]);

    // Helper for responding
  const respond = async (id, action) => {
    try {
      const token = getToken();
      await RespondSession(id, action, token);
      setSession((prev) => prev.filter((s) => s.id !== id));
    }
    catch (err) {
      console.error("Responding failed : ", respond);
    }

  };

  return {session , loading , error , respond}
}


// need to explain