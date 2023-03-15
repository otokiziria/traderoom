import React, { useEffect, useState, useRef, useMemo } from "react";
import { getCategories } from "../../../../Services/Categories/categories";
import Table from "../../Helpers/Table";
import CategoriesEdit from "./CategoriesEdit";
import { connect } from "react-redux";
import { getRefreshPageAction } from "../../../../Red";
import store from "../../../../Red/store";
import {deleteCategory} from "../../../../Services/Categories/categories";
function Categories(props) {
  const [catregories, setCategories] = useState(null);

  const getCategoryData = async () => {
    let retData = await getCategories();
    if (retData !== null) {
      console.log(retData.row);
      setCategories(retData.row);
    }
  };

  useEffect(() => {
    getCategoryData();
  }, []);

  useEffect(() => {
    if (props.refreshPage) {
      setCategories(null);
      getCategoryData();
      store.dispatch(getRefreshPageAction(false));
    }
  }, [props.refreshPage]);

  console.log("categories");

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
            Header: "Parent",
            accessor: "parent_id",
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
  }, [catregories]);
  console.log(catregories);
  if (catregories === undefined || catregories === null) {
    return <div>Loading</div>;
  } else {
    return (
      <div>
        
        <Table
          columns={columns}
          data={catregories}
          updateMyData={updateMyData}
          skipReset={skipResetRef.current}
          EditComponent={CategoriesEdit}
          DeleteRow = {deleteCategory}
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

export default connect(mapStateToProps, null)(Categories);
