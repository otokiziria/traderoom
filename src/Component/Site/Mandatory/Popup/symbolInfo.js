import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Tabs, Tab, Card } from "react-bootstrap";
import Information from './symbolInfo/Information';
import Statistics from './symbolInfo/Statistics';
import { useTranslation } from 'react-i18next';
function SymbolInfo(props) {
  const { t } = useTranslation();
  if (props.infoSymbol !== null && props.activeInfoCategories !== null && props.infoSymbol["symbol"] !== undefined) {
    return (
      <div>
        <Card
          border="primary"
          bg="light"
          style={{
            width: "100%",
            maxWidth: "800px",
            height: "518px",
            overflowY: "auto",
          }}
        >
          <Card.Body>
            <Tabs defaultActiveKey="assetsInfo" id="uncontrolled-tab-example">
              <Tab eventKey="assetsInfo" title={t("Asset's Information")}>
                <Information data={props.infoSymbol} categories={props.activeInfoCategories} />
                </Tab>
              <Tab eventKey="assetsstat" title={t("Asset's Statistics")}>
                <Statistics data={props.infoSymbol} />
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>
      </div>
    );
  } else {
    return <>Symbol not found</>;
  }
}

const mapStateToProps = (state) => {
  return {
    showSymbolInfo: state.showSymbolInfo.showSymbolInfo,
    infoSymbol: state.infoSymbol.infoSymbol,
    activeInfoCategories: state.activeInfoCategories.activeInfoCategories,
  };
};

export default connect(mapStateToProps, null)(SymbolInfo);
