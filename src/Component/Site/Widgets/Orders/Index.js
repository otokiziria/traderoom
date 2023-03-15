import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import Pagination from "react-js-pagination";
import { useTranslation } from 'react-i18next';
import Table from "../../Helpers/Table"


function OrdersIndex(props) {
    const { t } = useTranslation();


    const numRows = props.orderData!==null ? props.orderData.length : 0;

    const [activePage, setactivePage] = useState(1);
    const [pagestart, setpagestart] = useState(0);

    const handlePageChange = (pageNumber) => {
       console.log(`active page is ${pageNumber}`);
       setactivePage(pageNumber);
       setpagestart((pageNumber * 10)-10);
     }



    if(props.orderData==null || props.orderSettings==null){
        return <div className="leftSideLoader navLoader"><div className="lds-ellipsis"><div></div><div></div><div></div><div></div>Loading...</div></div>
    }
    else{
        return(
            <div>
            <table className="table">
            <thead>
                <tr>
                    {(props.orderSettings.symbol) ? <th scope="col">{t('Symbol')}</th> : <th></th>}
                    {(props.orderSettings.time) ? <th scope="col">{t('Time')}</th> : <th></th>}
                    {(props.orderSettings.ticket) ? <th scope="col">{t('Ticket')}</th> : <th></th>}
                    {(props.orderSettings.type) ? <th scope="col">{t('Type')}</th> : <th></th>}
                    {(props.orderSettings.volume) ? <th scope="col">{t('Lot')}</th> : <th></th>}
                    {(props.orderSettings.price) ? <th scope="col">{t('Entry Price')}</th> : <th></th>}
                    {(props.orderSettings.sl) ? <th scope="col">{t('SL')}</th> : <th></th>}
                    {(props.orderSettings.tp) ? <th scope="col">{t('TP')}</th> : <th></th>}
                    {(props.orderSettings.cur_price) ? <th scope="col">{t('Cur Price')}</th> : <th></th>}
                    <th scope="col"> {t('Close')}</th>
                </tr>
            </thead>
            <tbody >
            {
           props.orderData!==null && props.orderData.slice(pagestart, 10*activePage).map((e, gel) =>
                <Table key={gel}
                // fchange={this.props.fchange}
                settings = {props.orderSettings}
                data = {e}
                type = {"orders"}
                //symbol={e.symbol}
                //time={e.timeCreate}
                //ticker={e.order}
               //action={e.action}
               // volume={e.volume/10000}
               // priceOpen={e.priceOpen}
               // priceSL={e.priceSL}
               // priceTP={e.priceTP}
               // priceCurrent={e.priceCurrent}
               // swap={e.storage ? parseFloat(e.storage).toFixed(2) : 0}
              //  profit={parseFloat(e.profit).toFixed(2)}
                /> )
            }
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
        )
    }
    
}

const mapStateToProps = (state) => {
  return {
    orderData: state.orderData.orderData,
    orderSettings: state.orderSettings.orderSettings
  };
};

export default connect(mapStateToProps, null)(OrdersIndex);
