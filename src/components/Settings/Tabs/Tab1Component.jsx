import React, {useEffect, useState} from 'react';
import s from "../Settings.module.css";
import {useDispatch} from "react-redux";
import {setGameMode} from "../../../features/gameSettings/gameSettingsSlice";
import {doings} from "../../../doings/doings";
import {useTranslation} from "react-i18next";


function Tab1Component(props) {
    const dispatch = useDispatch()
    const {t, i18n} = useTranslation()
    const [selectedMode, setSelectedMode] = useState(1)
    useEffect(() => {
        dispatch(setGameMode({
            mode:doings.children
        }))
    },[])
    console.log(props.lang)
    return (
        <div>
            <div className={s.step1}>
                <div className={s.step1Title}>
                    <h2>{t("settings.step1.title")}</h2>
                </div>
                <div className={s.step1Items}>
                    <div className={selectedMode === 0 ? s.selected + " " + s.modes : s.modes} onClick={() => {
                        setSelectedMode(0)
                        dispatch(setGameMode({
                                    mode:doings.children
                                }))
                    }
                    }>{t("settings.step1.option1")}</div>
                    <div className={selectedMode === 1 ? s.selected + " " + s.modes : s.modes} onClick={() => {
                        setSelectedMode(1)
                        dispatch(setGameMode({
                                    mode:doings.standard
                                }))
                    }
                    }>{t("settings.step1.option2")}</div>
                    <div className={selectedMode === 2 ? s.selected + " " + s.modes : s.modes} onClick={() => {
                        setSelectedMode(2)
                        dispatch(setGameMode({
                                    mode:doings.adult
                                }))
                    }
                    }>{t("settings.step1.option3")}</div>
                </div>
            </div>
        </div>

    );
}

export default Tab1Component;