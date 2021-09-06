import React from "react";
import PropTypes from 'prop-types';
import { Arrow, Button, Diamond } from "./TableItem.styles";

export default function TableItem({ row, col, isDiamond, currentActive, getDirection, handleBtnClicked }) {

    function getId() {
        return `button-${row}${col}`;
    }

    function isPressed() {
        return currentActive.includes(getId());
    }

    return isPressed() ?
        isDiamond ? <Diamond /> : <Arrow className={getDirection(row, col)} /> :
        <Button id={getId()} onClick={() => handleBtnClicked(row, col)}></Button>
}

TableItem.propType = {
    row: PropTypes.number,
    col: PropTypes.number,
    isDiamond: PropTypes.bool,
    currentActive: PropTypes.arrayOf(PropTypes.string),
    getDirection: PropTypes.func,
    handleBtnClicked: PropTypes.func,
}