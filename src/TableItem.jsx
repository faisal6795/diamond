import React, { useState } from "react";
import PropTypes from 'prop-types';

export default function TableItem({ row, col, isDiamond, getDirection, showDiamond, decrementScore }) {

    const [isPressed, setPressed] = useState(false);

    function btnClicked() {
        setPressed(true);
        if (isDiamond(row, col))
            showDiamond(row, col);
        else {
            decrementScore();
            setTimeout(() => {
                // setPressed(false);
            }, 4000);
        }
    }

    return isPressed ?
        <div className={isDiamond(row, col) ? 'diamond' : 'arrow ' + getDirection(row, col)}></div> :
        <button id={`button-${row}${col}`} onClick={btnClicked}></button>
}

TableItem.propType = {
    row: PropTypes.number,
    col: PropTypes.number,
    isDiamond: PropTypes.func,
    getDirection: PropTypes.func,
    showDiamond: PropTypes.func,
    decrementScore: PropTypes.func,
}