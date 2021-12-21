import React from 'react'
import "./Message.css";


const Message = ({message}) => {
    console.log("hi");

        return (
            <div >
                {`You: ${message}`}
            </div>
        )
}

export default Message
