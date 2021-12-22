import React from 'react'
import "./Message.css";


const Message = ({ user, id }) => {
    console.log(user,id,"props");
    return user.id!==""?<div className={`messageBox ${user.id===user?"left":"right"}`}  >
                {`${user.id}: ${user.message}`}
            </div>:<div className={`messageBox ${user.id===user?"left":"right"}`}>
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