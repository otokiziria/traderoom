import React, { useRef, useState, useEffect } from "react";
import {
  saveNginxs,
  getNginx
} from "../../../../Services/Nginxs/nginxs";
//import { showAlertMSG } from "../../../../Lib/helpers";

function NginxsEdit(props) {
  const ref_domain = useRef(null);
  const ref_mt5_socket_url = useRef(null);
  const ref_crm_socket_url = useRef(null);
  const ref_tick_socket_url = useRef(null);
  const ref_status = useRef(null);

  const [statusSelected, setstatusSelected] = useState(-1);
  // const [sortedcategory, setsortedcategory] = useState([]);

  const getNginxData = async () => {
    let retData = await getNginx(props.data);
    if (retData !== null) {
      setstatusSelected(retData.row.status);
      ref_domain.current.value = retData.row.domain;
      ref_mt5_socket_url.current.value = retData.row.mt5_socket_url;
      ref_crm_socket_url.current.value = retData.row.crm_socket_url;
      ref_tick_socket_url.current.value = retData.row.tick_socket_url;
      // generateSelectOptions();
    }
  };

  useEffect(() => {
    if (props.data !== 0) {
      getNginxData(props.data);
    }
  }, []);

  const saveData = () => {
    
    let data = {
      id: props.data,
      domain: ref_domain.current.value,
      mt5_socket_url : ref_mt5_socket_url .current.value,
      status: ref_status.current.value,
      crm_socket_url: ref_crm_socket_url.current.value,
      tick_socket_url: ref_tick_socket_url.current.value
    };
    saveNginxs(data);
  };
  return (
    <div style={{ backgroundColor: "#fff" }}>
      <form>
        <div className="form-group">
          <label htmlFor="for_domain">Domain</label>
          <input
            ref={ref_domain}
            type="text"
            className="form-control"
            id="for_domain"
            placeholder="Enter Domain"
          />
        </div>
        <div className="form-group">
          <label htmlFor="for_mt5_socket_url">MT5 Socket Url</label>
          <input
            ref={ref_mt5_socket_url}
            type="text"
            className="form-control"
            id="for_mt5_socket_url"
            placeholder="Enter MT5 Socket Url"
          />
        </div>
        <div className="form-group">
          <label htmlFor="for_crm_socket_url">CRM Socket Url</label>
          <input
            ref={ref_crm_socket_url}
            type="text"
            className="form-control"
            id="for_crm_socket_url"
            placeholder="Enter CRM Socket Url"
          />
          
        </div>
        <div className="form-group">
          <label htmlFor="for_tick_socket_url">Tick Socket Url</label>
          <input
            ref={ref_tick_socket_url}
            type="text"
            className="form-control"
            id="for_tick_socket_url"
            placeholder="Enter Tick Socket Url"
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

export default NginxsEdit;
