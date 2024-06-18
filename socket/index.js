const socket = new WebSocket('wss://echo.websocket.org');

socket.onopen = function() {
    console.log('Connected to WebSocket server');
};

socket.onerror = function(error) {
    console.error('WebSocket Error: ', error);
};

socket.onclose = function() {
    console.log('WebSocket connection closed');
};

document.getElementById('sendButton').addEventListener('click', sendMessage);

function sendMessage() {
    const username = document.getElementById('usernameInput').value || 'Anonymous';
    const message = document.getElementById('messageInput').value;
    const fullMessage = `${username}: ${message}`;
    socket.send(fullMessage);
    addMessage(`${message}`);
    document.getElementById('messageInput').value = '';
}

socket.onmessage = function(event) {
    addMessage(`${event.data}`);
};

function addMessage(message) {
    const messagesContainer = document.getElementById('messagesContainer');
    const newMessage = document.createElement('div');
    const timestamp = new Date().toLocaleTimeString();
    newMessage.textContent = `[${timestamp}] ${message}`;
    messagesContainer.appendChild(newMessage);
}