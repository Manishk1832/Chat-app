const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const socketIO = require('socket.io');
require("dotenv").config();
const PORT  = process.env.PORT ;
const mongourl = process.env.MONGO_URL
const userRoutes = require('./Routes/userRouts');
const msgRoutes = require('./Routes/messagesRoutes')


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth",userRoutes);
app.use("/api/messages",msgRoutes);
  
const server = http.createServer(app);


const connectToDatabase = async ()=>{
    try{ 
        await mongoose.connect(mongourl)
        console.log('Database Connnected successfully')

    }
    catch(error){
        console.error("Error in Connecting database",error)

    }
}

connectToDatabase(); 


app.get('/',(req,res)=>{
    res.send('chat is working...')
})
 
server.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})

const io = socketIO(server,{
    cors:{
        origin:"http://localhost:5173",
        credentials:true
    }
});

global.onlineUsers = new Map();

io.on("connection",(socket)=>{
    global.chatSocket = socket;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id);
    });

    socket.on("send-msg",(data)=>{
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve",data.msg);
        }
    })
})



 