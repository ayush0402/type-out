import { Server } from "socket.io";
import { createServer } from "http";
const httpServer=createServer()
const io=new Server(httpServer,{
    cors:{
        origin:'*'
    }
});

io.on('connection',(socket)=>{
    socket.emit('welcome',"welcome to the channel");
    socket.on('msg',(data)=>{
        console.log('msg fro client',data);
    })
})

httpServer.listen(5000,()=>{
    console.log("Server started on port 5000");
})