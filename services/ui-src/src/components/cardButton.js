import React from "react";
import PropTypes from "prop-types";
import { useHistory } from 'react-router-dom';
import getCardButtonPropsByType from "../utils/cardButtonTypes";

export default function CardButton({type}) {
    const  imageProps  = getCardButtonPropsByType(type);
    const {fileName, bgColor, width, height, top, left} = imageProps.imageAttributes;
    const {title, desc, navigateTo} = imageProps;
    const history = useHistory();
    return (
        <div className="card-button"
            style={{
                background: `${bgColor} 
                url('/assets/images/cardButton/${fileName}.svg') 
                ${left}px ${top}px / ${width}px ${height}px 
                no-repeat`,
            }}>
            <div className="card-button-content">
                <div className="card-button-title">
                    {title}
                </div>
                <div className="card-button-description">
                    {desc}
                </div>
            </div>
            <div className="card-button-select-container">
                <button
                    className="ds-c-button card-button-select"
                    onClick={() => history.push(navigateTo)}
                    style={{ color: bgColor }}>Begin</button>
            </div>
        </div>
    );
}

CardButton.propTypes = {
    type: PropTypes.string.isRequired
};