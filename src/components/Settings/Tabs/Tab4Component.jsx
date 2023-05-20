import React, {useState} from 'react';
import s from "../Settings.module.css";
import {useDispatch, useSelector} from "react-redux";
import {setStatusFalse} from "../../../features/popupsStatus/popupsStatusSlice";
import {addPlayer, startGame} from "../../../features/gameSettings/gameSettingsSlice";
import Button from "../../Global/Button";

function Tab4Component(props) {
    const dispatch = useDispatch()

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

    }

    const handleStartGame = () => {
        dispatch(setStatusFalse())
        dispatch(startGame())
    }

    return (
        <>
            <div className={s.step4}>
                <div className={s.step4Title}>
                    <h2>Մասնակիցներ</h2>
                </div>
                <div className={s.step4Items}>
                    <div className={s.addPlayer}>
                        <input
                            type="text"
                            placeholder={"Անուն"}
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                            }
                            }/>
                        <div className={s.buttonBlock}>
                            <Button text={"Ավելացնել"} onclick={handleAddPlayer} background={"#4b9555"} color={"#fff"}/>
                        </div>
                    </div>
                    <div className={s.flex}>
                        <div className={s.players}>
                            {gameSettings.players.map((player,i) => {
                                return (
                                    <div key={player.name + i}>{player.name}</div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className={gameSettings.players.length > 1 ? s.buttonBlock : s.hidden}>
                <Button text={"Սկսել"} background={"#547888"} color={"#fff"} onclick={handleStartGame}/>
            </div>
        </>
    );
}

export default Tab4Component;