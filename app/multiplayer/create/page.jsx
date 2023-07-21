'use client'
import React from 'react'
import { useState } from 'react'
import io from 'socket.io-client'
import {uuid} from 'uuidv4';
const socket=io('http://localhost:5000')

const CreateGame = () => {

    const [nickName,setNickname]=useState("");
    const onChange = e=>{
        setNickname(e.target.value);
    }

    const onSubmit=e=>{
        e.preventDefault();
        socket.emit('create-game',nickName);
    }
  return (
    <div className="row">
        <div ></div>
        <div>
            <h1 >Create Game</h1>
            <form onSubmit={onSubmit}>
                <div >
                    <label htmlFor="nickName">Enter Nickname</label>
                    <input type="text" name="nickName" 
                    value={nickName}
                    onChange={onChange}
                    placeholder='Enter Nickname'
                    className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>

            </form>
        </div>
    </div>
  )
}

export default CreateGame
