import React, { useEffect, useState, useRef, useMemo } from "react";
import { getMT5s, getMT5sUrl, deleteMT5, savemt5ApiAddress, restartmt5, restartmt5crm, stopmt5crm, restartmt5tick, stopmt5tick, sendmt5credentials } from "../../../../Services/MT5s/MT5s";
import Table from "../../Helpers/Table";
import MT5Edit from "./MT5Edit";
import { connect } from "react-redux";
import { getRefreshPageAction } from "../../../../Red";
import store from "../../../../Red/store";
import { showAlertMSG } from "../../../../Lib/helpers";
function MT5(props) {
  const [MT5s, setMT5s] = useState(null);
  const ref_mt5_input =  useRef(null);
  const getMT5Data = async () => {
    let retData = await getMT5s();
    if (retData !== null) {
      console.log(retData.row);
      setMT5s(retData.row);
    }
  };
  const getMT5Url = async () => {
    let retData = await getMT5sUrl();
    if (retData !== null) {
      if (retData.data !== null) {
        if(ref_mt5_input.current === null){
          var intK = setTimeout(function(){
            if(ref_mt5_input.current !== null){
              ref_mt5_input.current.value = retData.data;
              clearInterval(intK);
            }
            
          },1500)
        }
        else{
          ref_mt5_input.current.value = retData.data;
        }
      }
    }
  };

  useEffect(() => {
    getMT5Data();
    getMT5Url();
  }, []);

  useEffect(() => {
    if (props.refreshPage) {
      setMT5s(null);
      getMT5Data();
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
            Aggregated: ({ value }) => `${value} Names`,
          },
          {
            Header: "Server",
            accessor: "server",
            // Use a two-stage aggregator here to first
            // count the total rows being aggregated,
            // then sum any of those counts if they are
            // aggregated further
            aggregate: "count",
            Aggregated: ({ value }) => `${value} Names`,
          },
          {
            Header: "Username",
            accessor: "username",
            // Use our custom `fuzzyText` filter on this column
            filter: "fuzzyText",
            // Use another two-stage aggregator here to
            // first count the UNIQUE values from the rows
            // being aggregated, then sum those counts if
            // they are aggregated further
            aggregate: "uniqueCount",
            Aggregated: ({ value }) => `${value} Unique Names`,
          },
          {
            Header: "Password",
            accessor: "password",
            // Use our custom `fuzzyText` filter on this column
            filter: "fuzzyText",
            // Use another two-stage aggregator here to
            // first count the UNIQUE values from the rows
            // being aggregated, then sum those counts if
            // they are aggregated further
            aggregate: "uniqueCount",
            Aggregated: ({ value }) => `${value} Unique Names`,
          },
          {
            Header: "State",
            accessor: "status",
            //Filter: SliderColumnFilter,
            filter: "equals",
            // Aggregate the average age of visitors
            aggregate: "average",
            Aggregated: ({ value }) => `${value} (avg)`,
          },
          {
            Header: "Created Day",
            accessor: "created_day",
            //Filter: SliderColumnFilter,
            filter: "equals",
            // Aggregate the average age of visitors
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
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    skipResetRef.current = true;
  };

  // After data changes, we turn the flag back off
  // so that if data actually changes when we're not
  // editing it, the page is reset
  useEffect(() => {
    skipResetRef.current = false;
  }, [MT5s]);
  console.log(MT5s);
  if (MT5s === undefined || MT5s === null) {
    return <div>Loading</div>;
  } else {
    return (
      <div>
        <fieldset>
          <legend>MT5 settings</legend>
          <div style={{ marginLeft: "10px", color: "red" }}>
          <input
            ref={ref_mt5_input}
            type="text"
            className="form-control"
            placeholder="Enter MT5 api Address"
            
          /> 
          <div style={{textAlign: 'center'}}>
          <button
          
              className="btn btn-primary m-2"
              
              onClick={() => {
                if(ref_mt5_input.current.value == ""){
                  showAlertMSG("mt5 api url is empty !!!", 3);
                  return false;
                }
                else{
                  savemt5ApiAddress(ref_mt5_input.current.value);
                }
                
              }}
            >
              Save MT5 API Address
            </button>
          </div>
          </div>
          <div style={{ textAlign: "center" }}>
          <button
              className="btn btn-primary"
              style={{ margin: "5px" }}
              onClick={() => {
                restartmt5();
              }}
            >
              Restart mt5 Application
            </button>
            <button
              className="btn btn-primary"
              style={{ margin: "5px" }}
              onClick={() => {
                restartmt5crm();
              }}
            >
              Restart mt5 CRM Application
            </button>
            <button
              className="btn btn-primary"
              style={{ margin: "5px" }}
              onClick={() => {
                stopmt5crm();
              }}
            >
              Stop mt5 CRM Application
            </button>
            <button
              className="btn btn-primary"
              style={{ margin: "5px" }}
              onClick={() => {
                restartmt5tick();
              }}
            >
              Restart mt5 Ticks Application
            </button>
            <button
              className="btn btn-primary"
              style={{ margin: "5px" }}
              onClick={() => {
                stopmt5tick();
              }}
            >
              Stop mt5 Ticks Application
            </button>
            <button
              className="btn btn-primary"
              style={{ margin: "5px" }}
              onClick={() => {
                sendmt5credentials();
              }}
            >
              Send Active Credential To MT5
            </button>
            </div>
            
        </fieldset>
        
        <Table
          columns={columns}
          data={MT5s}
          updateMyData={updateMyData}
          skipReset={skipResetRef.current}
          EditComponent={MT5Edit}
          DeleteRow = {deleteMT5}
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

export default connect(mapStateToProps, null)(MT5);
