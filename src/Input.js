// Input.js
import React from 'react';
function Input(props) {
    return (
        <input
            type="text"
            value={props.value}
            onChange={props.onChange}
            placeholder="Введите текст"
        />
    );
}

export default Input;