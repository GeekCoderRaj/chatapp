const http = require('http');
const express = require('express');
const cors = require("cors");
const socketIO = require('socket.io');
const app = express();
app.use(cors);
const PORT = 4000 || process.env.PORT;
const server= http.createServer(app);
app.get('/',(req,res)=>{
    res.send("<h1> I </h1>");
})
const users = [{}];
const roomuser=[{}];
const io=socketIO(server);

io.on("connection",(socket)=>{
    console.log("NEW CONNECTION");

    socket.on('joined',({user, room})=>{
        socket.join(room);
        users[socket.id]=user;
        //console.log(`${user} has joined`);
        socket.to(room).emit('userJoined',{user: user});
        console.log(users);
    })
    socket.on('message',({message,room,id})=>{
        console.log(message,room);

        socket.to(room).emit('sendMessage',{user:users[id],message,id});
        console.log("send");
    })
    socket.on('disconnect',(room)=>{
        socket.broadcast.to(room).emit('leave',{user:"Admin",message:`${users[socket.id]} has left`});
        console.log("user left");
    });
    socket.emit('welcome',{user:"Admin",message:'Welcome to the chat'});

})

server.listen(PORT,()=>{
    console.log(`PORT RUNNING at http://localhost:${PORT}`);
})

