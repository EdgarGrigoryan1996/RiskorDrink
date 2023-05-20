import React, {useState} from 'react';
import s from "../Settings.module.css";

function Tab2Component(props) {
    const [selectedMode , setSelectedMode] = useState(0)
    return (
        <div>
            <div className={s.step1}>
                <div className={s.step1Title}>
                    <h2>Խաղային խումբ</h2>
                </div>
                <div className={s.step1Items}>
                    <div className={selectedMode === 0 ? s.selected + " " + s.modes : s.modes} onClick={() => {
                        setSelectedMode(0)
                    }}>Տղաներով և աղջիկներով</div>
                    <div className={selectedMode === 1 ? s.selected + " " + s.modes : s.modes} onClick={() => {
                        setSelectedMode(1)
                    }}>Միայն տղաներով</div>
                    <div className={selectedMode === 2 ? s.selected + " " + s.modes : s.modes} onClick={() => {
                        setSelectedMode(2)
                    }}>Միայն աղջիկներով</div>

                </div>
            </div>
        </div>
    );
}

export default Tab2Component;