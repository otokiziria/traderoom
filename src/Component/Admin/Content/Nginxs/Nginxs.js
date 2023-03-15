import React, { useEffect, useState, useRef, useMemo } from "react";
import { getNginxs, deleteNginx, changeNginxSettings, restartNginx } from "../../../../Services/Nginxs/nginxs";
import Table from "../../Helpers/Table";
import NginxsEdit from "./NginxsEdit";
import { connect } from "react-redux";
import { getRefreshPageAction } from "../../../../Red";
import store from "../../../../Red/store";
function Nginxs(props) {
  const [Nginxs, setNginxs] = useState(null);

  const getNginxData = async () => {
    let retData = await getNginxs();
    if (retData !== null) {
      console.log(retData.row);
      setNginxs(retData.row);
    }
  };

  useEffect(() => {
    getNginxData();
  }, []);

  useEffect(() => {
    if (props.refreshPage) {
      setNginxs(null);
      getNginxData();
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
            Header: "Domain",
            accessor: "domain",
            // Use a two-stage aggregator here to first
            // count the total rows being aggregated,
            // then sum any of those counts if they are
            // aggregated further
            aggregate: "count",
            Aggregated: ({ value }) => `${value} Names`,
          },
          {
            Header: "MT5 Socket Url",
            accessor: "mt5_socket_url",
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
  }, [Nginxs]);
  console.log(Nginxs);
  if (Nginxs === undefined || Nginxs === null) {
    return <div>Loading</div>;
  } else {
    return (
      <div>
        <fieldset>
          <legend>Nginx settings</legend>
          <div style={{ marginLeft: "10px", textAlign: "center" }}>
            <button
              className="btn btn-primary m-2"
              onClick={() => {
                changeNginxSettings();
              }}
            >
              Change Nginx Settings
            </button>
            <button
              className="btn btn-primary m-2"
              onClick={() => {
                restartNginx();
              }}
            >
              Restart Nginx
            </button>
          </div>
        </fieldset>
        <Table
          columns={columns}
          data={Nginxs}
          updateMyData={updateMyData}
          skipReset={skipResetRef.current}
          EditComponent={NginxsEdit}
          DeleteRow={deleteNginx}
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

export default connect(mapStateToProps, null)(Nginxs);
