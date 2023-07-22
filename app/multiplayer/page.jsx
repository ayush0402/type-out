'use client'
import React from 'react'
import {io} from 'socket.io-client'
import { useEffect ,useState} from 'react';
import CreateGame from './create/page'
//import {createBrowserHistory} from 'History';
//const history =createBrowserHistory();
const socket=io('http://localhost:5000')
const page = () => {

    const [gameState,setGameState] = useState({_id:"",isOpen:false,players:[],words:[]});
    useEffect(()=>{
        socket.on('updateGame',(game)=>{
          
            console.log(game);
            setGameState(game);
           // 
          socket.emit('msg',"Thanks for connecting");
        })
        return ()=>{
          socket.removeAllListeners();
        }
      },[]);
      useEffect(()=>{
        if(gameState._id!=""){
          //history.push(`/game/${game._id}`);
        }
      },[gameState._id]);
  return (
    <div>
      
    </div>
  )
}

export default page
