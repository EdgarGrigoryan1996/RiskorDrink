import React from 'react';
import './App.css';
import {useSelector} from "react-redux";
import StartGame from "./components/StartGame/StartGame";
import SettingsTab from "./components/Settings/SettingsTab";

function App() {
    const settingsPopupStatus = useSelector((state) => {
        return state.popupsStatus?.settingsPopup
    })
    const gameSettings = useSelector((state) => {
        return state.gameSettings
    })

  return (
    <div className="App">
        {settingsPopupStatus && <SettingsTab />}
        {gameSettings.gameStarted &&  <StartGame players={gameSettings.players}/>}

    </div>
  );
}

export default App;
