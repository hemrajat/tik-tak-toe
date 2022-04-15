import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useChannelStateContext, useChatContext } from "stream-chat-react";
import Square from "./Square";
import {Patterns} from "../WinningPattern";

function Board({result,setResult,players}) {
    const cookies = new Cookies();
    const [board,setBoard] = useState(["","","","","","","","",""]);
    const [player,setPlayer] = useState("X");
    const [turn,setTurn] = useState("X");
    const [currentUser,setCurrentUser] = useState('');
    const {channel} = useChannelStateContext();
    const {client} = useChatContext();
    const [foundW, setFoundW] = useState(false);

    useEffect(() =>{
        setFoundW(checkWin());
        const sendData = async()=>{
            await channel.sendEvent({
                type: "game-move",
                data: {username: cookies.get('username')},
              });
        }
        const stopChannel = async()=>{
            await channel.stopWatching();
        }
        if(foundW){
            sendData();
            stopChannel();
            setFoundW(false);

            alert(currentUser);
            
        }
        checkIfTie();
    },[board]);
    const chooseSquare = async (square) => {
        if (turn === player && board[square] === "") {
          setTurn(player === "X" ? "O" : "X");
         await channel.sendEvent({
            type: "game-move",
            data: { square, player, username: cookies.get('username')},
          });
        //   console.log(send);
        setCurrentUser(cookies.get('username'));
          setBoard(
            board.map(  (val, idx) => {
              if (idx === square && val === "") {
                return player;
              }
              return val;
            })
          );
        
        }
        
      };
    const checkIfTie = () => {
        let filled = true;
        board.forEach((square) => {
            if (square == "") {
            filled = false;
            }
        });
        if (filled) {
            alert("Game tired"); 
            // setResult({ winner: "none", state: "tie" });
        }
    };
    const checkWin = () => {
        let winner = false;
        Patterns.every( (currPattern) => {
            const firstPlayer = board[currPattern[0]];
            if(firstPlayer===""){
                return true;
            }
            let foundWinner = true;
            currPattern.forEach((idx) => {
                if(board[idx]!==firstPlayer){
                    foundWinner=false;
                }
            });
            console.log(foundWinner);
            if(foundWinner){
                winner = foundWinner;
                return false;
                // alert("Winner is " + firstPlayer);
                // setResult({winner: firstPlayer, state: "won"});
            }
            return true;
        })
        return winner;
    }
    channel.on((event) => {
        if (event.type == "game-move" && event.user.id !== client.userID) {
            console.log('gugcnuyy')
          const currentPlayer = event.data?.player === "X" ? "O" : "X";
        setCurrentUser(event.data.username);
          setPlayer(currentPlayer);
          setTurn(currentPlayer);
          setBoard(
            board.map((val, idx) => {
              if (idx === event.data?.square && val === "") {
                return event.data?.player;
              }
              return val;
            })
          );
        }
      });
    console.log('kjhghjfdsfawetrytugjhb');
    return (
        <div className="board">
            <div className="row">
                <Square chooseSquare={() => {
                    chooseSquare(0);
                }} val = {board[0]}/>
                <Square chooseSquare={() => {
                    chooseSquare(1);
                }}  val = {board[1]}/>
                <Square chooseSquare={() => {
                    chooseSquare(2);
                }}  val = {board[2]}/>
            </div>
            <div className="row">
                <Square chooseSquare={() => {
                    chooseSquare(3);
                }}  val = {board[3]}/>
                <Square chooseSquare={() => {
                    chooseSquare(4);
                }}  val = {board[4]}/>
                <Square chooseSquare={() => {
                    chooseSquare(5);
                }}  val = {board[5]}/>
            </div>
            <div className="row">
                <Square chooseSquare={() => {
                    chooseSquare(6);
                }}  val = {board[6]}/>
                <Square chooseSquare={() => {
                    chooseSquare(7);
                }}  val = {board[7]}/>
                <Square chooseSquare={() => {
                    chooseSquare(8);
                }}  val = {board[8]}/>
            </div>
        </div>
    )
};
export default Board;