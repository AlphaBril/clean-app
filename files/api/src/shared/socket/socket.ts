module.exports = (io: any, socket: any) => {
  const update = function (payload: any) {
    console.log("user updated");
  };
  const disconnect = function (payload: any) {
    console.log("user disconnected");
  };
  socket.on("order:update", update);
  socket.on("disconnect", disconnect);
  socket.on("logout", disconnect);
};
