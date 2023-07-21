'use client'
import React from 'react'
import { useState } from 'react'
import io from 'socket.io-client'
import {useRouter} from 'next/navigation'
import {uuid} from 'uuidv4';
const socket=io('http://localhost:5000')
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const CreateGame = () => {

    const [nickName,setNickname]=useState("");
    const supabase = createClientComponentClient();
    const onChange = e=>{
        setNickname(e.target.value);
    }
    const router=useRouter();
    const onSubmit= async (e)=>{
        e.preventDefault();
        let unique_id=uuid();
        
        const {data,error} = await supabase
        .from('Game_Lobbies')
        .insert({
            id: unique_id,
            isOpen: true,
    })
    .select("*")
    .single();
        socket.emit('create-game',nickName);
        router.push(`/multiplayer/${unique_id}`);
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
