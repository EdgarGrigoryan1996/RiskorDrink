import React, {useState} from 'react';
import s from "../Settings.module.css";
import {useTranslation} from "react-i18next";

function Tab2Component(props) {
    const {t, i18n} = useTranslation()
    const [selectedMode , setSelectedMode] = useState(0)
    return (
        <div>
            <div className={s.step1}>
                <div className={s.step1Title}>
                    <h2>{t("settings.step2.title")}</h2>
                </div>
                <div className={s.step1Items}>
                    <div className={selectedMode === 0 ? s.selected + " " + s.modes : s.modes} onClick={() => {
                        setSelectedMode(0)
                    }}>{t("settings.step2.option1")}</div>
                    <div className={selectedMode === 1 ? s.selected + " " + s.modes : s.modes} onClick={() => {
                        setSelectedMode(1)
                    }}>{t("settings.step2.option2")}</div>
                    <div className={selectedMode === 2 ? s.selected + " " + s.modes : s.modes} onClick={() => {
                        setSelectedMode(2)
                    }}>{t("settings.step2.option3")}</div>

                </div>
            </div>
        </div>
    );
}

export default Tab2Component;