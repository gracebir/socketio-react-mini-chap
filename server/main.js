const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io')
require('dotenv').config();
const path = require('path');


const app = express()

app.use(cors())


if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, './client/build')));

  app.get("/",(req,res)=>{
      res.sendFile(path.join(__dirname,'client','build','index.html'))
  })
} else {
  app.get('/', (req,res)=>{
      res.send('Api running');
  })
}


const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:'http://localhost:3000',
        methods: ["POST","GET"]
    }
})

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
  
    socket.on("join_room", (data) => {
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });
  
    socket.on("send_message", (data) => {
      socket.to(data.room).emit("receive_message", data);
    });
  
    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });
  


  const port = process.env.PORT || 3001;

server.listen(port,()=>{
    console.log("server running")
})
