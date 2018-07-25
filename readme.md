# Woodside High School websockets demonstration

A demonstration of websockets using the 'ws' node package

### Instructions

Clone this repo to a system that has node and npm installed.

In a terminal or command prompt window, change directory to the folder containing the cloned repo.

On the command line, type **npm install** [return].  That should install all the necessary node packages locally.

On the command line, type **node socket_ws_server.js** [return].  That should launch the websocket server.  You should see the message "Server started on port 8080".

In a browser, launch the index_ws.html file as many times as you want.  Each time you open index_ws.html in a browser, a new client will connect to the websocket server.

Messages between clients or from server to clients will be displayed in the browser window.

Type ctrl-c to stop the server.  Close a browser window to terminate a client.
