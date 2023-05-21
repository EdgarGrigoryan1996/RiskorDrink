import React, {useState, useTransition} from 'react';
import s from "./Settings.module.css"
import {useDispatch, useSelector} from "react-redux";
import {
    addPlayer,
    startGame
} from "../../features/gameSettings/gameSettingsSlice";
import {setStatusFalse} from "../../features/popupsStatus/popupsStatusSlice";
import Tab1Component from "./Tabs/Tab1Component";
import Tab2Component from "./Tabs/Tab2Component";
import Tab3Component from "./Tabs/Tab3Component";
import Tab4Component from "./Tabs/Tab4Component";
import Button from "../Global/Button";
import {FaHotjar} from "react-icons/fa";
import {BiMaleFemale} from "react-icons/bi";
import {GiAutoRepair} from "react-icons/gi";
import {AiOutlineUsergroupAdd} from "react-icons/ai";
import {useTranslation} from "react-i18next";

function Settings(props) {
    const {t, i18n} = useTranslation()
    const currentLang = i18n.language
    const [tabIndex, setTabIndex] = useState(0);

    const handleNextTabClick = () => {
        if (tabIndex < 3) {
            setTabIndex(tabIndex+1);
        }
    };

    return (
        <div className={s.wrapper}>
            <div className={s.settingsBlock}>
                <div className={s.flex}>
                    <div className={s.tabButtons}>
                        <div className={tabIndex === 0 ? s.activeTab + " " + s.tab : s.tab} onClick={() => setTabIndex(0)}><FaHotjar/></div>
                        <div className={tabIndex === 1 ? s.activeTab + " " + s.tab : s.tab} onClick={() => setTabIndex(1)}><BiMaleFemale /></div>
                        <div className={tabIndex === 2 ? s.activeTab + " " + s.tab : s.tab} onClick={() => setTabIndex(2)}><GiAutoRepair /></div>
                        <div className={tabIndex === 3 ? s.activeTab + " " + s.tab : s.tab} onClick={() => setTabIndex(3)}><AiOutlineUsergroupAdd /></div>
                    </div>
                    <div className={s.lang}>
                        <div className={currentLang === "am" && s.activeLang} onClick={() => {
                            i18n.changeLanguage("am")
                        }
                        }>Am</div>
                        <div className={currentLang === "ru" && s.activeLang} onClick={() => {
                            i18n.changeLanguage("ru")
                        }
                        }>Ru</div>
                    </div>
                    {tabIndex === 0 && <Tab1Component />}
                    {tabIndex === 1 && <Tab2Component />}
                    {tabIndex === 2 && <Tab3Component />}
                    {tabIndex === 3 && <Tab4Component />}
                    {tabIndex < 3 && (
                        <div className={s.buttonBlock}>
                            <Button text={t("settings.nextButton")} background={"#547888"} color={"#fff"} onclick={handleNextTabClick}/>
                        </div>

                    )}
                </div>
            </div>
        </div>
    );
}

export default Settings;