import React, { useEffect, useState, useRef, useMemo } from "react";
import { getCrons, executeHLOC } from "../../../../Services/Crons/crons";
import Table from "../../Helpers/Table";
import { connect } from "react-redux";
import { getRefreshPageAction } from "../../../../Red";
import store from "../../../../Red/store";
function Crons(props) {
  const [Crons, setCrons] = useState(null);

  const getCronData = async () => {
    let retData = await getCrons();
    if (retData !== null) {
      console.log(retData.row);
      setCrons(retData.row);
    }
  };

  useEffect(() => {
    getCronData();
  }, []);

  useEffect(() => {
    if (props.refreshPage) {
      setCrons(null);
      getCronData();
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
            Header: "Title",
            accessor: "title",
            // Use a two-stage aggregator here to first
            // count the total rows being aggregated,
            // then sum any of those counts if they are
            // aggregated further
            aggregate: "count",
            Aggregated: ({ value }) => `${value} Names`,
          },
          {
            Header: "Description",
            accessor: "description",
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
            Header: "Schedule",
            accessor: "schedule",
            //Filter: SliderColumnFilter,
            filter: "equals",
            // Aggregate the average age of visitors
            aggregate: "average",
            Aggregated: ({ value }) => `${value} (avg)`,
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
  }, [Crons]);
  console.log(Crons);
  if (Crons === undefined || Crons === null) {
    return <div>Loading</div>;
  } else {
    return (
      <div>
        <div style={{ textAlign: "center" }}>
          <button
            className="btn btn-primary"
            style={{ margin: "5px" }}
            onClick={() => {
              executeHLOC(1);
            }}
          >
            Execute HLOC day
          </button>
          <button
            className="btn btn-primary"
            style={{ margin: "5px" }}
            onClick={() => {
              executeHLOC(2);
            }}
          >
            Execute HLOC week
          </button>
          <button
            className="btn btn-primary"
            style={{ margin: "5px" }}
            onClick={() => {
              executeHLOC(3);
            }}
          >
            Execute HLOC month
          </button>
          <button
            className="btn btn-primary"
            style={{ margin: "5px" }}
            onClick={() => {
              executeHLOC(4);
            }}
          >
            Execute HLOC QTR.
          </button>
          <button
            className="btn btn-primary"
            style={{ margin: "5px" }}
            onClick={() => {
              executeHLOC(5);
            }}
          >
            Execute HLOC year
          </button>
          <button
            className="btn btn-primary"
            style={{ margin: "5px" }}
            onClick={() => {
              executeHLOC(6);
            }}
          >
            Execute HLOC YTD.
          </button>
        </div>
        <Table
          columns={columns}
          data={Crons}
          skipReset={skipResetRef.current}
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

export default connect(mapStateToProps, null)(Crons);
