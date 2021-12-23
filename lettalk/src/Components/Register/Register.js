import React, { useState } from 'react'
import "./Register.css"


const Register = ({setname,visit,setvisit,Enter,setEnter}) => {
    const [Email, setEmail] = useState("");
    const [Name, setName] = useState("");
    const [Password,setPassword] = useState("");
    const change = () =>{
        setvisit(!visit);
    }
    const posting = async () =>{
        const data = {
            name: Name,
            email: Email,
            password: Password
        };
        const request = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        }
        //console.log(request);
        //console.log("send");
        const response = await fetch('http://localhost:6660/chat/register',request);
        const res = await response.json();
        //console.log("get");
        //console.log(res);
        if(res.success=== true)
        {
            setEnter(true);
            setname(res.name);
        }
    }
    return <div className="Page">
        <div className="Container">
        <input onChange={(e)=> setEmail(e.target.value)} placeholder="Email" type="text" className="joinChat"/>
<input onChange={(e)=> setName(e.target.value)} placeholder="Name" type="text" className="joinChat"/>
<input onChange={(e)=> setPassword(e.target.value)} placeholder="Password" type="password" className="joinChat" />
<p onClick={()=>change()} className="CompChange">Already registered</p>
<button onClick={()=>posting()} className="joinbtn">Submit</button>

        </div>
</div>         
    
}

export default Register
