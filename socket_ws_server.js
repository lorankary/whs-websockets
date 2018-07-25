// ws server  example from github/websockets/ws
// Serve websocket connections and give each client that
// connects a client number, issued consecutively.
// Greet each client that connects with a welcome message
// and notify all connected clients when one client disconnects.
// Clients may broadcast a message to all other clients
// that are currently connected.

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.nextClientNumber = 1;
// console.log(wss);
console.log('Server started on port 8080');

// Broadcast to all.
function broadcast(sender,data) {
  wss.clients.forEach(function each(client) {
    if (client != sender && client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', function connection(ws) {
    // Send a greeting to the newly connected client and
    // assign the client a number
    ws.clientNumber = this.nextClientNumber++;
    ws.send(JSON.stringify({
        to: ws.clientNumber,
        from: "server",
        text: "Greetings to client number " + ws.clientNumber
        }));
    console.log("We have a new client: " + ws.clientNumber);

    // When a client sends a message addressed to broadcast,
    // pass it on to all other clients.
    // Currently all messages from clients are broadcast.
    ws.on('message', function incoming(data) {
        let msg = JSON.parse(data);
        if(msg.to === "broadcast")
            broadcast(this, data);
    });

    // A close event will be generated when a client disconnects
    // and that is normally by closing the window.
    // Let all the other connected clients know.
    ws.on('close', function(code) {
        console.log("client " +  ws.clientNumber+ " disconnected " + code);
        broadcast(null, JSON.stringify({
            to: "broadcast",
            from: "server",
            text: "Client " + ws.clientNumber+ " has disconnected "
            }) );
        });
});
