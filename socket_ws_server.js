// ws server broadcast example from github/websockets/ws

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
// console.log(wss);
console.log('Server started on port 8080');

// Broadcast to all.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', function connection(ws) {
  console.log("We have a new client: " + ws);

  ws.on('message', function incoming(data) {
    // Broadcast to everyone else.
    console.log("message from client "  + data);
    ws.send("hello client");
    var myObj = { text: "Hello Client" };
    ws.send(JSON.stringify(myObj));
    // ws.send(myObj);

    console.log(wss.clients.size);
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
  ws.on('close', function(code) {
    console.log("client disconnected " + code);
    console.log(wss.clients.size);
    });
});
