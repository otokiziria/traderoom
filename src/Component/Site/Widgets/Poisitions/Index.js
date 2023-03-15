import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import Pagination from "react-js-pagination";
import Table from "../../Helpers/Table"
function PositionsIndex(props) {
    const { t } = useTranslation();


    const numRows = props.position!==null ? props.position.length : 0;

    const [activePage, setactivePage] = useState(1);
    const [pagestart, setpagestart] = useState(0);

    const handlePageChange = (pageNumber) => {
       console.log(`active page is ${pageNumber}`);
       setactivePage(pageNumber);
       setpagestart((pageNumber * 10)-10);
     }



    if(props.positionData==null || props.positionSettings==null){
        return <div className="leftSideLoader navLoader"><div className="lds-ellipsis"><div></div><div></div><div></div><div></div>Loading...</div></div>
    }
    else{
        return(
            <div>
            <table className="table">
            <thead>
                <tr>
                    {(props.positionSettings.symbol) ? <th scope="col">{t('Symbol')}</th> : ''}
                    {(props.positionSettings.time) ? <th scope="col">{t('Time')}</th> : ''}
                    {(props.positionSettings.ticket) ? <th scope="col">{t('Ticket')}</th> : ''}
                    {(props.positionSettings.type) ? <th scope="col">{t('Type')}</th> : ''}
                    {(props.positionSettings.lot) ? <th scope="col">{t('Lot')}</th> : ''}
                    {(props.positionSettings.entry_price) ? <th scope="col">{t('Entry Price')}</th> : ''}
                    {(props.positionSettings.sl) ? <th scope="col">{t('SL')}</th> : ''}
                    {(props.positionSettings.tp) ? <th scope="col">{t('TP')}</th> : ''}
                    {(props.positionSettings.cur_price) ? <th scope="col">{t('Cur Price')}</th> : ''}
                    {(props.positionSettings.swap) ? <th scope="col">{t('Swap')}</th> : ''}
                    {(props.positionSettings.Profit) ? <th scope="col">{t('Profit')}</th> : ''}
                    <th scope="col"> {t('Close')}</th>
                </tr>
            </thead>
            <tbody >
            {
           props.positionData!==null && props.positionData.slice(pagestart, 10*activePage).map((e, gel) =>
                <Table key={gel}
                // fchange={this.props.fchange}
                settings = {props.positionSettings}
                data = {e}
                //symbol={e.symbol}
                //time={e.timeCreate}
                //ticker={e.position}
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
    positionData: state.positionData.positionData,
    positionSettings: state.positionSettings.positionSettings
  };
};

export default connect(mapStateToProps, null)(PositionsIndex);
