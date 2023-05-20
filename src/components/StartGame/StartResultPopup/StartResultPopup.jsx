import React from 'react';
import s from "./StartResultPopup.module.css"
import Button from "../../Global/Button";
import {useDispatch, useSelector} from "react-redux";
import {setStartResultPopupStatus} from "../../../features/popupsStatus/popupsStatusSlice";
import {resetCurrentPlayers} from "../../../features/gameSettings/gameSettingsSlice";
import {MdDone} from "react-icons/md";
import {TiCancel} from "react-icons/ti";

function StartResultPopup(props) {
    const currentPlayers = useSelector((state) => {
        return state.gameSettings.currentPlayers
    })
    const dispatch = useDispatch()
    console.log(currentPlayers)
    const closePopup = () => {
        dispatch(setStartResultPopupStatus({
            status:false
        }))
        dispatch(resetCurrentPlayers())
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
                                <div className={s.doingSuccess}>
                                    <span><MdDone color={"green"}/></span>
                                    <span><TiCancel color={"rgba(211,41,41,0.7)"}/></span>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <Button
                    className={s.close}
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