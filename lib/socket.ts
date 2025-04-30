import { io, Socket } from "socket.io-client";

const socket: Socket = io(
  (process.env.SOCKET_URL as string) || "http://localhost:3001",
);

export default socket;
