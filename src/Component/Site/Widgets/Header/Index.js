import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCog } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  getActiveLanguageAction, getChatWithBrokerAction,
} from "../../../../Red";
import store from "../../../../Red/store";
import { saveWebsiteSettings } from "../../../../Services/Headers/headers";
import { showAlertMSG } from "../../../../Lib/helpers";
import TotalFiguresIndex from "../TotalFigures/Index";
import i18next from "i18next";

const initialFormData = Object.freeze({
  theme: "dark",
  language: "en",
  oneclicktrading: 0,
  simpletrade: 0,
  simpletradepercent: 10,
});


function HeaderIndex(props) {
  const { t } = useTranslation();

  //const [checked, setChecked] = useState(false);
  //const [radioValue, setRadioValue] = useState("1");

  const radios = [
    { name: t("On"), value: "1" },
    { name: t("Off"), value: "2" },
  ];

  const [show, setShow] = useState(false);
  const [popupHandleSave, setpopupHandleSave] = useState(null);
  const [formData, updateFormData] = React.useState(initialFormData);
  const [langOptions, setlangOptions] = useState([]);
  var myObj = {
    theme: "dark",
    language: "en",
    oneclicktrading: 0,
    simpletrade: 0,
    simpletradepercent: 10,
  };
  const handleChange = (e) => {
    // console.log(e, "tttt");
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    });
    let values = e.target.value;
    let names = e.target.name;
    console.log(values, names);
    console.log(myObj);
    myObj[e.target.name] = e.target.value;
  };



  const handleClose = async (e) => {
    if (typeof e !== "undefined") {
      e.preventDefault();
      if (e.target.id == "send") {
        if (popupHandleSave == "settings") {
          // aq xdeba dedis mtyvneli simple trade
          /*
          store.dispatch(getSimpleTrade(formData.simpletrade));
          if (!isNaN(parseInt(formData.simpletradepercent))) {
            store.dispatch(
              getSimpleTradePercent(parseInt(formData.simpletradepercent))
            );
          }
*/
          // aq damtavrda dedis mtyvneli simpletrade

          if (
            store.getState().customerAuth.customerAuth.user.user === undefined
          ) {
            showAlertMSG("Need to authorize to save data", 3);
            return false;
          }
          let user = store.getState().customerAuth.customerAuth.user.user;
          let id = user.ID;
          // console.log('user = ', user);
          if (user.email !== undefined) {
            id = user.email;
          }
          console.log("formData = ", formData);
          console.log("new test", myObj);
          let res = await saveWebsiteSettings(
            id,
            formData.oneclicktrading,
            formData.theme,
            formData.language,
            formData.simpletrade,
            formData.simpletradepercent
          );
          if (res.status == 1) {
            setShow(false);
          }
        }
      } else {
        setShow(false);
      }
    } else {
      setShow(false);
    }
  };

  const handleShow = (e) => {
    setShow(true);
    e.preventDefault();
    console.log(e.target.id);
    if (e.target.id == "settings") {
      //   console.log("sadasd");
      // setpopupRender(settingPopup());
      setpopupHandleSave("settings");
    }
  };

  useEffect(() => {
    // console.log('Languages = ', props);
    if (props.languages && props.languages.length > 0) {
      var arr = [];
      for (var i = 0; i < props.languages.length; i++) {
        if (
          props.activeLanguage === null ||
          props.activeLanguage === undefined ||
          props.activeLanguage === ""
        ) {
          if (props.languages[i].isdefault == 1) {
            store.dispatch(getActiveLanguageAction(props.languages[i].alias));
          }
        }
        arr.push(
          <option key={"langOpt" + i} value={props.languages[i].alias}>
            {props.languages[i].title}
          </option>
        );
      }
      setlangOptions(arr);
    }
  }, [props.languages]);

  useEffect(() => {
    if (
      props.activeLanguage !== null &&
      props.oneClickTrading !== null &&
      props.siteTheme !== null &&
      props.simpleTrade !== null &&
      props.simpleTradePercent !== null
    ) {
      console.log('props.simpleTrade = ',props.simpleTrade);
      console.log('props.simpleTradePercent = ',props.simpleTradePercent);
      updateFormData(
        {
          theme: props.siteTheme,
          language: props.activeLanguage,
          oneclicktrading: props.oneClickTrading,
          simpletrade: props.simpleTrade,
          simpletradepercent: props.simpleTradePercent,
        }
      );
      myObj = {
        theme: props.siteTheme,
        language: props.activeLanguage,
        oneclicktrading: props.oneClickTrading,
        simpletrade: props.simpleTrade,
        simpletradepercent: props.simpleTradePercent,
      }
    }
  }, [
    props.activeLanguage,
    props.oneClickTrading,
    props.siteTheme,
    props.simpleTrade,
    props.simpleTradePercent,
  ]);

  if (props.headerData == null) {
    return (
      <div className="leftSideLoader navLoader">
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>Loading...
        </div>
      </div>
    );
  } else {
    return (
      <div className="headerWidghet">
        <div>
          {props.headerData.show_logo ? (
            <div className="headerWidghetLogo">
              <img
                src={
                  "images/" +
                  (props.siteTheme == "light"
                    ? props.headerData.light_image
                    : props.headerData.dark_image)
                }
                alt="logo"
                className="logo"
              />
            </div>
          ) : (
            ""
          )}
          {props.headerData.show_logo_text ? (
            <div className="headerWidghetText">
              {t(props.headerData.logo_text)}
            </div>
          ) : (
            ""
          )}
        </div>
        {props.headerData.show_account_name ? (
          <div className="headerWidghetAccount">
            {props.customerAuth.user.user.username}
          </div>
        ) : (
          ""
        )}
        <div className="headerWidgetTotalFigure">
          <TotalFiguresIndex />
        </div>
        <div className="headerWidgetButtons">
        
          <button className="btn btn-danger mr-md-3 mr-1" onClick={() => {
                    console.log(
                      store.getState().settings.settings.website_url +
                        "/auth/" +
                        props.customerAuth.user.user.token +
                        "/" +
                        props.customerAuth.user.user.ID +
                        "/" +
                        props.customerAuth.user.user.isLead +
                        "/" +
                        (i18next.language !== null && i18next.language != ""
                          ? i18next.language
                          : "en")
                    );

                    window.location.assign(
                      store.getState().settings.settings.website_url +
                        "/auth/" +
                        props.customerAuth.user.user.token +
                        "/" +
                        props.customerAuth.user.user.ID +
                        "/" +
                        props.customerAuth.user.user.isLead +
                        "/" +
                        (i18next.language !== null && i18next.language != ""
                          ? i18next.language
                          : "en") +
                        "/deposit"
                    );
                  }}>Deposit</button>
                  <button className="btn btn-primary" onClick={() => {
                    console.log(
                      store.getState().settings.settings.website_url +
                        "/auth/" +
                        props.customerAuth.user.user.token +
                        "/" +
                        props.customerAuth.user.user.ID +
                        "/" +
                        props.customerAuth.user.user.isLead +
                        "/" +
                        (i18next.language !== null && i18next.language != ""
                          ? i18next.language
                          : "en")
                    );

                    window.location.assign(
                      store.getState().settings.settings.website_url +
                        "/auth/" +
                        props.customerAuth.user.user.token +
                        "/" +
                        props.customerAuth.user.user.ID +
                        "/" +
                        props.customerAuth.user.user.isLead +
                        "/" +
                        (i18next.language !== null && i18next.language != ""
                          ? i18next.language
                          : "en") +
                          "/withdrawal"
                    );
                  }}>Withdrawal</button>
        </div>
        <div className="headerWidghetSettings">
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
              <FontAwesomeIcon icon={faUserCog} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                id="settings"
                href="#/action-1"
                onClick={handleShow}
              >
                {t("Account Settings")}
              </Dropdown.Item>
              <Dropdown.Item id="deposit">
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    console.log(
                      store.getState().settings.settings.website_url +
                        "/auth/" +
                        props.customerAuth.user.user.token +
                        "/" +
                        props.customerAuth.user.user.ID +
                        "/" +
                        props.customerAuth.user.user.isLead +
                        "/" +
                        (i18next.language !== null && i18next.language != ""
                          ? i18next.language
                          : "en")
                    );

                    window.location.assign(
                      store.getState().settings.settings.website_url +
                        "/auth/" +
                        props.customerAuth.user.user.token +
                        "/" +
                        props.customerAuth.user.user.ID +
                        "/" +
                        props.customerAuth.user.user.isLead +
                        "/" +
                        (i18next.language !== null && i18next.language != ""
                          ? i18next.language
                          : "en")
                    );
                  }}
                >
                  {t("User Cabinet")}
                </div>
              </Dropdown.Item>

              <Dropdown.Item
                id="chatwithrboker"
                onClick={() => {
                  store.dispatch(getChatWithBrokerAction(1));
                }}
              >
                {t("Chat With Broker")}
              </Dropdown.Item>
              <Dropdown.Item id="logout">
                <div
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.assign(
                      store.getState().settings.settings.website_url
                    );
                  }}
                >
                  {t("Logout")}
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* popup */}

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{t("Account Settings")}</Modal.Title>
          </Modal.Header>
          <Form>
            <Modal.Body>
            <div className="settingpopup">
        {/* <ToggleButtonGroup type="radio" name="oneclicktrading" onChange={handleChange} defaultValue={1}>
            <ToggleButton value={1}>Off</ToggleButton>
            <ToggleButton value={2}>On</ToggleButton>
          </ToggleButtonGroup> */}
        <Form.Group controlId="oneclicktrading" className="mt-2">
          <Form.Label>{t("One Click Trading")}</Form.Label>
          <Form.Control
            as="select"
            name="oneclicktrading"
            defaultValue={props.oneClickTrading}
            onChange={handleChange}
          >
            <option value="0">{t("Off")}</option>
            <option value="1">{t("On")}</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="themeselect" className="mt-2">
          <Form.Label>{t("Select Theme")}</Form.Label>
          <Form.Control
            as="select"
            name="theme"
            defaultValue={props.siteTheme}
            onChange={handleChange}
          >
            <option value="dark">{t("Dark")}</option>
            <option value="light">{t("Light")}</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="languageselect">
          <Form.Label>{t("Language")}</Form.Label>
          <Form.Control
            as="select"
            name="language"
            defaultValue={
              props.activeLanguage !== null &&
              props.activeLanguage !== undefined
                ? props.activeLanguage
                : "en"
            }
            onChange={handleChange}
          >
            {langOptions}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="simpletradeselect">
          <Form.Label>{t("Simple Trade")}</Form.Label>
          <Form.Control
            as="select"
            name="simpletrade"
            defaultValue={
              props.simpleTrade !== null && props.simpleTrade !== undefined
                ? props.simpleTrade
                : 1
            }
            onChange={handleChange}
          >
            <option value="1">{t("No")}</option>
            <option value="2">{t("Yes")}</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="simpletradepercentselect">
          <Form.Label>{t("Simple Trade Percent")}</Form.Label>
          <input
            type="number"
            name="simpletradepercent"
            className="form-control"
            defaultValue={
              props.simpleTradePercent !== null &&
              props.simpleTradePercent !== undefined
                ? props.simpleTradePercent
                : 10
            }
            onChange={handleChange}
          />
        </Form.Group>
      </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                {t("Close")}
              </Button>
              <Button variant="primary" id="send" onClick={handleClose}>
                {t("Save Changes")}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    headerData: state.headerData.headerData,
    siteTheme: state.siteTheme.siteTheme,
    oneClickTrading: state.oneClickTrading.oneClickTrading,
    languages: state.languages.languages,
    activeLanguage: state.activeLanguage.activeLanguage,
    customerAuth: state.customerAuth.customerAuth,
    simpleTrade: state.simpleTrade.simpleTrade,
    simpleTradePercent: state.simpleTradePercent.simpleTradePercent,
  };
};

export default connect(mapStateToProps, null)(HeaderIndex);
