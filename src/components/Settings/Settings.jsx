import React, {useState} from 'react';
import s from "./Settings.module.css"
import {useDispatch, useSelector} from "react-redux";
import {addPlayer, setGameMode, setGenderPlayers, startGame} from "../../features/gameSettings/gameSettingsSlice";
import {doings} from "../../doings/doings";
import {setStatusFalse} from "../../features/popupsStatus/popupsStatusSlice";

function Settings(props) {
    const gameSettings = useSelector((state) => {
        return state.gameSettings
    })
    const players = useSelector((state) => {
        return state.gameSettings.players
    })
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleNextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 2 ? 0 : prevSlide + 1));
    };

    const handlePrevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? 2 : prevSlide - 1));
    };
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
        <div className={s.wrapper}>
            <div className={s.settingsBlock}>
                <div
                    className={s.allSteps}
                    style={{ transform: `translateX(-${currentSlide * 33}%)` }}
                >
                    <div className={s.step1 + " " + (currentSlide === 0 ? s.active : s.disable)}>
                        <div className={s.step1Title}>
                            <h2>Խաղի Տեսակը</h2>
                        </div>
                        <div className={s.step1Items}>
                            <div onClick={() => {
                                handleNextSlide()
                                dispatch(setGameMode({
                                    mode:doings.childrens
                                }))
                            }
                            }>Մանկական</div>
                            <div onClick={() => {
                                handleNextSlide()
                                dispatch(setGameMode({
                                    mode:doings.standard
                                }))
                            }
                            }>Ստանդարտ</div>
                            <div onClick={() => {
                                handleNextSlide()
                                dispatch(setGameMode({
                                    mode:doings.adult
                                }))
                            }
                            }>18+</div>
                        </div>
                    </div>

                    <div className={s.step2 + " " + (currentSlide === 1 ? s.active : s.disable)}>
                        <div className={s.step1Title}>
                            <h2>Մասնակիցների Սեռը</h2>
                        </div>
                        <div className={s.step2Items}>
                            <div onClick={() => {
                                handleNextSlide()
                                dispatch(setGenderPlayers({
                                    gender:"male"
                                }))
                            }
                            }>Տղաներ</div>
                            <div onClick={() => {
                                handleNextSlide()
                                dispatch(setGenderPlayers({
                                    gender:"female"
                                }))
                            }
                            }>Աղջիկներ</div>
                            <div onClick={() => {
                                handleNextSlide()
                                dispatch(setGenderPlayers({
                                    gender:"all"
                                }))
                            }
                            }>Տղաներ և Աղջիկներ</div>
                        </div>
                        <div className={s.backButton} onClick={handlePrevSlide}>Ետ</div>
                    </div>

                    <div className={s.step3 + " " + (currentSlide === 2 ? s.active : s.disable)}>
                        <div className={s.step1Title}>
                            <h2>Մասնակիցներ</h2>
                        </div>
                        <div className={s.step3Items}>
                            <div className={s.addPlayer}>
                                <input
                                    type="text"
                                    placeholder={"Անուն"}
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value)
                                    }
                                }/>
                                <button onClick={handleAddPlayer}>Ավելացնել</button>
                            </div>
                            <div className={s.flex}>
                                <div className={s.players}>
                                    {gameSettings.players.map((player,i) => {
                                        return (
                                            <div key={player.name + i}>{player.name}</div>
                                        )
                                    })}
                                </div>
                                {players.length > 1 && <div
                                    className={s.startButton}
                                    onClick={handleStartGame}
                                >
                                    Սկսել
                                </div>}
                            </div>
                            <div
                                className={s.backButton}
                                onClick={handlePrevSlide}
                            >
                                Ետ
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;