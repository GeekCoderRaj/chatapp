import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './join.css';
import Register from '../Register/Register';
import Login from '../Register/Login';
let users;

const Join = () => {
    const [name, setname] = useState("");
	const [room, setroom] = useState("");
	const [visit, setvisit]=useState(false);
	const [Enter,setEnter]=useState(false);
	const senduser = ()=>{
		const room=document.getElementById("joinRoom").value;
		document.getElementById('joinRoom').value="";
		users = {
			user: name,
			room
		}
	}
	return (!Enter)?(visit)?<Login visit={visit} setvisit={setvisit} setname={setname} Enter={Enter} setEnter={setEnter}/>:<Register setname={setname} visit={visit} setvisit={setvisit}  Enter={Enter} setEnter={setEnter}/>:    
		 <div className="JoinPage">
			<div className="JoinContainer">
				<h1>LetTalk</h1>
				<h1>Hi {name}</h1>
				<input onChange={(e)=> setroom(e.target.value)} placeholder="Room" type="text" id="joinRoom" />
				<Link to="/chat" onClick={(e)=> (!name? e.preventDefault():null) && (!room? e.preventDefault():null)}>
					<button onClick={senduser} className="joinbtn">LoginIN</button>
				</Link>
			</div>
		</div>

};
export default Join;
export {users};