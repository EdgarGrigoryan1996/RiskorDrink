import React, {useEffect, useState} from 'react';
import s from "../Settings.module.css";
import {useDispatch} from "react-redux";
import {setGameMode} from "../../../features/gameSettings/gameSettingsSlice";
import {doings} from "../../../doings/doings";


function Tab1Component(props) {
    const dispatch = useDispatch()
    const [selectedMode, setSelectedMode] = useState(1)
    useEffect(() => {
        dispatch(setGameMode({
            mode:doings.children
        }))
    },[])
    return (
        <div>
            <div className={s.step1}>
                <div className={s.step1Title}>
                    <h2>Խաղի մակարդակ</h2>
                </div>
                <div className={s.step1Items}>
                    <div className={selectedMode === 0 ? s.selected + " " + s.modes : s.modes} onClick={() => {
                        setSelectedMode(0)
                        dispatch(setGameMode({
                                    mode:doings.children
                                }))
                    }
                    }>Ժամանցի համար</div>
                    <div className={selectedMode === 1 ? s.selected + " " + s.modes : s.modes} onClick={() => {
                        setSelectedMode(1)
                        dispatch(setGameMode({
                                    mode:doings.standard
                                }))
                    }
                    }>Մեծահասակների համար</div>
                    <div className={selectedMode === 2 ? s.selected + " " + s.modes : s.modes} onClick={() => {
                        setSelectedMode(2)
                        dispatch(setGameMode({
                                    mode:doings.adult
                                }))
                    }
                    }>Խելագարների համար</div>
                </div>
            </div>
        </div>

    );
}

export default Tab1Component;