import React, { useEffect, useState, useRef, useMemo } from "react";
import { getPositions } from "../../../../Services/Positions/positions";
import Table from "../../Helpers/Table";
import PositionsEdit from "./PositionsEdit";
import { connect } from "react-redux";
import { getRefreshPageAction } from "../../../../Red";
import store from "../../../../Red/store";
import {deletePosition} from "../../../../Services/Positions/positions";
function Positions(props) {
  const [positions, setPositions] = useState(null);

  const getPositionData = async () => {
    let retData = await getPositions();
    if (retData !== null) {
      console.log(retData.row);
      setPositions(retData.row);
    }
  };

  useEffect(() => {
    getPositionData();
  }, []);

  useEffect(() => {
    if (props.refreshPage) {
      setPositions(null);
      getPositionData();
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
            Header: "Symbol",
            accessor: "symbol",
            // Use a two-stage aggregator here to first
            // count the total rows being aggregated,
            // then sum any of those counts if they are
            // aggregated further
            aggregate: "count",
            Aggregated: ({ value }) => `${value} Names`,
          },
          {
            Header: "Time",
            accessor: "time",
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
  }, [positions]);
  console.log(positions);
  if (positions === undefined || positions === null) {
    return <div>Loading</div>;
  } else {
    return (
      <div>
        
        <Table
          columns={columns}
          data={positions}
          updateMyData={updateMyData}
          skipReset={skipResetRef.current}
          EditComponent={PositionsEdit}
          DeleteRow = {deletePosition}
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

export default connect(mapStateToProps, null)(Positions);
