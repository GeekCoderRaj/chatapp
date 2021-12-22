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
    //const [member,setMember]=useState([]);

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
            //setMember([...member,data?.user])
			console.log(data?.user, data?.message);
		});
        socket.on('sendMessage', (data) =>{ 
            console.log("receive");
            // setMessages(messages.push({id: data.id,msg: data.message})); ([...messages,{id: data.id,msg: data.message}])
            let temp=messages;
            temp.push({user:data.user,id: data.id,message: data.message});
            setMessages([...messages,data]);
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
                <h2>{users.room}</h2>
                <a href="/"><img src={closeIcon} alt="Close" /></a>
            </div >
            <div className="chatBox">

                {messages.map((item) => {console.log(item)
                return(<Message user={item} id={id}  key={item.id} />) }
                )}
            </div>
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

