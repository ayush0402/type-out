import React from 'react'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'

export default async function () {
    const supabase=createServerComponentClient({cookies});
    const {data:session_data} =  await supabase.from("session_data").select();
    return (
        <ul>
            {session_data?.map((user)=>(
                <li>{user.name}</li>
            ))}
        </ul>
    )
    
}

