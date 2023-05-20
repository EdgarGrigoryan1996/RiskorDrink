import React from 'react';
import s from "./Players.module.css"
import {useDispatch} from "react-redux";
import {addCurrentPlayer, checkPLayer, checkPLayerForDisabled} from "../../../features/gameSettings/gameSettingsSlice";
function Players(props) {
    const dispatch = useDispatch()
    const handleCheckPlayer = (id) => {
        dispatch(checkPLayer({
            id,
        }))
        dispatch(addCurrentPlayer())
        dispatch(checkPLayerForDisabled())
    }
    return (
        <div>
            {props.players.map((player) => {
                return (
                    <div key={player.id} className={s.player + " " + (player.isChecked && s.checked) + " " + (player.disabled && s.disabled)} onClick={() => {
                         props.isGameManual && handleCheckPlayer(player.id)
                    }
                    }>{player.name}</div>
                )
            })}
        </div>
    );
}

export default Players;