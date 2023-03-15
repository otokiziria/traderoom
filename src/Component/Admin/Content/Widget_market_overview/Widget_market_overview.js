import React, { useEffect, useState, useRef, useMemo } from "react";
import { getWidget_market_overviews, deleteWidget_market_overview } from "../../../../Services/Widget_market_overview/widget_market_overview";
import Table from "../../Helpers/Table";
import Widget_market_overviewEdit from "./Widget_market_overviewEdit";
import { connect } from "react-redux";
import { getRefreshPageAction } from "../../../../Red";
import store from "../../../../Red/store";
function Widget_market_overview(props) {
  const [Widget_market_overviews, setWidget_market_overviews] = useState(null);

  const getWidget_market_overviewData = async () => {
    let retData = await getWidget_market_overviews();
    if (retData !== null) {
      console.log(retData.row);
      setWidget_market_overviews(retData.row);
    }
  };

  useEffect(() => {
    getWidget_market_overviewData();
  }, []);

  useEffect(() => {
    if (props.refreshPage) {
      setWidget_market_overviews(null);
      getWidget_market_overviewData();
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
            Header: "Script URL",
            accessor: "script_url",
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
  }, [Widget_market_overviews]);
  console.log(Widget_market_overviews);
  if (Widget_market_overviews === undefined || Widget_market_overviews === null) {
    return <div>Loading</div>;
  } else {
    return (
      <div>
        <div style={{ marginLeft: "10px", color: "red", textAlign: 'center', fontWeight: 'bold' }}>
            To generate script URL and data click link below!!! <br />
            <a href="https://www.tradingview.com/widget/market-overview/" target="_blank">Link</a> <br />
            Script URL and Data is {'<script src="{Script URL}" >{Data}</script>'}
          </div>
        
        
        <Table
          columns={columns}
          data={Widget_market_overviews}
          updateMyData={updateMyData}
          skipReset={skipResetRef.current}
          EditComponent={Widget_market_overviewEdit}
          DeleteRow = {deleteWidget_market_overview}
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

export default connect(mapStateToProps, null)(Widget_market_overview);
