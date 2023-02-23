import React from 'react'
import "./Login.css";
import Button from '@mui/material/Button';
import { auth, provider } from './Firebase';
import { actionTypes } from './Reducer';
import { useStateValue } from './StateProvider';

function Login() {
    const [{}, dispatch] = useStateValue();

    const signIn=()=>{
        auth.signInWithPopup(provider).then((result) => 
            {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                })
            }
            ).catch((error) => alert(error.message));
    };
  return (
    <div className='login'>
        <div className='login_container'>
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png' />
            <div className='login_text'>
                <h1>sign in to whatsapp</h1>
            </div>
            <Button variant="outlined" type='submit' onClick={signIn}>Sign In with Google</Button>
        </div>
    </div>
  )
}

export default Login