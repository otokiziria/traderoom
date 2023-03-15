import React, { useEffect, useState, useRef, useMemo } from "react";
import { getSymbols } from "../../../../Services/Symbols/symbols";
import {
  renewGroupPath,
  updateGroupPath,
  renewGroup,
  updateGroup,
  renewGroupData,
  updateActiveSymbolData,
  sendActiveSymbolMT5,
  sendActiveSymbolTick
} from "../../../../Services/Symbols/groups";
import TableSymbols from "../../Helpers/TableSymbols";
import SymbolsEdit from "./SymbolsEdit";

function Symbols() {
  const [symbols, setSymbols] = useState(null);

  const getSymbolData = async () => {
    setSymbols(await getSymbols());
  };

  useEffect(() => {
    getSymbolData();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        columns: [
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
            Header: "Path",
            accessor: "path",
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
            Header: "Description",
            accessor: "description",
            //Filter: SliderColumnFilter,
            filter: "equals",
            // Aggregate the average age of visitors
            aggregate: "average",
            Aggregated: ({ value }) => `${value} (avg)`,
          },
          {
            Header: "Contract Size",
            accessor: "contractSize",
            //Filter: SliderColumnFilter,
            filter: "equals",
            // Aggregate the average age of visitors
            aggregate: "average",
            Aggregated: ({ value }) => `${value} (avg)`,
          },
          {
            Header: "Currency Base",
            accessor: "currencyBase",
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
  }, [symbols]);

  console.log(symbols);
  if (symbols === undefined || symbols === null) {
    return <div>Loading</div>;
  } else {
    return (
      <div>
        <fieldset>
          <legend>Groups</legend>
          <div style={{ marginLeft: "10px", color: "red" }}>
            1) Renew group, <br />
            2) Renew group path, <br />
            3) Renew group data, <br />
            WARNING !!! when you renew groups and groups path you shuld update
            all your symbols path by hand and click Renew Groups Data button !!!
          </div>
          <div style={{ textAlign: "center" }}>
            <button
              className="btn btn-danger"
              style={{ marginLeft: "5px" }}
              onClick={() => {
                var r = window.confirm(
                  "Warning !!! If you renew group you should RENEW GROUP SYMBOL DATA, GROUP PATH AND THEN ALL ACTIVE SYMBOLS PATH too !!!"
                );
                if (r == true) {
                  renewGroup();
                }
              }}
            >
              Renew Group
            </button>
            <button
              className="btn btn-secondary"
              style={{ marginLeft: "5px" }}
              onClick={() => {
                updateGroup();
              }}
            >
              Update Group
            </button>
            <button
              className="btn btn-danger"
              style={{ marginLeft: "5px" }}
              onClick={() => {
                var r = window.confirm(
                  "Warning !!! If you renew group path you should RENEW GROUPS, TROUP SYMBOL DATA AND ALL ACTIVE SYMBOLS PATH too !!!"
                );
                if (r == true) {
                  renewGroupPath();
                }
              }}
            >
              Renew Group Path
            </button>
            <button
              className="btn btn-secondary"
              style={{ marginLeft: "5px" }}
              onClick={() => {
                updateGroupPath();
              }}
            >
              Update Group Path
            </button>

            <button
              className="btn btn-primary"
              style={{ marginLeft: "5px" }}
              onClick={() => {
                renewGroupData();
              }}
            >
              Renew Group Data
            </button>
            <button
              className="btn btn-primary"
              style={{ margin: "5px" }}
              onClick={() => {
                updateActiveSymbolData();
              }}
            >
              Update Active Symbol Data
            </button>
           {/*<button
              className="btn btn-primary"
              style={{ margin: "5px" }}
              onClick={() => {
                sendActiveSymbolMT5();
              }}
            >
              Send Active Symbols To MT5
            </button>
            */}
            <button
              className="btn btn-primary"
              style={{ margin: "5px" }}
              onClick={() => {
                sendActiveSymbolTick();
              }}
            >
              Send Active Symbols To Tick
            </button>
          </div>
        </fieldset>
        <fieldset>
          <legend>Symbols</legend>
          <TableSymbols
            columns={columns}
            data={symbols}
            updateMyData={updateMyData}
            skipReset={skipResetRef.current}
            EditComponent={SymbolsEdit}
            
          />
        </fieldset>
      </div>
    );
  }
}

export default Symbols;
