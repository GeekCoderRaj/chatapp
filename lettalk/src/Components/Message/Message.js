import React from 'react'
import "./Message.css";


const Message = ({ user, id }) => {
    console.log(user,id,"props");
    return (user.id!==id)?<div className="messageBox left"  >
                {`${user.user}: ${user.message}`}
            </div>:<div className="messageBox right">
                {`You: ${user.message}`}
           </div>
    
    // console.log(user,message,classs);
    // if (user!=="") {
    //     return (
    //         <div className={`messageBox ${classs}`}  >
    //             {`${user}: ${message}`}
    //         </div>
    //     )
    // }
    // else {
    //     return (
    //         <div className={`messageBox ${classs}`}>
    //             {`You: ${message}`}
    //         </div>
    //     )
    // }
}

export default Message