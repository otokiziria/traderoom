import React, { useEffect, useState, useRef, useMemo } from "react";
import { getActiveSymbols, deleteSymbol, sortSymbols } from "../../../../Services/Symbols/symbols";
import Table from "../../Helpers/Table";
import SymbolsEdit from "./SymbolsEdit";
import {showAlertMSG} from "../../../../Lib/helpers";
import { connect } from "react-redux";
import { getRefreshPageAction } from "../../../../Red";
import store from "../../../../Red/store";

function SymbolsActive(props) {
  const [symbols, setSymbols] = useState(null);

  const getSymbolData = async () => {
    let retData = await getActiveSymbols();
    if (retData !== null) {
      setSymbols(retData.row);
    }
  };

  useEffect(() => {
    getSymbolData();
  }, []);
  useEffect(() => {
    if (props.refreshPage) {
      setSymbols(null);
      getSymbolData();
      store.dispatch(getRefreshPageAction(false));
    }
  }, [props.refreshPage]);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        columns: [
          {
            Header: "ID",
            accessor: "id",
            // Use a two-stage aggregator here to first
            // count the total rows being aggregated,
            // then sum any of those counts if they are
            // aggregated further
            aggregate: "count",
            isEditable: false,
            Aggregated: ({ value }) => `${value} Names`,
          },
          {
            Header: "Symbol",
            accessor: "symbol",
            // Use a two-stage aggregator here to first
            // count the total rows being aggregated,
            // then sum any of those counts if they are
            // aggregated further
            aggregate: "count",
            isEditable: false,
            Aggregated: ({ value }) => `${value} Names`,
          },
          {
            Header: "Path",
            accessor: "path",
            // Use our custom `fuzzyText` filter on this column
            filter: "fuzzyText",
            // Use another two-stage aggregator here to
            // first count the UNIQUE values from the rows
            // being aggregated, then sum those counts if
            // they are aggregated further
            aggregate: "uniqueCount",
            isEditable: false,
            Aggregated: ({ value }) => `${value} Unique Names`,
          },
          {
            Header: "Description",
            accessor: "description",
            //Filter: SliderColumnFilter,
            filter: "equals",
            // Aggregate the average age of visitors
            aggregate: "average",
            isEditable: false,
            Aggregated: ({ value }) => `${value} (avg)`,
          },
          {
            Header: "Sorting",
            accessor: "ordering",
            //Filter: SliderColumnFilter,
            filter: "equals",
            // Aggregate the average age of visitors
            isEditable: true,
            aggregate: "average",
            Aggregated: ({ value }) => `${value} (avg)`,
          },
        ],
      },
    ],
    []
  );

  const skipResetRef = useRef(false);

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (id, was, value) => {
    value = parseInt(value);
    if(isNaN(value) || value < 0){
      showAlertMSG('Ordering value is incorrect', 2);
    }
    else{
      if(value != was){
        sortSymbols(id, was, value)
      }
    }
    
    // We also turn on the flag to not reset the page
    skipResetRef.current = true;
  };

  // After data changes, we turn the flag back off
  // so that if data actually changes when we're not
  // editing it, the page is reset
  useEffect(() => {
    skipResetRef.current = false;
  }, [symbols]);

  console.log(symbols);
  if (symbols === undefined || symbols === null) {
    return <div>Loading</div>;
  } else {
    return (
      <div>
        <Table
            columns={columns}
            data={symbols}
            updateMyData={updateMyData}
            skipReset={skipResetRef.current}
            EditComponent={SymbolsEdit}
            DeleteRow = {deleteSymbol}
          />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    refreshPage: state.refreshPage.refreshPage,
  };
};
export default connect(mapStateToProps, null)(SymbolsActive);
