import React from 'react';
import s from "./StartGame.module.css"
import {useDispatch, useSelector} from "react-redux";
import Players from "./Players/Players";
import Button from "../Global/Button";
import {
    removeChecks,
    setCurrentPlayerExtraDoing,
    setCurrentPlayerNormalDoing
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
            alert("extra")
            dispatch(setStartResultPopupStatus({
                status:true
            }))
            dispatch(setCurrentPlayerExtraDoing())
            dispatch(removeChecks())
        } else {
            alert("Standard")
            dispatch(setStartResultPopupStatus({
                status:true
            }))
            dispatch(setCurrentPlayerNormalDoing())
            dispatch(removeChecks())
        }
        console.log(currentPlayers)
    }
    return (
        <>
            {popups.startResultPopup && <StartResultPopup currentPlayers={currentPlayers}/>}
            <div className={s.startBlock}>
                <div><Button text={"Start"} background={"#555"} color={"#fff"} onclick={startGame}/></div>
                <div>
                    <Players players={props.players} isGameManual={gameSettings.isGameManual}/>
                </div>
            </div>

        </>

    );
}

export default StartGame;