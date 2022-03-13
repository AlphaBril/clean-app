import { Server, Socket } from "socket.io";
import { SocketData } from "./socket.d";

export const sockets = (io: Server, socket: Socket) => {
  const update = function (payload: SocketData) {
    console.log(payload);
    console.log("user updated");
  };
  const disconnect = function (reason: string) {
    console.log(reason);
    console.log("user disconnected");
  };
  const logout = function (payload: SocketData) {
    console.log(payload);
    console.log("user logged out");
  };
  socket.on("order:update", update);
  socket.on("disconnect", disconnect);
  socket.on("logout", logout);
};
