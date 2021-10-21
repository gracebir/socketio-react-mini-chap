import React, {useState} from 'react'

function Chat({socket, username, room}) {
    const [currentMessage, setCurrentMessage] = useState("");

    const sendMessage = () =>{
        if(currentMessage !== ""){
            const messageData = {
                room,
                author: username,
                message : currentMessage,
                time: new Date(Date.now()).getMinutes()+
                ":"+
                new Date(Date.now()).getMinutes()
            }
        }
    }


    return (
        <div>
            <div className="chat-header">
                <p>Live chat</p>
            </div>
            <div className="chat-body"></div>
            <div className="chat-footer">
                <input 
                onChange={(e)=> setCurrentMessage(e.target.value)}
                type="text" placeholder='hey...' />
                <button>&#9658;</button>
            </div>
        </div>
    )
}

export default Chat
