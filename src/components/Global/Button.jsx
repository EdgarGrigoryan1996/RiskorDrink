import React from 'react';
import s from "./Button.module.css"
function Button(props) {
    return (
        <div
            style={{
                background:props.background,
                color:props.color,
        }
            }
            className={s.button + " " + props.className}
            onClick={props.onclick}
        >
            {props.text}
        </div>
    );
}

export default Button;