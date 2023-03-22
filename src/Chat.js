import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import './Chat.css';
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import db from './Firebase';
import { useStateValue } from "./StateProvider";
import firebase from 'firebase/compat/app';


const Chat=()=>{
    const [input,setInput] = useState("");
    const [seed,setSeed] = useState("");
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();

    useEffect(()=>{
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot((snapshot) =>
                setRoomName(snapshot.data().name));

            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp','asc').onSnapshot((snapshot) =>
                setMessages(snapshot.docs.map((doc) => doc.data())
            ));
        }
    },[roomId]);

    useEffect(()=>{
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId]);

    const sendMessage=(e)=>{
        e.preventDefault();
        console.log("you typed >>>", input);
        db.collection('rooms').doc(roomId).collection('messages').add({
            message:input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })  
        setInput("");
    }


    return(
        <>
        <div className="chat">
            <div className="chat_header">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            
            <div className="chat_headerInfo">
                <h3>{roomName}</h3>
                <p>Last Seen...</p>
            </div>

            <div className="chat_headerRight">
                <IconButton>
                <SearchIcon />
                </IconButton>

                <IconButton>
                <AttachFileIcon />
                </IconButton>

                <IconButton>
                <MoreVertIcon />
                </IconButton>
            </div>

            </div> 

            <div className="chat_body">
                {messages.map((message) =>(
                     <p className={`chat_message ${message.name === user.displayName && 'chat_receiver'}`}>
                     <span className="chat_name">{message.name}</span>
                     {message.message}
                     <span className="chat_timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                     </p>
                ) )}
            </div> 

            <div className="chat_footer">
                <InsertEmoticonIcon />
                <form>
                    <input 
                    value={input} 
                    onChange={(e)=>setInput(e.target.value)} 
                    type="text" 
                    placeholder="Type a message.." 
                    />
                    <button onClick={sendMessage}>Send a Message</button>
                </form>
                <MicIcon />
            </div>
        </div>
        </>
    );
}
export default Chat;