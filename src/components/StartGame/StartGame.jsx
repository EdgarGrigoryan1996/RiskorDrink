import React from 'react';
import s from "./StartGame.module.css"
import {useDispatch, useSelector} from "react-redux";
import Players from "./Players/Players";
import Button from "../Global/Button";
import {
    removeChecks,
    setCurrentPlayerExtraDoing,
    setCurrentPlayerNormalDoing,
    checkPLayer,
    addCurrentPlayer
} from "../../features/gameSettings/gameSettingsSlice";
import StartResultPopup from "./StartResultPopup/StartResultPopup";
import {setStartResultPopupStatus} from "../../features/popupsStatus/popupsStatusSlice";

function StartGame(props) {
    const dispatch = useDispatch()
    const gameSettings = useSelector((state) => {
        return state.gameSettings
    })
    const popups = useSelector((state) => {
        return state.popupsStatus
    })
    const currentPlayers = gameSettings.currentPlayers

    function startGame(){

        if(currentPlayers.length === 0){
            alert("Check Players")
        } else if (currentPlayers.length === 1) {
            dispatch(setStartResultPopupStatus({
                status:true
            }))
            dispatch(setCurrentPlayerExtraDoing())
            dispatch(removeChecks())
        } else {
            dispatch(setStartResultPopupStatus({
                status:true
            }))
            dispatch(setCurrentPlayerNormalDoing())
            dispatch(removeChecks())
        }

    }
    function startGameAuto(){

        const player1 = gameSettings.players[Math.floor(Math.random() * gameSettings.players.length)]
        const player2 = gameSettings.players[Math.floor(Math.random() * gameSettings.players.length)]
    
        if(player1 !== player2){
            dispatch(checkPLayer({
                id:player1.id
            }))
            dispatch(checkPLayer({
                id:player2.id
            }))
            dispatch(addCurrentPlayer())
            dispatch(setStartResultPopupStatus({
                status:true
            }))
            dispatch(setCurrentPlayerNormalDoing())
            dispatch(removeChecks())
        } else {
            dispatch(checkPLayer({
                id:player1.id
            }))
            dispatch(addCurrentPlayer())
            dispatch(setStartResultPopupStatus({
                status:true
            }))
            dispatch(setCurrentPlayerExtraDoing())
            dispatch(removeChecks())
        }
    }
    return (
        <>
            {popups.startResultPopup && <StartResultPopup status={popups.startResultPopup} currentPlayers={currentPlayers}/>}
            <div className={s.startBlock}>
                <div><Button text={"Start"} background={"#555"} color={"#fff"} onclick={gameSettings.isGameManual ? startGame : startGameAuto}/></div>
                <div>
                    <Players players={props.players} isGameManual={gameSettings.isGameManual}/>
                </div>
            </div>

        </>

    );
}

export default StartGame;