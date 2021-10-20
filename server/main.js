const express = require('express');
const http = require('http');
const cors = require('cors');

const app = express()

app.use(cors())

const server = http.createServer(app);

server.listen(3001,()=>{
    console.log("server running")
})
