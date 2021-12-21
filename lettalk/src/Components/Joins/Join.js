import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './join.css';
let users;
const senduser = ()=>{
	const user=document.getElementById("joinInput").value;
	document.getElementById('joinInput').value="";
	const room=document.getElementById("joinRoom").value;
	document.getElementById('joinRoom').value="";
	users = {
		user,
		room
	}
}
const Join = () => {
    const [name, setname] = useState("");
	const [room, setroom] = useState("");
	return (
		<div className="JoinPage">
			<div className="JoinContainer">
				chat
				<input onChange={(e)=> setname(e.target.value)} placeholder="Enter your name" type="text" id="joinInput" />
				<input onChange={(e)=> setroom(e.target.value)} placeholder="Room" type="text" id="joinRoom" />
				<Link to="/chat" onClick={(e)=> (!name? e.preventDefault():null) && (!room? e.preventDefault():null)}>
					<button onClick={senduser} className="joinbtn">LoginIN</button>
				</Link>
			</div>
		</div>
	);
};
export default Join;
export {users};