import React, { useRef, useState, useEffect } from "react";
import {
  saveSettings,
  getSetting,
  uploadFavicon
} from "../../../../Services/Settings/settings";
//import { showAlertMSG } from "../../../../Lib/helpers";

function SettingsEdit(props) {
  const ref_crm_url = useRef(null);
  const ref_website_url = useRef(null);
  const ref_traderoom_url = useRef(null);
  const ref_mt5_main_name = useRef(null);
  const ref_status = useRef(null);

  const [statusSelected, setstatusSelected] = useState(-1);
  const [favicon, setfavicon] = useState(null);
  

  const getSettingData = async () => {
    let retData = await getSetting(props.data);
    if (retData !== null) {
      ref_crm_url.current.value = retData.row.crm_url;
      ref_website_url.current.value = retData.row.website_url;
      ref_mt5_main_name.current.value = retData.row.mt5_main_name;
      setstatusSelected(retData.row.status);
      ref_traderoom_url.current.value = retData.row.traderoom_url;
      
      // generateSelectOptions();
    }
  };

  useEffect(() => {
    if (props.data !== 0) {
      getSettingData(props.data);
    }
  }, []);

  const saveData = async (e) => {
    e.preventDefault();
   
    let data = {
      id: props.data,
      crm_url: ref_crm_url.current.value,
      website_url: ref_website_url.current.value,
      mt5_main_name: ref_mt5_main_name.current.value,
      status: ref_status.current.value,
      traderoom_url: ref_traderoom_url.current.value
    };
    saveSettings(data);
  };
  const saveFaviconData = async (e) => {
    e.preventDefault();
   
    if(favicon !== null && favicon != ''){
        let uplDarkImage = await uploadFavicon(favicon);
        
    }
 
  };
  return (
    <div style={{ backgroundColor: "#fff" }}>
      <form>
        <div className="form-group">
          <label htmlFor="for_state">Favicon</label>
          <input type="file"  className='className="form-control"' onChange={(e)=>{
                setfavicon(e.target.files[0]);
            }}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="for_originalte">Website URL</label>
          <input
            ref={ref_website_url}
            type="text"
            className="form-control"
            id="for_original"
            placeholder="Website Url"
          />
        </div>
        <div className="form-group">
          <label htmlFor="for_originalte">CRM URL</label>
          <input
            ref={ref_crm_url}
            type="text"
            className="form-control"
            id="for_original"
            placeholder="CRM Url"
          />
        </div>
        <div className="form-group">
          <label htmlFor="for_originalte">Traderoom URL</label>
          <input
            ref={ref_traderoom_url}
            type="text"
            className="form-control"
            id="for_original"
            placeholder="Traderoom Url"
          />
        </div>
        <div className="form-group">
          <label htmlFor="for_originalte">MT5 Main Name</label>
          <input
            ref={ref_mt5_main_name}
            type="text"
            className="form-control"
            id="for_original"
            placeholder="MT5 Main Name"
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
          onClick={(e) => {
            e.preventDefault();
            saveData(e);
          }}
        >
          Save
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            saveFaviconData(e);
          }}
        >
          Save Favicon
        </button>
      </form>
    </div>
  );
}

export default SettingsEdit;
