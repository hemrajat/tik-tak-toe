import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
function Signup(props) {
    
    const [firstName,setFirstname] = useState("");
    const [lastName,setLastName] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const cookies = new Cookies();

    const signUp = () => {
        if(firstName.length>0 && lastName.length>0 && username.length>0 && password.length>0){
            Axios.post("http://localhost:3002/signup" , {
                firstName,
                lastName,
                username,
                password
            }).then(res => {
                if(res.data.message){
                    alert(res.data.message);
                }
                else{
                    const {token,userId,firstName,lastName,username,HashedPassword} = res.data;
                    cookies.set("token",token);
                    cookies.set("userId",userId);
                    cookies.set("username",username);
                    cookies.set("firstName",firstName);
                    cookies.set("lastName",lastName);
                    cookies.set("HashedPassword",HashedPassword);
                    props.setAuth(true);
                }
            });
        }
    };
    return (
    <div className="signUp">
        <label>Signup</label>
        <input placeholder="First name" 
            onChange={(event) => {
                setFirstname(event.target.value);
        }}/>
        <input placeholder="Last name" 
            onChange={(event) => {
                setLastName(event.target.value);
        }}/>
        <input placeholder="Username" 
            onChange={(event) => {
                setUsername(event.target.value);
        }}/>
        <input placeholder="Password" type="password"
            onChange={(event) => {
                setPassword(event.target.value);
        }}/>
        <button onClick={signUp}>Sign up</button>
    </div>
    );
}
export default Signup;