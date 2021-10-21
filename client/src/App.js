import './App.css';
import io from 'socket.io-client';
import { useState } from 'react';
import Chat from './Chat';

//https://www.youtube.com/watch?v=NU-HfZY3ATQ&t=883s

function App() {

  const socket = io.connect("http://localhost:3001")



  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")

  const joinRoom = () => {
    if(username !=="" && room!== ""){
      socket.emit("join_room", room);
    }
  }

  return (
    <div className="App">
     <h1>Join chat</h1>
     <div>
        <input 
        type="text" 
        placeholder='Your usernam' 
        value={username}
        onChange={(e)=> setUsername(e.target.value)} />
     </div>
     <div>
      <input 
        type="text" 
        value={room}
        placeholder='room'
        onChange={(e)=> setRoom(e.target.value)}
        />
     </div>
     <button onClick={joinRoom}>join room</button>

     <Chat socket={socket} username={username} room={room}/>
    </div>
  );
}

export default App;
