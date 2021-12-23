import React from 'react'
import "./Message.css";


const Message = ({ user, id }) => {
    //console.log(user,id,"props");
    return (user.id!==id)?<div className="messageBox left"  >
                {`${user.user}: ${user.message}`}
            </div>:<div className="messageBox right">
                {`You: ${user.message}`}
           </div>    
}

export default Message