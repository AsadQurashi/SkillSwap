"use client";

import { useEffect } from "react";
import socket from "../utils/socket";
import { getToken } from "../utils/token";

export default function SocketProvider ({children})
{
    useEffect(() => {
        const token = getToken();
        if (!token)
        {
            console.warn("Token not found. Socket not connecting");
            return;
        }

        socket.connect();

        socket.on("connect", () => {
            console.log("✅ Socket connected");
            socket.emit("join", { token });
        });


        socket.on("disconnect", (reason) => console.warn("⚠️ Socket Disconnected", reason));
        
        // socket.on("new_session", (data) =>
        //     console.log("📩 New session recieved : ", data)
        // );

        socket.on("connect_error", (err) => console.error("Socket connection error : ", err));

        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.off("new_session");
            socket.off("connect_error");

        };
    }, []);

    return children;
}