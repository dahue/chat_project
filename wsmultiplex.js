const PORT = process.env.PORT || 3000;
const http = require('http');
const WebSocket = require('ws');

const httpServer = http.createServer( (request, response) => {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Welcome to wsevents app')
});

const wsServer = new WebSocket.Server({ server: httpServer });

wsServer.on('connection', (ws) => {
    console.log(`Client connected!`);
    ws.on('message', data => {
        let msg = {cmd: 'none'};
        try {
            msg = JSON.parse(data);
        } catch (_) {};
        console.log('Message: ' + data);
        if (msg.cmd && msg.cmd != 'ping') {
            // broadcast message
            wsServer.clients.forEach(client => {
                if (ws != client && client.readyState == WebSocket.OPEN) {
                    client.send(data);
                    console.log(`Data sent to client!`);
                }
            });
        }
    });
});

wsServer.on('close', ws => {
    console.log('Connection closed')
});

console.log('Server listening on port ' + PORT);

httpServer.listen(PORT)
