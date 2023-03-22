import Avatar from '@mui/material/Avatar';
import React, { useEffect, useState } from "react";
import DataUsageIcon from '@mui/icons-material/DataUsage';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import './Sidebar.css';
import SearchIcon from '@mui/icons-material/Search';
import SidebarChat from './SidebarChat';
import db from './Firebase';
import { useStateValue } from './StateProvider';

const Sidebar=()=>{

const[rooms,setRooms]= useState([]);
const [{user}, dispatch] = useStateValue();


useEffect(()=>{
    const unsubscribe = db.collection('rooms').onSnapshot((snapshot)=>
        setRooms(snapshot.docs.map((doc) =>
            ({
                id: doc.id,
                data: doc.data(),
            }))
            )
    );

    return () =>{
        unsubscribe();
    }
},[]);

    return(
        <>
        <div className="sidebar">
        <div className="sidebar_header">
            <Avatar src={user?.photoURL} />
            <div className="sidebar_headerRight">

                <IconButton>
                <DataUsageIcon />
                </IconButton>

                <IconButton>
                <SpeakerNotesIcon />
                </IconButton>

                <IconButton>
                <MoreVertIcon />
                </IconButton>

            </div>
        </div>
        <div className="sidebar_search">
            <div className='sidebar_searchContainer'>
            <SearchIcon />
            <input placeholder='search or start new chat' type='text' />
            </div>
        </div>

        <div className="sidebar_chats">
            <SidebarChat addNewChat />
            {rooms.map( (room) => (
                <SidebarChat 
                key={room.id} 
                id={room.id}
                name={room.data.name}
                />
            ))}
        </div>
        </div>
        </>
    )
}
export default Sidebar;