import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Arrow, Button, Diamond } from "./TableItem.styles";

export default function TableItem({ row, col, isDiamond, getDirection, showDiamond, decrementScore }) {

    const [isPressed, setPressed] = useState(false);

    function btnClicked() {
        setPressed(true);
        if (isDiamond(row, col)) {
            showDiamond(row, col);
        } else {
            decrementScore();
            setTimeout(() => {
                setPressed(false);
            }, 4000);
        }
    }

    return isPressed ?
        isDiamond(row, col) ? <Diamond /> : <Arrow className={getDirection(row, col)} /> :
        <Button id={`button-${row}${col}`} onClick={btnClicked}></Button>
}

TableItem.propType = {
    row: PropTypes.number,
    col: PropTypes.number,
    isDiamond: PropTypes.func,
    getDirection: PropTypes.func,
    showDiamond: PropTypes.func,
    decrementScore: PropTypes.func,
}