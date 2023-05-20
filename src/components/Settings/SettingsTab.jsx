import React, {useState} from 'react';
import s from "./Settings.module.css"
import {useDispatch, useSelector} from "react-redux";
import {
    addPlayer,
    setGameMode,
    setGenderPlayers,
    setIsManualGameMode,
    startGame
} from "../../features/gameSettings/gameSettingsSlice";
import {doings} from "../../doings/doings";
import {setStatusFalse} from "../../features/popupsStatus/popupsStatusSlice";
import Tab1Component from "./Tabs/Tab1Component";
import Tab2Component from "./Tabs/Tab2Component";
import Tab3Component from "./Tabs/Tab3Component";
import Tab4Component from "./Tabs/Tab4Component";
import Button from "../Global/Button";

function Settings(props) {
    const gameSettings = useSelector((state) => {
        return state.gameSettings
    })
    const players = useSelector((state) => {
        return state.gameSettings.players
    })
    const dispatch = useDispatch()
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
    console.log(gameSettings)

    //Tabs
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
                    <div className="tab-buttons">
                        <button className={tabIndex === 0 ? s.activeTab + " " + s.tab : s.tab} onClick={() => setTabIndex(0)}>Tab 1</button>
                        <button className={tabIndex === 1 ? s.activeTab + " " + s.tab : s.tab} onClick={() => setTabIndex(1)}>Tab 2</button>
                        <button className={tabIndex === 2 ? s.activeTab + " " + s.tab : s.tab} onClick={() => setTabIndex(2)}>Tab 3</button>
                        <button className={tabIndex === 3 ? s.activeTab + " " + s.tab : s.tab} onClick={() => setTabIndex(3)}>Tab 4</button>
                    </div>
                    {tabIndex === 0 && <Tab1Component />}
                    {tabIndex === 1 && <Tab2Component />}
                    {tabIndex === 2 && <Tab3Component />}
                    {tabIndex === 3 && <Tab4Component />}
                    {tabIndex < 3 && (
                        <div className={s.buttonBlock}>
                            <Button text={"Հաջորդ"} background={"#547888"} color={"#fff"} onclick={handleNextTabClick}/>
                        </div>

                    )}
                </div>
            </div>
        </div>
    );
}

export default Settings;