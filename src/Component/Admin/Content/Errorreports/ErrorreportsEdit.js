import React, { useRef, useState, useEffect } from "react";
import {
  saveErrorreports,
  getErrorreport
} from "../../../../Services/Errorreports/errorreports";
//import { showAlertMSG } from "../../../../Lib/helpers";

function ErrorreportsEdit(props) {
  const ref_email = useRef(null);
  const ref_subject = useRef(null);
  const ref_status = useRef(null);

  const [statusSelected, setstatusSelected] = useState(-1);
  // const [sortedcategory, setsortedcategory] = useState([]);

  const getErrorreportData = async () => {
    let retData = await getErrorreport(props.data);
    if (retData !== null) {
      ref_email.current.value = retData.row.email;
      ref_subject.current.value = retData.row.subject;
      setstatusSelected(retData.row.status);
      // generateSelectOptions();
    }
  };

  useEffect(() => {
    if (props.data !== 0) {
      getErrorreportData(props.data);
    }
  }, []);

  const saveData = () => {
    
    let data = {
      id: props.data,
      email: ref_email.current.value,
      subject: ref_subject.current.value,
      status: ref_status.current.value,
    };
    saveErrorreports(data);
  };
  return (
    <div style={{ backgroundColor: "#fff" }}>
      <form>
        <div className="form-group">
          <label htmlFor="for_email">Email</label>
          <input
            ref={ref_email}
            type="text"
            className="form-control"
            id="for_email"
            placeholder="Enter Email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="for_subject">Subject</label>
          <input
            ref={ref_subject}
            type="text"
            className="form-control"
            id="for_subject"
            placeholder="Enter Subject"
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

export default ErrorreportsEdit;
