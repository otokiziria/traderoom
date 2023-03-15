import React, { useEffect, useState, useRef, useMemo } from "react";
import { getSymbolsSettings } from "../../../../Services/Symbols-Settings/symbols-settings";
import Table from "../../Helpers/Table";
import SymbolsSettingsEdit from "./Symbols-SettingsEdit";
import { connect } from "react-redux";
import { getRefreshPageAction } from "../../../../Red";
import store from "../../../../Red/store";
import {deleteSymbolsSetting} from "../../../../Services/Symbols-Settings/symbols-settings";
function SymbolsSettings(props) {
  const [SymbolsSettings, setSymbolsSettings] = useState(null);

  const getSymbolsSettingData = async () => {
    let retData = await getSymbolsSettings();
   
    if (retData !== null) {
      setSymbolsSettings(retData.row);
    }
  };

  useEffect(() => {
    getSymbolsSettingData();
  }, []);

  useEffect(() => {
    if (props.refreshPage) {
      setSymbolsSettings(null);
      getSymbolsSettingData();
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
            Header: "Show Title",
            accessor: "show_title",
            // Use a two-stage aggregator here to first
            // count the total rows being aggregated,
            // then sum any of those counts if they are
            // aggregated further
            aggregate: "count",
            Aggregated: ({ value }) => `${value} Names`,
          },
          {
            Header: "Show Chart",
            accessor: "show_chart",
            // Use a two-stage aggregator here to first
            // count the total rows being aggregated,
            // then sum any of those counts if they are
            // aggregated further
            aggregate: "count",
            Aggregated: ({ value }) => `${value} Names`,
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
  }, [SymbolsSettings]);
  
  if (SymbolsSettings === undefined || SymbolsSettings === null) {
    return <div>Loading</div>;
  } else {
    return (
      <div>
        
        <Table
          columns={columns}
          data={SymbolsSettings}
          updateMyData={updateMyData}
          skipReset={skipResetRef.current}
          EditComponent={SymbolsSettingsEdit}
          DeleteRow = {deleteSymbolsSetting}
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

export default connect(mapStateToProps, null)(SymbolsSettings);
