import React, { useRef, useState, useEffect } from "react";
import {
  saveErrorreports,
  getErrorreports
} from "../../../../Services/Errorreports/errorreports";
function Errorreports(props) {
  const ref_email = useRef(null);
  const ref_subject = useRef(null);
  const ref_password = useRef(null);
  const ref_emails = useRef(null);

  const getErrorreportData = async () => {
    let retData = await getErrorreports(props.data);
    if (retData !== null) {
      ref_email.current.value = retData.row.email;
      ref_subject.current.value = retData.row.subject;
      ref_password.current.value = retData.row.password;
      ref_emails.current.value = retData.row.emails;
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
      password: ref_password.current.value,
      emails: ref_emails.current.value,
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
          <label htmlFor="for_emails">Addresat Emails (Seperate with comma (,))</label>
          <textarea
            ref={ref_emails}
            type="text"
            className="form-control"
            id="for_emails"
            placeholder="Enter Adresat Emails"
          ></textarea>
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
export default Errorreports;
