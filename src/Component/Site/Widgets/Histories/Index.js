import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import Pagination from "react-js-pagination";
import { useTranslation } from "react-i18next";
import Table from "../../Helpers/Table";
import DatePicker from "react-datepicker";
import {getHistoryFromCrm} from '../../../../Services/Histories/histories'
import "react-datepicker/dist/react-datepicker.css";

function HistoriesIndex(props) {
  const { t } = useTranslation();

  const numRows = props.historyData !== null ? props.historyData.length : 0;

  var d = new Date();
  var e = new Date();

  const [activePage, setactivePage] = useState(1);
  const [pagestart, setpagestart] = useState(0);
  const [startDate, setStartDate] = useState(d);//formatDate(d)
  e.setDate(d.getDate() + 1);
  const [endDate, setEndDate] = useState(e);//formatDate(d)
  console.log(startDate);
  console.log(endDate);
  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    setactivePage(pageNumber);
    setpagestart(pageNumber * 10 - 10);
  };

  const getHistory = () => {
    getHistoryFromCrm(startDate, endDate);
  }


  console.log("props.historyData = ", props.historyData);
  if (props.historyData == null || props.historySettings == null) {
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
      <div>
        <div className="d-flex p-2 history-search">
          <div className="pl-2">
            {t("Start Date")} 
            <DatePicker
              selected={startDate}
              dateFormat="yyyy-MM-dd"
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <div className="pl-2">
            {t("End Date")} 
            <DatePicker
              selected={endDate}
              dateFormat="yyyy-MM-dd"
              onChange={(date) => setEndDate(date)}
            />
          </div>
          <div className="pl-2">
            <button
              className="btn btn-primary"
              onClick={() => {
                getHistory();
              }}
            >{t("Search")}</button>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              {props.historySettings.symbol ? (
                <th scope="col">{t("Symbol")}</th>
              ) : (
                <th></th>
              )}
              {props.historySettings.time ? (
                <th scope="col">{t("Time")}</th>
              ) : (
                <th></th>
              )}
              {props.historySettings.ticket ? (
                <th scope="col">{t("Ticket")}</th>
              ) : (
                <th></th>
              )}
              {props.historySettings.type ? (
                <th scope="col">{t("Type")}</th>
              ) : (
                <th></th>
              )}
              {props.historySettings.lot ? (
                <th scope="col">{t("Lot")}</th>
              ) : (
                <th></th>
              )}
              {props.historySettings.entry_price ? (
                <th scope="col">{t("Entry Price")}</th>
              ) : (
                <th></th>
              )}
              {props.historySettings.sl ? (
                <th scope="col">{t("SL")}</th>
              ) : (
                <th></th>
              )}
              {props.historySettings.tp ? (
                <th scope="col">{t("TP")}</th>
              ) : (
                <th></th>
              )}
              {props.historySettings.close_time ? (
                <th scope="col">{t("Close Time")}</th>
              ) : (
                <th></th>
              )}
              {props.historySettings.close_price ? (
                <th scope="col">{t("Close Price")}</th>
              ) : (
                <th></th>
              )}
              {props.historySettings.swap ? (
                <th scope="col">{t("Swap")}</th>
              ) : (
                <th></th>
              )}
              {props.historySettings.profit ? (
                <th scope="col">{t("Profit")}</th>
              ) : (
                <th></th>
              )}
             
            </tr>
          </thead>
          <tbody>
            {props.historyData !== null &&
              props.historyData
                .slice(pagestart, 10 * activePage)
                .map((e, gel) => (
                  <Table
                    key={gel}
                    // fchange={this.props.fchange}
                    settings={props.historySettings}
                    data={e}
                    type={"histories"}
                    
                    //time={e.timeCreate}
                    //ticker={e.history}
                    //action={e.action}
                    // volume={e.volume/10000}
                    // priceOpen={e.priceOpen}
                    // priceSL={e.priceSL}
                    // priceTP={e.priceTP}
                    // priceCurrent={e.priceCurrent}
                    // swap={e.storage ? parseFloat(e.storage).toFixed(2) : 0}
                    //  profit={parseFloat(e.profit).toFixed(2)}
                  />
                ))}
          </tbody>
        </table>

        <Pagination
          activePage={activePage}
          itemsCountPerPage={10}
          totalItemsCount={numRows}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    historyData: state.historyData.historyData,
    historySettings: state.historySettings.historySettings,
  };
};

export default connect(mapStateToProps, null)(HistoriesIndex);
