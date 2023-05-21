import React, {useState} from 'react';
import s from "./StartResultPopup.module.css"
import Button from "../../Global/Button";
import {useDispatch, useSelector} from "react-redux";
import {setStartResultPopupStatus} from "../../../features/popupsStatus/popupsStatusSlice";
import {
    addCancelDoing,
    addDoneDoing,
    removeDoingFromList,
    resetCurrentPlayers
} from "../../../features/gameSettings/gameSettingsSlice";
import {MdDone} from "react-icons/md";
import {TiCancel} from "react-icons/ti";

function StartResultPopup(props) {
    const dispatch = useDispatch()

    const currentPlayers = useSelector((state) => {
        return state.gameSettings.currentPlayers
    })

    const [buttonsStatus, setButtonsStatus] = useState([])

    const closePopup = () => {
        dispatch(setStartResultPopupStatus({
            status:false
        }))
        dispatch(resetCurrentPlayers())
    }
    const doneDoing = (playerId,doing) => {
        console.log("Added")
        dispatch(addDoneDoing({
            playerId,
            doing
        }))
        setButtonsStatus([...buttonsStatus,playerId])
        if(currentPlayers.length === 1){
            dispatch(removeDoingFromList({
                extraMode:true,
                doing
            }))
        } else {
            dispatch(removeDoingFromList({
                extraMode:false,
                doing
            }))
        }

    }

    const cancelDoing = (playerId,doing) => {
        console.log("AddedCancel")
        dispatch(addCancelDoing({
            playerId,
            doing
        }))
        setButtonsStatus([...buttonsStatus,playerId])
    }
    return (
        <div className={s.wrapper}>
            <div className={s.resultBlock}>

                <div className={s.players}>
                    {props.currentPlayers.map((player) => {
                        return (
                            <div key={player.id} className={currentPlayers.length > 1 ? s.currentPlayerBlock : s.currentExtraPlayerBlock}>
                                <div className={s.name}>{player.name}</div>
                                <div className={s.doing}>{player.currentDoing}</div>
                                <div className={s.doingSuccess + " " + (buttonsStatus.includes(player.id) && s.disabledButtons)}>
                                    <span onClick={() => doneDoing(player.id,player.currentDoing)}><MdDone color={"green"}/></span>
                                    <span onClick={() => cancelDoing(player.id,player.currentDoing)}> <TiCancel color={"rgba(211,41,41,0.7)"}/></span>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <Button
                    className={s.close + " " + (currentPlayers.length !== buttonsStatus.length && s.disabledButtons)}
                    text={"Փակել"}
                    background={"rgba(208,62,62,0.7)"}
                    color={"#fff"}
                    onclick={closePopup}
                />


            </div>
        </div>
    );
}

export default StartResultPopup;