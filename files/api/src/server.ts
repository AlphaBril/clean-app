import http from "http";
import app from "./app";
import { config as dotenvConfig } from "dotenv";
import { info } from "./shared/utils";
import { Server, Socket } from "socket.io";
import { sockets } from "./shared/socket/socket";

const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const normalizePort = (val: string | number) => {
  const normalizedPort = parseInt(val as string, 10) || (val as number);

  if (isNaN(normalizedPort)) return val;
  if (normalizedPort >= 0) return normalizedPort;
  return false;
};

dotenvConfig();
const port = normalizePort(process.env.PORT || "3001");
const getBind = () =>
  typeof server.address() === "string"
    ? `pipe${server.address()}`
    : `port ${port}`;

app.set("port", port);

const errorHandler = (error: NodeJS.ErrnoException) => {
  if (error.syscall !== "lister") throw error;
  const bind = getBind();

  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges.`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

export function getSocketIo() {
  return io;
}
const onConnection = (socket: Socket) => {
  info("New client connected with id : " + socket.id);
  socket.emit("connection", null);
  sockets(io, socket);
};
const onDisconnect = (socket: Socket) => {
  info("Client Disocnnected with id : " + socket.id);
  socket.emit("disconnect", null);
};
io.on("connection", onConnection);
io.on("disconnect", onDisconnect);

server.on("error", errorHandler);
server.on("listening", () => console.log(`Listening on ${getBind()}`));
server.listen(port);
