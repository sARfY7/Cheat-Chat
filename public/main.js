window.onload = function() {
  var socket = io();

  var msg = document.getElementById("msg"),
    send = document.getElementById("send"),
    output = document.getElementById("output"),
    username = document.getElementById("username"),
    nickname_container = document.getElementById("nc"),
    container = document.getElementById("c"),
    nickname = "";

  username.focus();
  username.addEventListener("keypress", function(event) {
    if (event.keyCode == 13) {
      nickname = username.value;
      nickname_container.style.display = "none";
      container.style.display = "grid";
      msg.focus();
    }
  });

  send.addEventListener("click", function() {
    var d = new Date().toLocaleString("en-IN", {
      hour: "2-digit",
      minute: "2-digit"
    });
    socket.emit("message", { message: msg.value, user: nickname });
    var div = document.createElement("div"),
      h4 = document.createElement("h4"),
      p = document.createElement("p"),
      ts = document.createElement("div");
    div.className = "sender-flex";
    h4.className = "name";
    p.className = "sender";
    ts.className = "timestamp";
    var textnode = document.createTextNode(msg.value),
      timestamp = document.createTextNode(d),
      nameNode = document.createTextNode(nickname);

    div.appendChild(h4);
    h4.appendChild(nameNode);
    div.appendChild(p);
    p.appendChild(textnode);
    div.appendChild(ts);
    ts.appendChild(timestamp);

    output.appendChild(div);
    msg.value = "";
  });

  socket.on("message", function(data) {
    var d = new Date().toLocaleString("en-IN", {
      hour: "2-digit",
      minute: "2-digit"
    });
    var div = document.createElement("div"),
      h4 = document.createElement("h4"),
      p = document.createElement("p"),
      ts = document.createElement("div");
    div.className = "receiver-flex";
    h4.className = "name";
    p.className = "receiver";
    ts.className = "timestamp";
    var textnode = document.createTextNode(data.message),
      timestamp = document.createTextNode(d),
      nameNode = document.createTextNode(data.user);

    div.appendChild(h4);
    h4.appendChild(nameNode);
    div.appendChild(p);
    p.appendChild(textnode);
    div.appendChild(ts);
    ts.appendChild(timestamp);

    output.appendChild(div);
    window.scrollTo(0, document.body.scrollHeight);
  });

  msg.addEventListener("keypress", function(event) {
    if (event.keyCode == 13) {
      var d = new Date().toLocaleString("en-IN", {
        hour: "2-digit",
        minute: "2-digit"
      });
      socket.emit("message", { message: msg.value, user: nickname });
      var div = document.createElement("div"),
        h4 = document.createElement("h4"),
        p = document.createElement("p"),
        ts = document.createElement("div");
      div.className = "sender-flex";
      h4.className = "name";
      p.className = "sender";
      ts.className = "timestamp";
      var textnode = document.createTextNode(msg.value),
        timestamp = document.createTextNode(d),
        nameNode = document.createTextNode(nickname);

      div.appendChild(h4);
      h4.appendChild(nameNode);
      div.appendChild(p);
      p.appendChild(textnode);
      div.appendChild(ts);
      ts.appendChild(timestamp);

      output.appendChild(div);
      msg.value = "";
    }
  });
};
