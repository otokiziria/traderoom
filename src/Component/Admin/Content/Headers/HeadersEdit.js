import React, { useRef, useState, useEffect } from "react";
import {
  saveHeaders,
  getHeader,
  uploadImages
} from "../../../../Services/Headers/headers";
//import { showAlertMSG } from "../../../../Lib/helpers";

function HeadersEdit(props) {
  const ref_dark_image = useRef(null);
  const ref_light_image = useRef(null);
  const ref_logo_text = useRef(null);
  const ref_show_logo = useRef(null);
  const ref_show_logo_text = useRef(null);
  const ref_show_account_name = useRef(null);
  const ref_status = useRef(null);

  const [statusSelected, setstatusSelected] = useState(-1);
  const [showAccountNameSelected, setshowAccountNameSelected] = useState(-1);
  const [showLogoTextSelected, setshowLogoTextSelected] = useState(-1);
  const [showLogoSelected, setshowLogoSelected] = useState(-1);
  const [darkLogoFile,  setdarkLogoFile] = useState(null);
  const [lightLogoFile,  setlightLogoFile] = useState(null);
  const [darkLogoNameFile,  setdarkLogoNameFile] = useState('');
  const [lightLogoNameFile,  setlightLogoNameFile] = useState('');
  // const [sortedcategory, setsortedcategory] = useState([]);

  const getHeaderData = async () => {
    let retData = await getHeader(props.data);
    if (retData !== null) {
      ref_logo_text.current.value = retData.row.logo_text;
      setdarkLogoNameFile(retData.row.dark_image);
      setlightLogoNameFile(retData.row.light_image);
      setstatusSelected(retData.row.status);
      setshowAccountNameSelected(retData.row.show_account_name);
      setshowLogoTextSelected(retData.row.show_logo_text);
      setshowLogoSelected(retData.row.show_logo);
      
      // generateSelectOptions();
    }
  };

  useEffect(() => {
    if (props.data !== 0) {
      getHeaderData(props.data);
    }
  }, []);

  const saveData = async (e) => {
    e.preventDefault();
    let dark_name = darkLogoNameFile;
    let light_name = lightLogoNameFile;
    if(darkLogoFile !== null && darkLogoFile != ''){
        let uplDarkImage = await uploadImages(darkLogoFile);
        if(uplDarkImage.status == 1){
          dark_name = uplDarkImage.filename;
        }
    }

    if(lightLogoFile !== null && lightLogoFile != ''){
      let uplLightImage = await uploadImages(lightLogoFile);

      console.log(uplLightImage);
      if(uplLightImage.status == 1){
        light_name = uplLightImage.filename;
      }
  }
console.log('lightLogoNameFile = ',light_name);
 
    let data = {
      id: props.data,
      dark_image: (dark_name !== null) ? dark_name : '',
      light_image: (light_name !== null) ? light_name : '',
      status: ref_status.current.value,
      logo_text: ref_logo_text.current.value,
      show_logo_text: ref_show_logo_text.current.value,
      show_logo: ref_show_logo.current.value,
      show_account_name: ref_show_account_name.current.value
    };
    saveHeaders(data);
  };
  return (
    <div style={{ backgroundColor: "#fff" }}>
      <form>
        <div className="form-group">
          <label htmlFor="for_state">Dark Logo</label>
          <input type="file" ref={ref_dark_image} className='className="form-control"' onChange={(e)=>{
                setdarkLogoFile(e.target.files[0]);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="for_state">Light Logo</label>
          <input type="file" ref={ref_light_image} className='className="form-control"' onChange={(e)=>{
                setlightLogoFile(e.target.files[0]);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="for_originalte">Logo Text</label>
          <input
            ref={ref_logo_text}
            type="text"
            className="form-control"
            id="for_original"
            placeholder="Logo Text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="for_state">Show Logo</label>
          <select
            ref={ref_show_logo}
            value={showLogoSelected}
            id="for_state"
            className="form-control"
            onChange={(e)=>{
                setshowLogoSelected(e.target.value);
            }}
          >
            <option value="0">Hide</option>
            <option value="1">Show</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="for_state">Show Logo Text</label>
          <select
            ref={ref_show_logo_text}
            value={showLogoTextSelected}
            id="for_state"
            className="form-control"
            onChange={(e)=>{
                setshowLogoTextSelected(e.target.value);
            }}
          >
            <option value="0">Hide</option>
            <option value="1">Show</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="for_state">Show Account Name</label>
          <select
            ref={ref_show_account_name}
            value={showAccountNameSelected}
            id="for_state"
            className="form-control"
            onChange={(e)=>{
                setshowAccountNameSelected(e.target.value);
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
          onClick={(e) => {
            e.preventDefault();
            saveData(e);
          }}
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default HeadersEdit;
