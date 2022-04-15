import React, { useState } from "react";
import Board from "./Board";
function Game({channel,players}){
    const [playerJoined,setPlayerJoined] = useState(channel.state.watcher_count===2);
    const [result,setResult] = useState({winner:"none",state:"none"});
    channel.on("user.watching.start",(event)=>{
        setPlayerJoined(event.watcher_count===2);
    });
    if (!playerJoined){
        return (
            <div>
                Waiting for other player to join...
            </div>
        );
    }
    return (
        <div className="gameContainer ">
            <Board result = {result} setResult = {setResult} players={players}/>
        </div>
    );
};
export default Game;