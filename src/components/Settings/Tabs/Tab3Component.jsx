import React, {useEffect, useState} from 'react';
import s from "../Settings.module.css";
import {setIsManualGameMode} from "../../../features/gameSettings/gameSettingsSlice";
import {useDispatch} from "react-redux";

function Tab3Component(props) {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setIsManualGameMode({
            mode:false,
        }))
    },[])
    const [selectedMode, setSelectedMode] = useState(0)
    return (
            <div>
                <div className={s.step1}>
                    <div className={s.step1Title}>
                        <h2>Խաղի Տեսակը</h2>
                    </div>
                    <div className={s.step1Items}>
                        <div className={selectedMode === 0 ? s.selected + " " + s.modes : s.modes} onClick={() => {
                        setSelectedMode(0)
                            dispatch(setIsManualGameMode({
                                mode:false,
                            }))
                    }}>Խաղալ օնլայն</div>
                        <div className={selectedMode === 1 ? s.selected + " " + s.modes : s.modes} onClick={() => {
                        setSelectedMode(1)
                            dispatch(setIsManualGameMode({
                                mode:true,
                            }))
                    }}>Խաղալ սեփական կանոններով</div>
                    </div>
                </div>
            </div>
    );
}

export default Tab3Component;