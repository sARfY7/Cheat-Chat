var express = require("express"),
  app = express(),
  socket = require("socket.io");

var server = app.listen(process.env.PORT || 8081, function() {
  console.log("App started on port 8081");
});

app.use(express.static("public"));

var io = socket(server);

io.on("connection", function(socket) {
  console.log("Connection Established");

  socket.on("message", function(data) {
    socket.broadcast.emit("message", data);
  });
});
