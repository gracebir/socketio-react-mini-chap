const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io')

const app = express()

app.use(cors())

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:'http://localhost:3000',
        methods: ["POST","GET"]
    }
})

io.on("connection",(socket)=>{
    console.log(socket.id);
    socket.on("disconnect",()=>{
        console.log("user disconnected")
    })
})

server.listen(3001,()=>{
    console.log("server running")
})
