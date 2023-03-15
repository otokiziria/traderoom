import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Symbols from "../Content/Symbols";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

function FilterIndex(props) {
  const { t } = useTranslation();
  const [compHtml, setcompHtml] = useState([]);

  useEffect(() => {
    let arr = [];
    if (
      props.leftSideSettings == null ||
      props.leftSideData == null ||
      props.leftSideData.length == 0
    ) {
      arr.push(
        <div className="leftSideLoader navLoader">
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>Loading...
          </div>
        </div>
      );
    } else if (
      props.leftSideData[0] !== undefined &&
      props.leftSideData[0].total !== undefined &&
      props.leftSideData[0].total == 0
    ) {
      arr.push(<>{t("No Data")}</>);
    } else {
      if (
        props.allSymbols !== null &&
        props.allSymbols !== undefined &&
        props.symbolFilter !== null &&
        props.symbolFilter !== undefined &&
        props.symbolFilter.type !== undefined &&
        props.symbolFilter.type == 2
      ) {
        let existed = false;
        props.allSymbols.map((el) => {
          if (props.symbolFilter.id == el.parent_id) {
            existed = true;

            //let symbolArr = [];
            let symbolArr = props.leftSideData.filter(
              (element) => element.category == el.id
            );
            // console.log('props.leftSideData = ',props.leftSideData);
            //   console.log('symbolArr = ', symbolArr);
            let arr1 = [];
            arr1.push(
              <Card key={"filter_categories_key_" + el.id}>
                <Card.Header className="category_card_header">
                  <FontAwesomeIcon icon={faChevronDown} />
                  <Accordion.Toggle
                    as={Button}
                    className="category_card_title"
                    variant="link"
                    eventKey={"filter_category_" + el.id}
                  >
                    {el.title}
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={"filter_category_" + el.id}>
                  <Card.Body className="category_card_body">
                    <Accordion key={"filter_symbols_" + el.id}>
                      <Symbols
                        data={symbolArr}
                        settings={props.leftSideSettings}
                      />
                    </Accordion>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            );
            arr.push(<Accordion>{arr1}</Accordion>)
          }
        });
        if (!existed) {
          arr.push(
            <Accordion key={"filter_symbols"}>
              <Symbols
                data={props.leftSideData}
                settings={props.leftSideSettings}
              />
            </Accordion>
          );
        }
      } else {
        arr.push(
          <Accordion key={"filter_symbols"}>
            <Symbols
              data={props.leftSideData}
              settings={props.leftSideSettings}
            />
          </Accordion>
        );
      }
    }
    setcompHtml(arr);
  }, [props.leftSideSettings, props.leftSideData]);

  if (
    props.leftSideSettings == null ||
    props.leftSideData == null ||
    props.leftSideData.length == 0
  ) {
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
  } else if (
    props.leftSideData[0] !== undefined &&
    props.leftSideData[0].total !== undefined &&
    props.leftSideData[0].total == 0
  ) {
    return <>{t("No Data")}</>;
  } else {
    return compHtml;
  }
}

const mapStateToProps = (state) => {
  return {
    allSymbols: state.allSymbols.allSymbols,
    symbolFilter: state.symbolFilter.symbolFilter,
    leftSideData: state.leftSideData.leftSideData,
    leftSideSettings: state.leftSideSettings.leftSideSettings,
  };
};

export default connect(mapStateToProps, null)(FilterIndex);
