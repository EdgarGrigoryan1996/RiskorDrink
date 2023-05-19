import React from 'react';
import {useSelector} from "react-redux";
import Players from "./Players/Players";

function StartGame(props) {
    const gameSettings = useSelector((state) => {
        return state.gameSettings
    })
    return (
        <>
            <div>Game Started</div>

            <div>
                <Players players={props.players}/>
            </div>
        </>

    );
}

export default StartGame;