import React, { useEffect, useState } from 'react';
import { users } from '../Joins/Join';
import socketIo from 'socket.io-client';
//import ReactScrollToBottom from "react-scroll-to-bottom";
import Message  from '../Message/Message';
import '../Chat/chat.css';
import sendLogo from "../../images/send.png";
import closeIcon from "../../images/closeIcon.png";
const ENDPOINT = 'http://localhost:4000/';

const Chat = () => {
	const [id, setid] = useState('');
	const [messages, setMessages] = useState([]);
    const [member,setMember]=useState([]);

	const socket = socketIo(ENDPOINT, { transports: ['websocket'] });
    const send = () => {
        const message = document.getElementById('chatInput').value;
        socket.emit('message', { message, room: users.room, id });
        document.getElementById('chatInput').value = '';
    };

	useEffect(() => {
		
		socket.on('connect', () => {
			//alert('connected');
            setid(socket.id);
		});
        
		socket.emit('joined', { user: users.user, room: users.room });
		socket.on('userJoined', ({user}) => {
            console.log("HEllo");
            console.log(user);
           let temp = member.push(user);

            setMember(temp);
            console.log(member);
			//console.log(data?.user, data?.message);
		});
        socket.on('sendMessage', (data) =>{ 
            let temp=messages;
            temp.push({user:data.user,id: data.id,message: data.message});
            setMessages([...messages,data]);
        });  
		return () => {
			socket.emit('disconnect', { room: users.room });
			//console.log('user left');
			socket.off();
		};
	}, []);


	return (
        <div className="chatPage">
        <div className="chatContainer">
            <div className="header">
                <h2>{users.room}</h2>
                <a href="/"><img src={closeIcon} alt="Close" /></a>
            </div >
            <ReactScrollToBottom className="chatBox">

                {messages.map((item) =>{
                return(<Message user={item} id={id}  key={item.id} />) }
                )}
            </ReactScrollToBottom>
            {/* {messages.map((item, i) => <Message key={i} user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} />)} */}
            <div className="inputBox">
                <input onKeyPress={(event) => event.key === 'Enter' ? send() : null} type="text" placeholder="Write message here....." id="chatInput" />
                <button onClick={send} className="sendBtn"><img src={sendLogo} alt="Send" /></button>
            </div>
        </div>

    </div>
    )
};

export default Chat;

