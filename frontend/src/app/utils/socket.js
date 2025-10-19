import { io } from "socket.io-client";

const URL = process.env.NEXT_PUBLIC_API_URL;

let socket;
 
if (!socket)
{
   socket = io(URL, {
    autoConnect: false,
    transports: ["websocket"],
    reconnection: true,
   });
  // globalThis.socket = socket;
}




// console.log("Socket URL:", process.env.NEXT_PUBLIC_API_URL);

// socket.on("connect", () => {
//   console.log("✅ Connected to Socket.IO server");
//   const token = getToken();
//   if (token) {
//     socket.emit("join", { token });
//     console.log("📤 Sent join event with token");
//   } else {
//     console.warn("⚠️ No token found, cannot join room");
//   }
// });

// socket.on("new_session", (data) => {
//   console.log("📩 New session received:", data);
// });


// socket.on("connect_error", (err) => {
//   console.error("❌ Socket connect error:", err.message);
// });

// socket.on("disconnect", (reason) => {
//   console.warn("⚠️ Socket disconnected:", reason);
// });

export default socket;