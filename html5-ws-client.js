// const host = 'wss://wsevents.herokuapp.com/';
const host = 'ws://localhost:3000';
var ws;
connect();
// var ws = new WebSocket(host);

// function sendText(){
//     text = document.getElementById("message").value;
//     msg = '{"cmd":"text", "text":"'+text+'"}';
//     send(msg)

//     var message = document.createElement("message").value;
// }

// function send(msg) {
//     ws.send(JSON.stringify(msg));
// }

// ws.onmessage = (event) => {
//     try {
//         let msg = JSON.parse(event.data);
//         do_something(msg);
//     } catch (_) {};
// };

// function do_something(msg) {
//     // To do...
// }



function connect(){
    console.log(`Opening connection!`);
    // ws = new WebSocket(document.getElementById("serverUrl").value);
    ws = new WebSocket(host);
    ws.onopen = sendRegistry;
    // ws.onmessage = onMessage;
}

function disconnect(){
    ws.close(1000, "I leave the chat");
}

function sendRegistry(){
    text = document.getElementById("message").value;
    username = document.getElementById("username").value;
    msg = '{"cmd":"join", "join":"'+username+'"}';
    send(msg)
}

// function sendText(){
//     text = document.getElementById("message").value;
//     msg = '{"cmd":"text", "text":"'+text+'"}';
//     send(msg)

//     // show my message
//     var message = document.createElement("p");
//     message.setAttribute("class", "message myMessage");
//     message.insertHTML = text;

//     document.getElementById("messagesLog").appendChild(message);
//     document.getElementById("messagesLog").scroll(0, 1000);
// }

function send(msg) {
    ws.send(JSON.stringify(msg));
}

var onMessage = function receive(e) {
    var data = e.data;
    var receivedMsg = JSON.parse(data);
    var message = document.createElement("p");
    message.setAttribute("class", "message");
    if (receivedMsg.join)
        message.insertHTML = receivedMsg.join + " ha ingresado";
    if (receivedMsg.text)
        message.insertHTML = receivedMsg.text;
    var today = new Date();
    var hour = today.getHours();
    var minutes = today.getMinutes();
    message.inserHTML = message.insertHTML;
    // document.getElementById("messagesLog").appendChild(message);
    // document.getElementById("messagesLog").scroll(0, 100); 
}

// ping to maintain connection alive
setInterval(() => { send({cmd: "ping"}) }, 30000)