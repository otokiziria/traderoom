import React, { useRef, useState, useEffect } from "react";
import {
  saveMT5s,
  getMT5
} from "../../../../Services/MT5s/MT5s";
//import { showAlertMSG } from "../../../../Lib/helpers";

function MT5sEdit(props) {
  const ref_server = useRef(null);
  const ref_username = useRef(null);
  const ref_password = useRef(null);
  const ref_group = useRef(null);
  const ref_status = useRef(null);

  const [statusSelected, setstatusSelected] = useState(-1);
  // const [sortedcategory, setsortedcategory] = useState([]);

  const getMT5Data = async () => {
    let retData = await getMT5(props.data);
    if (retData !== null) {
      setstatusSelected(retData.row.status);
      ref_server.current.value = retData.row.server;
      ref_username.current.value = retData.row.username;
      ref_password.current.value = retData.row.password;
      ref_group.current.value = retData.row.group;
      // generateSelectOptions();
    }
  };

  useEffect(() => {
    if (props.data !== 0) {
      getMT5Data(props.data);
    }
  }, []);

  const saveData = () => {
    
    let data = {
      id: props.data,
      server: ref_server.current.value,
      username: ref_username.current.value,
      password: ref_password.current.value,
      group: ref_group.current.value,
      status: ref_status.current.value,
    };
    saveMT5s(data);
  };
  return (
    <div style={{ backgroundColor: "#fff" }}>
      <form>
        <div className="form-group">
          <label htmlFor="for_server">Server</label>
          <input
            ref={ref_server}
            type="text"
            className="form-control"
            id="for_server"
            placeholder="Enter Server"
          />
        </div>
        <div className="form-group">
          <label htmlFor="for_username">Username</label>
          <input
            ref={ref_username}
            type="text"
            className="form-control"
            id="for_username"
            placeholder="Enter Username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="for_password">Password</label>
          <input
            ref={ref_password}
            type="text"
            className="form-control"
            id="for_password"
            placeholder="Enter Password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="for_group">Group</label>
          <input
            ref={ref_group}
            type="text"
            className="form-control"
            id="for_group"
            placeholder="Enter Group"
          />
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

export default MT5sEdit;
