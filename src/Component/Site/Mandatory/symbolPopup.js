import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCog } from "@fortawesome/free-solid-svg-icons";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function SymbolPopup(props) {




    return(
        <div>
          {/* popup */}

        symbol popup
        </div>
    );

}

const mapStateToProps = (state) => {
    return {
        showSymbolPopup: state.showSymbolPopup.showSymbolPopup,
    };
  };

  
export default connect(mapStateToProps, null)(SymbolPopup);