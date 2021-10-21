import React, {useState, useEffect} from 'react'
import ScrollToBottom from 'react-scroll-to-bottom';


function Chat({socket, username, room}) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);


    const sendMessage = async() =>{
        if(currentMessage !== ""){
            const messageData = {
                room,
                author: username,
                message : currentMessage,
                time: new Date(Date.now()).getHours()+
                ":"+
                new Date(Date.now()).getMinutes()
            }
            await socket.emit("send_message", messageData);
            console.log("message it")
            setMessageList((list)=> [...list, messageData])
            setCurrentMessage(" ");
        }
    }

 
    useEffect(()=>{
        socket.on("receive_message",(data)=>{
            console.log(data)
            setMessageList((list)=> [...list, data])
        })
    },[socket])

    return (
        <div className='chat-window'>
            <div className="chat-header">
                <p>Live chat</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                {messageList.map(({message,time, author}, i)=>{
                    return <div className='message' id={username === author ? "you" : "other"} key={i}>
                        <div>
                            <div className='message-content'>
                                <p>{message}</p>
                            </div>
                            <div className="message-meta">
                                <p id="time">{time}</p>
                                <p id='author'>{author}</p>
                            </div>
                        </div>
                    </div>
                })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input 
                onChange={(e)=> setCurrentMessage(e.target.value)}
                type="text" 
                onKeyPress={(event) => {
                    event.key === "Enter" && sendMessage();
                  }}
                placeholder='hey...' />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    )
}

export default Chat
