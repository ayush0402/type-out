'use client'
import React from 'react'
import { useState } from 'react'
import io from 'socket.io-client'

const socket=io('http://localhost:5000')
const JoinGame = () => {

    const [userInput,setuserInput]=useState({gameID:"",nickName:""});
    const onChange = e=>{
        setuserInput({...userInput,[e.target.name]:e.target.value});
    }

    const onSubmit=e=>{
        e.preventDefault();
        console.log(userInput);
        socket.emit('join-game',userInput);
    }
  return (
    <div className="row">
        <div className="col-sm"></div>
        <div className="col-sm-8">
            <h1 className="text-center">Join Game</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="gameID">Enter Room ID</label>
                    <input type="text" name="gameID" 
                    value={userInput.gameID}
                    onChange={onChange}
                    placeholder='Enter Game ID'
                    className="form-control"
                    />
                    <label htmlFor="nickName">Enter Nickname</label>
                    <input type="text" name="nickName" 
                    value={userInput.nickName}
                    onChange={onChange}
                    placeholder='Enter Nickname'
                    className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>

            </form>
        </div>
    </div>
  )
}

export default JoinGame
