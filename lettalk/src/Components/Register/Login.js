import React, { useState } from 'react'
import "./Register.css"

const Register = ({setname,visit,setvisit,Enter,setEnter}) => {
    const [Email, setEmail] = useState("");
    const [Password,setPassword] = useState("");
    const [error, seterror] = useState("");
    const change = () =>{
        setvisit(!visit);
    }
    const posting = async () =>{
        const data = {
            email: Email,
            password: Password
        };
        const request = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        }
        // console.log(request);
        // console.log("send");
        const response = await fetch('http://localhost:6660/chat/login',request);
        const res = await response.json();
        // console.log("login");
        // console.log(res);
        if(res.success=== true)
        {
            setEnter(!Enter);
            setname(res.name);
        }
        else{
            seterror(res.err);
        }
    }
    return <div className="Page">
    <div className="Container">
<input onChange={(e)=> setEmail(e.target.value)} placeholder="Email" type="text"  className="joinChat"/>
<input onChange={(e)=> setPassword(e.target.value)} placeholder="Password" type="password"  className="joinChat" />
<div id="error">{error}</div>
<p onClick={()=>change()} className="CompChange">Not registered yet</p>
<button onClick={()=>posting()} className="joinbtn">Submit</button>
</div>
</div>
    
}

export default Register
