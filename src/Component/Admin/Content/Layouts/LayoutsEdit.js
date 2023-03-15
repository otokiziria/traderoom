import React, { useEffect, useState, useRef } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
import { saveLayouts, getLayout } from "../../../../Services/Layouts/layouts";
import "./grid-layout-style.css";
import "./grid-responsive-layout.css";
import { showAlertMSG } from "../../../../Lib/helpers";
//import { showAlertMSG } from "../../../../Lib/helpers";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

function LayoutsEdit(props) {
  const [layouts, setlayouts] = useState(
      {}
  );
  
  /*
 [0, 1, 2, 3, 4].map(function (i, key, list) {
      return {
        i: i.toString(),
        x: i * 2,
        y: 0,
        w: 2,
        h: 2,
      };
    })
  */
  const [componentsInLayout, setcomponentsInLayout] = useState({});
  const [items, setitems] = useState(
   {}
  );
  const [newCounter, setnewCounter] = useState(0);
  const [cols, setcols] = useState({ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 });
  const [rowHeight, setrowHeight] = useState(100);
  const [className, setclassName] = useState("layout");

  const ref_title = useRef(null);
  const ref_makecenter = useRef(null);
  const ref_flexgrid = useRef(null);
  const ref_mobile = useRef(null);
  const ref_status = useRef(null);

  const [statusSelected, setstatusSelected] = useState(-1);
  const [makecenter, setmakecenter] = useState(-1);
  const [flexgrid, setflexgrid] = useState(-1);
  const [mobile, setmobile] = useState(-1);

  const getLayoutData = async () => {
    let retData = await getLayout(props.data);
    if (retData !== null) {
      //console.log(retData.row.layouts);
      ref_title.current.value = retData.row.title;
      setstatusSelected(retData.row.status);
      setmakecenter(retData.row.makecenter);
      setflexgrid(retData.row.flexgrid);
      setmobile(retData.row.mobile);
      let itArr = [];
      let dItems = JSON.parse(retData.row.layouts).map(function (
        row,
        key,
        list
      ) {
        itArr.push(parseInt(row["i"]))
        return {
          i: row["i"],
          x: parseInt(row["x"]),
          y: parseInt(row["y"]),
          w: parseInt(row["w"]),
          h: parseInt(row["h"]),
        };
      });
      setitems(dItems);
      setnewCounter(_.max(itArr) + 1);
      setcomponentsInLayout(JSON.parse(retData.row.components));
      JSON.parse(retData.row.layouts).map(function (
        row,
        key,
        list
      ) {
        let compInLa = JSON.parse(retData.row.components);
        if(compInLa[row['i']] !== undefined){
          let insertHtml = '';
          for(let iterator = 0; iterator<compInLa[row['i']].length; iterator ++){
            insertHtml +="<div>" + compInLa[row['i']][iterator] + "</div>";
          }
          document.getElementById("box_com_" + row['i']).innerHTML = insertHtml;
        }
      });
    }
  };

  useEffect(() => {
    if (props.data !== 0) {
      getLayoutData(props.data);
    }
    else{
      setitems([0, 1, 2, 3].map(function (i, key, list) {
        return {
          i: i.toString(),
          x: i * 2,
          y: 0,
          w: 2,
          h: 2,
        };
      }));
      setnewCounter(4);
    }
    //(5);
  }, []);

  const addCompInLayout = (i, comp) => {
    let cmp = componentsInLayout;
    document.getElementById("box_com_" + i).innerHTML = "";
    if (cmp[i] === undefined || !cmp[i].includes(comp)) {
      if (cmp[i] !== undefined) {
        cmp[i].push(comp);
      } else {
        cmp[i] = [comp];
      }

      setcomponentsInLayout(cmp);
      if (
        componentsInLayout[i] !== undefined &&
        componentsInLayout[i].length > 0
      ) {
        let html = "";
        for (let it = 0; it < componentsInLayout[i].length; it++) {
          html += "<div>" + componentsInLayout[i][it] + "</div>";
        }
        document.getElementById("box_com_" + i).innerHTML = html;
      }
    } else {
      if (cmp[i] !== undefined && cmp[i].includes(comp)) {
        const index = cmp[i].indexOf(comp);
        if (index > -1) {
          cmp[i].splice(index, 1);
        }
        setcomponentsInLayout(cmp);
        if (
          componentsInLayout[i] !== undefined &&
          componentsInLayout[i].length > 0
        ) {
          let html = "";
          for (let it = 0; it < componentsInLayout[i].length; it++) {
            html += "<div>" + componentsInLayout[i][it] + "</div>";
          }
          document.getElementById("box_com_" + i).innerHTML = html;
        }
      }
    }
  };

  const createElement = (el) => {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer",
    };
    const addComponentStyle = {
      position: "absolute",
      left: "2px",
      top: 0,
      cursor: "pointer",
    };

    const i = el.add ? "+" : el.i;
   // console.log('el = ',el);
    return (
      <div key={i} data-grid={el}>
        <span className={addComponentStyle}>
          <div className="btn-group">
            <button
              className="btn dropdown-toggle"
              data-toggle="dropdown"
              onClick={() => {
                var div = document.getElementById("dropDown_" + i);
                //console.log(div.style.display);
                if (div.style.display == "none") {
                  div.style.display = "block";
                } else {
                  div.style.display = "none";
                }
              }}
            >
              <span className="caret"></span>
            </button>
            <div
              id={"dropDown_" + i}
              style={{
                display: "none",
                textAlign: "center",
                position: "absolute",
                width: "100px",
                left: "5px",
                top: "30px",
                backgroundColor: "black",
                color: "white",
              }}
            >
              <div
                className=""
                style={{
                  cursor: "pointer",
                  fontSize: "12px",
                  borderBottom: "1px solid #fff",
                }}
                onClick={() => {
                  addCompInLayout(i, "header");
                }}
              >
                Header
              </div>
              <div
                className=""
                style={{
                  cursor: "pointer",
                  fontSize: "12px",
                  borderBottom: "1px solid #fff",
                }}
                onClick={() => {
                  addCompInLayout(i, "totalfigures");
                }}
              >
                Total Figures
              </div>
              <div
                className=""
                style={{
                  cursor: "pointer",
                  fontSize: "12px",
                  borderBottom: "1px solid #fff",
                }}
                onClick={() => {
                  addCompInLayout(i, "chart");
                }}
              >
                Chart
              </div>
              <div
                className=""
                style={{
                  cursor: "pointer",
                  fontSize: "12px",
                  borderBottom: "1px solid #fff",
                }}
                onClick={() => {
                  addCompInLayout(i, "leftside");
                }}
              >
                Left Side
              </div>
              <div
                className=""
                style={{
                  cursor: "pointer",
                  fontSize: "12px",
                  borderBottom: "1px solid #fff",
                }}
                onClick={() => {
                  addCompInLayout(i, "positions");
                }}
              >
                Positions
              </div>
              <div
                className=""
                style={{
                  cursor: "pointer",
                  fontSize: "12px",
                  borderBottom: "1px solid #fff",
                }}
                onClick={() => {
                  addCompInLayout(i, "histories");
                }}
              >
                Histories
              </div>
              <div
                className=""
                style={{
                  cursor: "pointer",
                  fontSize: "12px",
                  borderBottom: "1px solid #fff",
                }}
                onClick={() => {
                  addCompInLayout(i, "orders");
                }}
              >
                Orders
              </div>

              <div
                className=""
                style={{
                  cursor: "pointer",
                  fontSize: "12px",
                  borderBottom: "1px solid #fff",
                }}
                onClick={() => {
                  addCompInLayout(i, "widgets_economiccalendar");
                }}
              >
                Economic Calendar
              </div>
              <div
                className=""
                style={{
                  cursor: "pointer",
                  fontSize: "12px",
                  borderBottom: "1px solid #fff",
                }}
                onClick={() => {
                  addCompInLayout(i, "widgets_fundamentaldata");
                }}
              >
                Fundamental Data
              </div>
              <div
                className=""
                style={{
                  cursor: "pointer",
                  fontSize: "12px",
                  borderBottom: "1px solid #fff",
                }}
                onClick={() => {
                  addCompInLayout(i, "widgets_marketoverview");
                }}
              >
                Market Overview
              </div>
              <div
                className=""
                style={{
                  cursor: "pointer",
                  fontSize: "12px",
                  borderBottom: "1px solid #fff",
                }}
                onClick={() => {
                  addCompInLayout(i, "widgets_symbolprofile");
                }}
              >
                Symbol Profile
              </div>
              <div
                className=""
                style={{
                  cursor: "pointer",
                  fontSize: "12px",
                  borderBottom: "1px solid #fff",
                }}
                onClick={() => {
                  addCompInLayout(i, "widgets_technicalanalysis");
                }}
              >
                Technical Analysis
              </div>
            </div>
          </div>
        </span>
        <span className="text" id={"box_com_" + i}></span>
        <span
          className="remove"
          style={removeStyle}
          onClick={() => {
            onRemoveItem(i);
          }}
        >
          x
        </span>
      </div>
    );
  };

  const onSaveItem = () => {
    /*eslint no-console: 0*/
    //setitems(layouts);
    console.log('Items = ', layouts)
    if (items.length == 0) {
      showAlertMSG("Items is empty", 3);
      return false;
    } else if (
      ref_title.current.value == null ||
      ref_title.current.value == ""
    ) {
      showAlertMSG("Title is empty", 3);
      return false;
    } else {
      var objComponentsInLayout = {};
      for(var key in componentsInLayout){
        let good = false;
        for(var it = 0; it < layouts.length; it++){
          if(key == layouts[it].i){
            good = true;
          }
        }
        if(good){
          objComponentsInLayout[key] = componentsInLayout[key];
        }
      }
      
      let data = {
        id: props.data,
        title: ref_title.current.value,
        layouts: layouts,
        components: objComponentsInLayout,
        makecenter: ref_makecenter.current.value,
        flexgrid: ref_flexgrid.current.value,
        mobile: ref_mobile.current.value,
        status: ref_status.current.value,
      };
      console.log("componentsInLayout = ", componentsInLayout);
      console.log("items = ", items);
      console.log(data, "sadasd");
      saveLayouts(data);
    }
  };

  const onAddItem = () => {
    /*eslint no-console: 0*/
    console.log("adding", newCounter);
    setitems(
      items.concat({
        i: newCounter.toString(),
        x: (items.length * 2) % (cols || 12),
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 2,
      })
    );
    setnewCounter(newCounter + 1);
  };

  const onBreakpointChange = (breakpoint, columns) => {
    setcols(columns);
  };

  const onLayoutChange = (layout) => {
   // console.log("layout = ", layout);
    setlayouts(layout);
  };

  const onRemoveItem = (i) => {
    console.log("removing", i);
    setitems(_.reject(items, { i: i }));
  };

  // layaut select form validation
  useEffect(() => {
    console.log(flexgrid, makecenter);
    if(flexgrid == 1){
      setmobile(0);
      setmakecenter(0);
    }
  }, [flexgrid, mobile, makecenter]);

  return (
    <div style={{ backgroundColor: "#fff" }}>
      <button className="btn btn-success m-2" onClick={onAddItem}>
        Add Item
      </button>
      <button className="btn btn-success m-2" onClick={onSaveItem}>
        Save Layout
      </button>
      <div className="form-group">
        <label htmlFor="for_state">Title</label>
        <input
          ref={ref_title}
          type="text"
          className="form-control"
          id="for_title"
          placeholder="Enter title"
        />
      </div>

      <div className="form-group">
        <label htmlFor="for_makecenter">Make Center</label>
        <select
          ref={ref_makecenter}
          value={makecenter}
          id="for_makecenter"
          className="form-control"
          onChange={(e) => {
            setmakecenter(e.target.value);
          }}
        >
          <option value="0">false</option>
          <option value="1">true</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="for_flexgrid">Flex Grid</label>
        <select
          ref={ref_flexgrid}
          value={flexgrid}
          id="for_flexgrid"
          className="form-control"
          onChange={(e) => {
            setflexgrid(e.target.value);
          }}
        >
          <option value="0">false</option>
          <option value="1">true</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="for_mobile">Mobile</label>
        <select
          ref={ref_mobile}
          value={mobile}
          id="for_mobile"
          className="form-control"
          onChange={(e) => {
            setmobile(e.target.value);
          }}
        >
          <option value="0">false</option>
          <option value="1">true</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="for_state">State</label>
        <select
          ref={ref_status}
          value={statusSelected}
          id="for_state"
          className="form-control"
          onChange={(e) => {
            setstatusSelected(e.target.value);
          }}
        >
          <option value="0">Unpublished</option>
          <option value="1">Published</option>
        </select>
      </div>
     
      <ResponsiveReactGridLayout
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        onLayoutChange={onLayoutChange}
        onBreakpointChange={onBreakpointChange}
        layout={items}
        rowHeight={75}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        {...props}
      >
        {_.map(items, (el) => createElement(el))}
      </ResponsiveReactGridLayout>
     
    </div>
  );
}

export default LayoutsEdit;
