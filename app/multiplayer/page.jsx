'use client'
import React from 'react'
import {io} from 'socket.io-client'
import { useEffect } from 'react';

const socket=io('http://localhost:5000')
const page = () => {
    useEffect(()=>{
        socket.on('connect',()=>{
          socket.on('welcome',(data)=>{
            console.log(socket.id);
          })
          socket.emit('msg',"Thanks for connecting");
        })
        return ()=>{
          socket.off('connect');
        };
      },[])
  return (
    <div>
      
    </div>
  )
}

export default page
