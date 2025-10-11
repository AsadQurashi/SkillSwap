import { io } from "socket.io-client";

const URL = process.env.NEXT_PUBLIC_API_URL;

const socket = io(URL, {
    autoConnect: false,
    transports: ["websocket"],
});

export default socket;