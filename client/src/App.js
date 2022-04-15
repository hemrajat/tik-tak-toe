import './App.css';
import React, { useState } from 'react';
import {StreamChat} from 'stream-chat';
import Cookies from "universal-cookie";
import Signup from "./components/SignUp";
import Login from "./components/Login"
import JoinGame from "./components/JoinGame"
import {Chat} from "stream-chat-react";
function App() {
  const api_key = "67r3hk2c5phb";
  const cookies = new Cookies();
  const token = cookies.get("token");
  const client = StreamChat.getInstance(api_key); 
  const [isAuth, setAuth] = useState(false);
  const logout = () =>{
    setAuth(false); 
    cookies.remove("userId");
    cookies.remove("username");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("HashedPassword");
    cookies.remove("token");
    cookies.remove("channelName");
    client.disconnectUser();
  }
  // if(token===undefined){
  //   console.log(token);
  // }
  if(token){
    client.connectUser(
      {
        id: cookies.get("userId"),
        name: cookies.get("username"),
        firstName: cookies.get("firstName"),
        lastName: cookies.get("lastName"),
        HashedPassword: cookies.get("HashedPassword"),
      },
      token
    ).then((user)=>{
      setAuth(true);
    });
  };
  return (
    <div className="App">
      {isAuth ? 
      <Chat client={client}>
        <JoinGame/>
        <button onClick={logout}>Log out</button>
      </Chat>
      : <>
      <Signup setAuth={setAuth}/>
      <Login setAuth={setAuth}/>
      </>
      }
      
    </div>
  );
}

export default App;
