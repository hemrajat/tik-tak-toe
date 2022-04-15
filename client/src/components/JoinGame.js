import React, { useState } from "react";
import { useChatContext, Channel } from "stream-chat-react";
import Game  from "./Game";
function JoinGame(props) {
    const [rivalUsername,setRivalUsername] = useState("");
    const [channel, setChannel] = useState(null);
    const [players,setPlayers] = useState({first:"none",second:"none"});
    const {client} = useChatContext();
    const createChannel = async () => {
        const response = await  client.queryUsers({name : {  $eq: rivalUsername}});
        if(response.users.length===0){
            alert("User not found");
            return;
        }
        console.log(client.userID,response.users[0].id);
        const newChannel = await client.channel("messaging",{
            members: [client.userID,response.users[0].id],
        });
        // console.log(newChannel);
        // console.log(client);
        await newChannel.watch();
        setChannel(newChannel);
        setPlayers({first:client.userID,second: rivalUsername});
    };
    return (
        <>
        {channel ? (
            <Channel channel={channel}>
                <Game channel={channel} players={players}/>
            </Channel>
        ) : (
            <div className="joinGame">
            <h4>Create Game</h4>
            <input
                placeholder="Username of rival..."
                onChange={(event) => {
                setRivalUsername(event.target.value);
                }}
            />
            <button onClick={createChannel}> Join/Start Game</button>
            </div>
        )}
        </>
    );
}
export default JoinGame;