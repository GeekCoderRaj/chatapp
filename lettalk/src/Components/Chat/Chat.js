import React, { useEffect, useState } from 'react';
import { users } from '../Joins/Join';
import socketIo from 'socket.io-client';
import ReactScrollToBottom from "react-scroll-to-bottom";
import Message  from '../Message/Message';
//import '../Chat/chat.css';
const ENDPOINT = 'http://localhost:4000/';

const Chat = () => {
	const [id, setid] = useState('');
	const [messages, setMessages] = useState([]);

	const socket = socketIo(ENDPOINT, { transports: ['websocket'] });
    const send = () => {
        const message = document.getElementById('chatInput').value;
        socket.emit('message', { message, room: users.room, id });
        document.getElementById('chatInput').value = '';
    };

	useEffect(() => {
		
		socket.on('connect', () => {
			alert('connected');
            setid(socket.id);
		});
		socket.emit('joined', { user: users.user, room: users.room });
		socket.on('welcome', (data) => {
			console.log(data?.user, data?.message);
		});
		socket.on('userJoined', (data) => {
			console.log(data?.user, data?.message);
		});
        socket.on('sendMessage', (data) =>{ 
            console.log("receive");
            // setMessages(messages.push({id: data.id,msg: data.message})); ([...messages,{id: data.id,msg: data.message}])
            let temp=messages;
            temp.push({user:data.user,id: data.id,message: data.message});
            setMessages(temp);
            console.log(temp,"kkk");
        });  
		return () => {
			socket.emit('disconnect', { room: users.room });
			console.log('user left');
			socket.off();
		};
	}, []);


	return (
        <div className="chatPage">
        <div className="chatContainer">
            <div className="header">
                <h2>C CHAT</h2>
                <a href="/"> CLose</a>
            </div>
            {/* <div> */}
                {messages.map((item) => {console.log(item)
                return(<Message user={item} id={id}  key={item.id} />) }
                )}
            {/* </div> */}
            {/* {messages.map((item, i) => <Message key={i} user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} />)} */}
            <div className="inputBox">
                <input onKeyPress={(event) => event.key === 'Enter' ? send() : null} type="text" id="chatInput" />
                <button onClick={send} className="sendBtn">Send</button>
            </div>
        </div>

    </div>
    )
};

export default Chat;

