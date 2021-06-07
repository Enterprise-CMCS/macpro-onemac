import React from "react";
import { Link } from "react-router-dom";


const ChoiceItem = ({ linkTo, title, description }) => {
  return (
        <li className="choice" ><Link to={linkTo}><h4>{title}</h4>
          <p>{description}</p></Link></li>
  );
};

export default ChoiceItem;
