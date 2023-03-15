import React, { useRef, useState, useEffect } from "react";
import {
  saveWidget_symbol_profiles,
  getWidget_symbol_profile
} from "../../../../Services/Widget_symbol_profile/widget_symbol_profile";
//import { showAlertMSG } from "../../../../Lib/helpers";

function Widget_symbol_profileEdit(props) {
  const ref_title = useRef(null);
  const ref_script_url = useRef(null);
  const ref_light_content = useRef(null);
  const ref_dark_content = useRef(null);
  const ref_current_symbol = useRef(null);
  const ref_status = useRef(null);

  const [statusSelected, setstatusSelected] = useState(-1);
  const [current_symbolSelected, setcurrent_symbolSelected] = useState(-1);
  // const [sortedcategory, setsortedcategory] = useState([]);

  const getWidget_symbol_profileData = async () => {
    let retData = await getWidget_symbol_profile(props.data);
    if (retData !== null) {
      ref_title.current.value = retData.row.title;
      ref_script_url.current.value = retData.row.script_url;
      ref_light_content.current.value = retData.row.light_content;
      ref_dark_content.current.value = retData.row.dark_content;
      setstatusSelected(retData.row.status);
      setcurrent_symbolSelected(retData.row.current_symbol);
      // generateSelectOptions();
    }
  };

  useEffect(() => {
    if (props.data !== 0) {
      getWidget_symbol_profileData(props.data);
    }
  }, []);

  const saveData = () => {
    
    let data = {
      id: props.data,
      title: ref_title.current.value,
      script_url: ref_script_url.current.value,
      status: ref_status.current.value,
      light_content: ref_light_content.current.value,
      dark_content: ref_dark_content.current.value,
      current_symbol: ref_current_symbol.current.value
    };
    saveWidget_symbol_profiles(data);
  };
  return (
    <div style={{ backgroundColor: "#fff" }}>
      <form>
        <div className="form-group">
          <label htmlFor="for_title">Title</label>
          <input type="text"
            ref={ref_title}
            id="for_title"
            className="form-control"
           
          />
        </div>
        <div className="form-group">
          <label htmlFor="for_script_url">Script URL</label>
          <input type="text"
            ref={ref_script_url}
            id="for_script_url"
            className="form-control"
           
          />
        </div>
        <div className="form-group">
          <label htmlFor="for_light_content">Widget Light Data</label>
          <textarea
            ref={ref_light_content}
            id="for_light_content"
            className="form-control"
           
          />
        </div>
        <div className="form-group">
          <label htmlFor="for_light_content">Widget Dark Data</label>
          <textarea
            ref={ref_dark_content}
            id="for_light_content"
            className="form-control"
           
          />
        </div>
        <div className="form-group">
          <label htmlFor="for_current_symbol">Show Current Symbol Data</label>
          <select
            ref={ref_current_symbol}
            value={current_symbolSelected}
            id="for_current_symbol"
            className="form-control"
            onChange={(e)=>{
                setcurrent_symbolSelected(e.target.value);
            }}
          >
            <option value="0">Hide</option>
            <option value="1">Show</option>
          </select>
        </div>
       
        <div className="form-group">
          <label htmlFor="for_state">State</label>
          <select
            ref={ref_status}
            value={statusSelected}
            id="for_state"
            className="form-control"
            onChange={(e)=>{
                setstatusSelected(e.target.value);
            }}
          >
            <option value="0">Unpublished</option>
            <option value="1">Published</option>
          </select>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            saveData();
          }}
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default Widget_symbol_profileEdit;
