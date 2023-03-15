import React, { useEffect, useState, useRef, useMemo } from "react";
import { getSettings, deleteSetting } from "../../../../Services/Settings/settings";
import Table from "../../Helpers/Table";
import SettingsEdit from "./SettingsEdit";
import { connect } from "react-redux";
import { getRefreshPageAction } from "../../../../Red";
import store from "../../../../Red/store";
function Settings(props) {
  const [Settings, setSettings] = useState(null);

  const getSettingData = async () => {
    let retData = await getSettings();
    if (retData !== null) {
      console.log(retData.row);
      setSettings(retData.row);
    }
  };

  useEffect(() => {
    getSettingData();
  }, []);

  useEffect(() => {
    if (props.refreshPage) {
      setSettings(null);
      getSettingData();
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
            Header: "Website URL",
            accessor: "website_url",
            // Use a two-stage aggregator here to first
            // count the total rows being aggregated,
            // then sum any of those counts if they are
            // aggregated further
            aggregate: "count",
            Aggregated: ({ value }) => `${value} Names`,
          },
          {
            Header: "CRM URL",
            accessor: "crm_url",
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
  }, [Settings]);
  console.log(Settings);
  if (Settings === undefined || Settings === null) {
    return <div>Loading</div>;
  } else {
    return (
      <div>
        
        <Table
          columns={columns}
          data={Settings}
          updateMyData={updateMyData}
          skipReset={skipResetRef.current}
          EditComponent={SettingsEdit}
          DeleteRow = {deleteSetting}
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

export default connect(mapStateToProps, null)(Settings);
