import React from 'react';
import './App.css';
import {useSelector} from "react-redux";
import Settings from "./components/Settings/Settings";
import StartGame from "./components/StartGame/StartGame";

function App() {
    const settingsPopupStatus = useSelector((state) => {
        return state.popupsStatus?.settingsPopup
    })
    const gameSettings = useSelector((state) => {
        return state.gameSettings
    })

  return (
    <div className="App">
        {settingsPopupStatus && <Settings />}
        {gameSettings.gameStarted &&  <StartGame players={gameSettings.players}/>}

    </div>
  );
}

export default App;
