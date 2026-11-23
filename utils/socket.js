import { io } from "socket.io-client";

let socket = null;

export const getSocket = () => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_API_URL, {
      auth: { token: localStorage.getItem("token") },
    });
  }
  return socket;
};

export const closeSocket = () => {
  if (socket) socket.disconnect();
  socket = null;
};