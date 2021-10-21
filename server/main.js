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
    console.log(`User connected: ${socket.id}`);

    socket.on("join_room", (data)=>{
        socket.join(data)
        console.log(`user with id: ${socket.id} join room ${data}`)
    })
    socket.on("disconnect",()=>{
        console.log("user disconnected")
    })

})

server.listen(3001,()=>{
    console.log("server running")
})
