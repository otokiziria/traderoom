import React, { useState, useEffect, useRef } from "react";
//import { useTranslation } from "react-i18next";
import { getData, getSetting } from "../../Services/LoadContent/LoadContent";
import { connect } from "react-redux";
import AlertMSG from "../Alerts/AlertMSG";
import Index from "./Index";
import { showAlertMSG } from "../../Lib/helpers";
import Errors from "../Errors/Errors";
import setAuthToken from "../../Utils/setAuthToken";
import { loadUser } from "../../Services/CustomerAuth/auth";

if (localStorage.getItem("token")) {
  setAuthToken(localStorage.getItem("token"));
}

function SiteLoader(props) {
  //const { t } = useTranslation();
  const [divPercent, setdivPercent] = useState(0);
  const [isAuth, setisAuth] = useState(true);
  const percentRef = useRef(null);
  const getWebsiteData = async () => {
    let set = await getSetting();
    if (set !== null && set.status == 1) {
      console.log(localStorage.getItem("token"));
      if (!localStorage.getItem("token")) {
        window.location.replace(set.row.website_url);
      }
      console.log(set.row.website_url);
      let loadUsr = await loadUser(set.row.website_url);
      if (loadUsr == undefined || loadUsr.status == 0) {
        setisAuth(false)
      }

      console.log('loadUsr = ', loadUsr);
      if (loadUsr !== undefined && loadUsr.status == 1) {
        let retData = await getData();
      }

    }
    else {
      showAlertMSG('Settings did not loaded !!!', 3)
    }
  };

  useEffect(() => {

    getWebsiteData();
  }, []);

  useEffect(() => {
    let percent = (props.siteLoader * 100) / props.siteLoaderCount;
    setdivPercent(percent);
    if (percentRef.current !== null) {
      percentRef.current.innerHTML = percent.toFixed(1);
    }
    //alert(props.siteLoader)
    console.log(props.siteLoaderCount, props.siteLoader);
  }, [props.siteLoaderCount, props.siteLoader]);
  if (!isAuth) {
    return <AlertMSG />
  }
  else if (divPercent < 100) {
    return (
      <div className="site" style={{ width: "100%", backgroundColor: "#000", height: "100vh" }}>
        <AlertMSG />
        <div
          style={{
            width: "200px",
            height: "100vh",
            margin: "auto",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <div style={{ color: "#fff", textAlign: "center", margin: "auto", marginBottom: "15px", marginTop: "0px" }}>Loading...</div>
          <div className="loadingbar" style={{ width: divPercent + "%" }}>

            <span></span>
          </div>
          <div style={{ display: "flex", margin: "auto", marginBottom: "0px", marginTop: "15px" }}>
            <div style={{ color: "#fff" }} ref={percentRef}></div>
            <div style={{ color: "#fff" }}>%</div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="site">
        <Index />
        {/* <Errors message="Page Not Found" /> */}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    siteLoader: state.siteLoader.siteLoader,
    siteLoaderCount: state.siteLoaderCount.siteLoaderCount,
  };
};

export default connect(mapStateToProps, null)(SiteLoader);
