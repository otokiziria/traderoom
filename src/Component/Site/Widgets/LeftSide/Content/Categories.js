import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Symbols from "./Symbols";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

function Categories(props) {
  const { t } = useTranslation();

  const arrowFunction = () =>{
    console.log("clicked");
  }
  
  const generateSubCategory = (category) => {
    let arr = [];
    arr.push(
      <Card key={'categories_key_'+category.id}>
        <Card.Header className="category_card_header" onClick={arrowFunction}>
        <FontAwesomeIcon icon={faChevronDown} />
          <Accordion.Toggle
            as={Button}
            className="category_card_title"
            variant="link"
            eventKey={"category_" + category.id}
          >
            {category.title}
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey={"category_" + category.id}>
          <Card.Body className="category_card_body">
            {category.sub_category.length > 0
              ? <Accordion key={'categories_acordion_key_'+category.id}>{category.sub_category.map((el, k) => generateSubCategory(el))}</Accordion>
              : ""}

            {category.symbols.length > 0
              ? <Accordion key={'symbols_acordion_key_'+category.id}>
              <Symbols data={category.symbols} settings={props.settings} />
              </Accordion>
              : ""}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    );
    return arr;
  };

  if (props.data == null) {
    return (
      <div className="leftSideLoader navLoader">
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>Loading...
        </div>
      </div>
    );
  } else {
    return (
      <Card key={'categories_key_'+props.data.id}>
        <Card.Header className="category_card_header">
        <FontAwesomeIcon icon={faChevronDown} />
          <Accordion.Toggle
            className="category_card_title"
            as={Button}
            variant="link"
            eventKey={"category_" + props.data.id}
          >
            {props.data.title}
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey={"category_" + props.data.id}>
          <Card.Body className="category_card_body">
            {props.data.sub_category.length > 0 ? (
              <Accordion key={'categories_acordion_key_'+props.data.id}>
                {props.data.sub_category.map((el, k) =>
                  generateSubCategory(el)
                )}
              </Accordion>
            ) : (
              ""
            )}

            {props.data.symbols.length > 0 ? (
              <Accordion key={'symbols_acordion_key_'+props.data.id}>
              <Symbols data={props.data.symbols} settings={props.settings} />
              </Accordion>
            ) : (
              ""
            )}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    );
  }
}

export default Categories;
