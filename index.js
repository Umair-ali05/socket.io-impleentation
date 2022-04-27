const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server, { cors: { origin: ['http://localhost:4000'] } });
require('dotenv').config()
const {
    PORT
} = process.env;
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
io.on('connection', (socket) => {
    console.log(`this is my user id ${socket.id}`);
})
io.on('connection', (socket) => {
    socket.on('chat message', (msg, room) => {
        if (room === "") {
            io.emit('chat message', msg)
        }else{
            socket.to(room).emit('chat message', msg)
        }
    });
    socket.on('join-room', (msg ,room) => {
            socket.join(room);
            io.to(room).emit('chat message' , msg);
    });
});
server.listen(PORT, () => {
    console.log(`app is running at port ${PORT}`);
})





