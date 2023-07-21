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
    socket.on('join-game',async ({gameID: _id,nickName})=>{
        try{
            //use supabase to check if 
            //room exist 
            if(game.isOpen){
                const gameID=game._id.toString();
                socket.join(gameID);
                let player ={
                    socketID: socket.id,
                    nickName
                }
                game.players.push(player);
                game=await game.save();

                io.to(gameID).emit('updateGame',game);
            }
        }
        catch(err){
            console.log(err);
        }
    })
    socket.on('create-game',async (nickName)=>{
        try{
            const quotableData=await Text_Api();
            let game=new Game();
            game.text=quotableData;
            let player={
                socketID: socket.id,
                isHost:true,
                nickName
            }
            game.players.push(player);
            game= await game.save();

            const gameID=game._id.toString();
            socket.join(gameID);

            io.to(gameID).emit('updateGame',game);
        }
        catch{
            console.log(err);
        }
    })
})

httpServer.listen(5000,()=>{
    console.log("Server started on port 5000");
})