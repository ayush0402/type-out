import React from 'react'
import TypingCard from './TypingCard'
import Speed from './Speed'
import NavHeader from './NavHeader'
import Preview from './Preview'
import { Redirect } from 'next'
import {io} from 'socket.io-client'
const socket=io('http://localhost:5000')
const findPlayer = players =>{
    return players.find(player=>player.socketID===socket.id)
}
const TypeOut = ({gameState}) => {
    const {_id,players}=gameState;
    const player=findPlayer(players);

    if(_id===""){
        return <Redirect to="/"/>
    }
  return (
    <div >
      
    </div>
  )
}

export default TypeOut
