import React, { useRef, useEffect } from "react";
import {Redirect} from "react-router-dom";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthUser, loadUser } from "../../Services/Auth/auth";
import AlertMSG from "../Alerts/AlertMSG";
import { showAlertMSG } from "../../Lib/helpers";
import setAuthToken from "../../Utils/setAuthToken";

if (localStorage.getItem("token")) {
  setAuthToken(localStorage.getItem("token"));
}

function Auth(props) {
  useEffect(() => {
    loadUser()
  }, []);
  
  const ref_username = useRef(null);
  const ref_password = useRef(null);
  const Login = () => {
    let url = "/api/auth";
    if (
      !ref_username.current.value ||
      ref_username.current.value === null ||
      ref_username.current.value.length < 2
    ) {
      showAlertMSG("username is empty", 3);
      return false;
    }
    if (
      !ref_password.current.value ||
      ref_password.current.value === null ||
      ref_password.current.value.length < 6
    ) {
      showAlertMSG("password is empty", 3);
      return false;
    }
    let data = {
      username: ref_username.current.value,
      password: ref_password.current.value,
    };
    AuthUser(url, data);
  };
  if(props.auth.isAuthenticated === true){
    return <Redirect to="/administrator/dashboard" />
  }
  return (
    <div className="container">
      <AlertMSG />
      <div className="col-lg-4 mx-auto mt-5">
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Username</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            ref={ref_username}
            aria-describedby="Username"
            placeholder="Username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            ref={ref_password}
            placeholder="Password"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={() => {
            Login();
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
    return {
      auth: state.auth.auth,
    };
  };
  
export default connect(mapStateToProps, null)(Auth);

