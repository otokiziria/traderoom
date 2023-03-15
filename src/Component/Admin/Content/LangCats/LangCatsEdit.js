import React, { useRef, useState, useEffect } from "react";
import {
  saveLangCats,
  getLangCat
} from "../../../../Services/LangCat/langcats";
//import { showAlertMSG } from "../../../../Lib/helpers";

function CategoriesEdit(props) {
  const ref_title = useRef(null);
  const ref_alias = useRef(null);
  const ref_direction = useRef(null);
  const ref_default = useRef(null);
  const ref_status = useRef(null);

  const [statusSelected, setstatusSelected] = useState(-1);
  const [directionSelected, setdirectionSelected] = useState(-1);
  const [defaultSelected, setdefaultSelected] = useState(-1);

  const getLangCatData = async () => {
    let retData = await getLangCat(props.data);
    if (retData !== null) {
      ref_title.current.value = retData.row.title;
      ref_alias.current.value = retData.row.alias;
      setdefaultSelected(retData.row.default);
      setstatusSelected(retData.row.status);
      setdirectionSelected(retData.row.direction);
      // generateSelectOptions();
    }
  };

  useEffect(() => {
    if (props.data !== 0) {
      getLangCatData(props.data);
    }
  }, []);

  const saveData = () => {
    
    let data = {
      id: props.data,
      title: ref_title.current.value,
      alias: ref_alias.current.value,
      isdefault: ref_default.current.value,
      direction: ref_direction.current.value,
      status: ref_status.current.value
    };
    saveLangCats(data);
  };
  return (
    <div style={{ backgroundColor: "#fff" }}>
      <form>
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
          <label htmlFor="for_alias">Alis</label>
          <input
            ref={ref_alias}
            type="text"
            className="form-control"
            id="for_alias"
            placeholder="Enter alias"
          />
        </div>
        <div className="form-group">
          <label htmlFor="for_default">Default</label>
          <select
            ref={ref_default}
            value={defaultSelected}
            id="for_default"
            className="form-control"
            onChange={(e)=>{
                setdefaultSelected(e.target.value);
            }}
          >
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="for_direction">Direction</label>
          <select
            ref={ref_direction}
            value={directionSelected}
            id="for_direction"
            className="form-control"
            onChange={(e)=>{
                setdirectionSelected(e.target.value);
            }}
          >
            <option value="ltr">Left To Right</option>
            <option value="rtl">Right To Left</option>
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

export default CategoriesEdit;
