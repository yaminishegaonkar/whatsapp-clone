import React, { useState } from "react";
import './SidebarChat.css';
import Avatar from '@mui/material/Avatar';
import { useEffect } from "react";
import db from './Firebase';
import { Link } from "react-router-dom";

const SidebarChat=({id, name, addNewChat})=>{

   const [seed, setSeed] = useState('');
   useEffect(()=>{
    setSeed(Math.floor(Math.random() * 5000))
   },[]);

   const createChat=()=>{
        const roomName = prompt("please enter name for chat");
        if(roomName) {
            //do some clever database stuff...
            db.collection('rooms').add({
                name: roomName,
            });
        }
   };
    
    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
        <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat_info">
            <h2>{name}</h2>
            <p>last message</p>
        </div>
        </div>
        </Link>
    ) : (
        <div onClick={createChat} className="sidebarChat">
            <h2>Add New Chat</h2>
        </div>

    );
}
export default SidebarChat;