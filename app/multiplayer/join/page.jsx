'use client'
import React from 'react'
import { useState } from 'react'
import io from 'socket.io-client'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { errors } from '@/components/errors';
const socket=io('http://localhost:5000')
const JoinGame = () => {

    const [userInput,setuserInput]=useState({gameID:"",nickName:""});
    const onChange = e=>{
        setuserInput({...userInput,[e.target.name]:e.target.value});
    }
    const supabase = createClientComponentClient();
    const onSubmit=async (e)=>{
        e.preventDefault();
        //console.log(userInput.gameID);
        let ID=userInput.gameID.toString();
        const {game,err}=await supabase
            .from('Game_Lobbies')
            .select('*')
            .eq('id',ID);
           // console.log(game);
            if (err) {
                errors.add(err.message);
                throw err;
              }
            if(game===undefined){
                alert("Game not found!!!");
            }
            else{
        socket.emit('join-game',userInput);}
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
