import React, { useEffect, useState, useRef, useMemo } from "react";
import { getWidget_fundamental_datas, deleteWidget_fundamental_data } from "../../../../Services/Widget_fundamental_data/widget_fundamental_data";
import Table from "../../Helpers/Table";
import Widget_fundamental_dataEdit from "./Widget_fundamental_dataEdit";
import { connect } from "react-redux";
import { getRefreshPageAction } from "../../../../Red";
import store from "../../../../Red/store";
function Widget_fundamental_data(props) {
  const [Widget_fundamental_datas, setWidget_fundamental_datas] = useState(null);

  const getWidget_fundamental_dataData = async () => {
    let retData = await getWidget_fundamental_datas();
    if (retData !== null) {
      console.log(retData.row);
      setWidget_fundamental_datas(retData.row);
    }
  };

  useEffect(() => {
    getWidget_fundamental_dataData();
  }, []);

  useEffect(() => {
    if (props.refreshPage) {
      setWidget_fundamental_datas(null);
      getWidget_fundamental_dataData();
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
  }, [Widget_fundamental_datas]);
  console.log(Widget_fundamental_datas);
  if (Widget_fundamental_datas === undefined || Widget_fundamental_datas === null) {
    return <div>Loading</div>;
  } else {
    return (
      <div>
        <div style={{ marginLeft: "10px", color: "red", textAlign: 'center', fontWeight: 'bold' }}>
            To generate script URL and data click link below!!! <br />
            <a href="https://www.tradingview.com/widget/fundamental-data/" target="_blank">Link</a> <br />
            Script URL and Data is {'<script src="{Script URL}" >{Data}</script>'}
          </div>
        
        
        <Table
          columns={columns}
          data={Widget_fundamental_datas}
          updateMyData={updateMyData}
          skipReset={skipResetRef.current}
          EditComponent={Widget_fundamental_dataEdit}
          DeleteRow = {deleteWidget_fundamental_data}
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

export default connect(mapStateToProps, null)(Widget_fundamental_data);
