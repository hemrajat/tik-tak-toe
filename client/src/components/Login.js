import React, { useState } from "react";
import Cookies from "universal-cookie";
import Axios from "axios";
function Login(props) {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const cookies = new Cookies();
    const login = () => {
        if(username.length>0 && password.length>0){
            Axios.post("http://localhost:3002/login" , {
                username,
                password 
            }).then(res => {
                if(res.data.message){
                    alert("Please signup first");
                }
                else{
                    const {token,userId,firstName,lastName,username} = res.data;
                    cookies.set("token",token);
                    cookies.set("userId",userId);
                    cookies.set("username",username);
                    cookies.set("firstName",firstName);
                    cookies.set("lastName",lastName);
                    props.setAuth(true);
                }
            });
        }
    };
    return (
        <div className="login ">
        <label>Log in</label>
        <input placeholder="Username" 
            onChange={(event) => {
                setUsername(event.target.value);
        }}/>
        <input placeholder="Password" type="password"
            onChange={(event) => {
                setPassword(event.target.value); 
        }}/>
        <button onClick={login}>Login</button>
    </div>
    );
}
export default Login;