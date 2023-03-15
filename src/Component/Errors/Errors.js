import React from "react";
import "./Errors.css";

import { useTranslation } from "react-i18next";


function Errors(props) {
const {t} = useTranslation();

    return (    
        <div className="error-page">
            <div className="error-page-404 mb-2">404</div>
            <div className="error-page-text">{props.message}</div>
        </div>
)
}
export default Errors;