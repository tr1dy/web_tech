// Button.js

import React from 'react';
function Button (props) {
    return (
        <button onClick={props.onClick}>Отправить</button>
    );
}

export default Button;