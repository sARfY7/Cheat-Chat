var express = require("express"),
  app = express(),
  socket = require("socket.io");

var server = app.listen(3000, function() {
  console.log("App started on port 3000");
});

app.use(express.static("public"));

var io = socket(server);

io.on("connection", function(socket) {
  console.log("Connection Established");

  socket.on("message", function(data) {
    socket.broadcast.emit("message", data);
  });
});
