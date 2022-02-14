import socketClient from "socket.io-client";
const SERVER = "http://localhost:3001";
export const socket = socketClient(SERVER);
