import React, {useEffect, useState} from 'react';
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
import {BiDrink} from "react-icons/bi";

function StartResultPopup(props) {
    const dispatch = useDispatch()

    const [blockStatus, setBlockStatus] = useState(false)

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
        dispatch(addDoneDoing({
            playerId,
            doing
        }))
        setButtonsStatus([...buttonsStatus, {
            id:playerId,
            event:"done"
            }])
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
        dispatch(addCancelDoing({
            playerId,
            doing
        }))
        setButtonsStatus([...buttonsStatus,{
            id:playerId,
            event:"cancel"
        }])
    }

    useEffect(() => {
        if(currentPlayers.length === buttonsStatus.length){
            closePopup()
        }
        setBlockStatus(true)
    },[buttonsStatus])


    return (
        <div className={s.wrapper}>
            <div className={s.resultBlock + " " + (blockStatus && s.resultBlockActive)}>

                <div className={s.players}>
                    {props.currentPlayers.map((player,i) => {
                        return (
                            <div key={player.id} className={currentPlayers.length > 1 ? s.currentPlayerBlock : s.currentExtraPlayerBlock}>
                                <div className={s.name}>{player.name}</div>
                                <div className={s.doing}>{player.currentDoing}</div>
                                <div className={s.doingSuccess + " " + (buttonsStatus.filter((status) => status.id === player.id).length > 0 && s.disabledButtons)}>
                                    <span className={buttonsStatus.filter((status) => status.event === "done" && status.id === player.id).length > 0 && s.selectedEvent} onClick={() => doneDoing(player.id,player.currentDoing)}><MdDone color={"green"}/></span>
                                    <span className={buttonsStatus.filter((status) => status.event === "cancel" && status.id === player.id ).length > 0 && s.selectedEvent} onClick={() => cancelDoing(player.id,player.currentDoing)}> <BiDrink color={"rgb(213,56,56)"}/></span>
                                </div>
                            </div>
                        )
                    })}
                </div>
                {/* <Button
                    className={s.close + " " + (currentPlayers.length !== buttonsStatus.length && s.disabledButtons)}
                    text={"Փակել"}
                    background={"rgba(208,62,62,0.7)"}
                    color={"#fff"}
                    onclick={closePopup}
                /> */}


            </div>
        </div>
    );
}

export default StartResultPopup;