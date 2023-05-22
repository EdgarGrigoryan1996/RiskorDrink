import React, {useRef, useState} from 'react';
import s from "../Settings.module.css";
import {useDispatch, useSelector} from "react-redux";
import {setStatusFalse} from "../../../features/popupsStatus/popupsStatusSlice";
import {addPlayer, removePlayer, startGame} from "../../../features/gameSettings/gameSettingsSlice";
import Button from "../../Global/Button";
import {useTranslation} from "react-i18next";

function Tab4Component(props) {
    const {t, i18n} = useTranslation()
    const dispatch = useDispatch()

    const addPlayerRef = useRef(null)

    const gameSettings = useSelector((state) => {
        return state.gameSettings
    })

    const [name, setName] = useState("")

    const handleAddPlayer = () => {
        if(name === ""){
            alert("Անունը պարտադիր է")
        } else {
            dispatch(addPlayer({
                name:name,
            }))
            setName("")
        }
        addPlayerRef.current.focus()

    }
    const handleRemovePLayer = (id) => {
        dispatch(removePlayer({
            id
        }))
    }

    const handleStartGame = () => {
        dispatch(setStatusFalse())
        dispatch(startGame())
    }

    return (
        <>
            <div className={s.step4}>
                <div className={s.step4Title}>
                    <h2>{t("settings.step4.title")}</h2>
                </div>
                <div className={s.step4Items}>
                    <div className={s.addPlayer}>
                        <input
                            type="text"
                            ref={addPlayerRef}
                            placeholder={t("settings.step4.placeholder")}
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                            }
                            }/>
                        <div className={s.buttonBlock}>
                            <Button text={t("settings.step4.addButton")} onclick={handleAddPlayer} background={"#4b9555"} color={"#fff"}/>
                        </div>
                    </div>
                    <div className={s.flex}>
                        <div className={s.players}>
                            {gameSettings.players.map((player,i) => {
                                return (

                                        <div key={player.name + i}> {player.name}<span onClick={() => handleRemovePLayer(player.id)}>X</span></div>



                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className={gameSettings.players.length > 1 ? s.buttonBlock : s.hidden}>
                <Button text={t("settings.step4.startButton")} background={"#547888"} color={"#fff"} onclick={handleStartGame}/>
            </div>
        </>
    );
}

export default Tab4Component;