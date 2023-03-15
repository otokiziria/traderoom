import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { faEllipsisV, faSlidersH, faSearchDollar } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../App.css";
import store from "../../../../../Red/store";
import {
  getSymbolFilterAction,
  getLeftSideDataAction,
} from "../../../../../Red";
import {
  getActiveFilterSymbols,
  getActiveFilterFavoriteSymbols,
  getActiveSearchSymbols,
  getLeftSide,
} from "../../../../../Services/Symbols/symbols";

function HeaderIndex(props) {
  const { t } = useTranslation();
  const [themePre, setthemePre] = useState("");
  const setSymbolFilter = (type, id = 0) => {
    if (type == 2) {
      store.dispatch(getLeftSideDataAction([]));
      getActiveFilterSymbols(id);
    } else if (type == 1) {
      store.dispatch(getLeftSideDataAction([]));
      getActiveFilterFavoriteSymbols();
    } else {
      store.dispatch(getLeftSideDataAction([]));
      getLeftSide();
    }
    store.dispatch(getSymbolFilterAction({ type: type, id: id }));
  };

  useEffect(() => {
    if(props.siteTheme !== null && props.siteTheme == "light"){
      setthemePre("W-");
    }else{
      setthemePre("");
    }
  }, [props.siteTheme]);

  const searchSymbol = (e) => {
    let type = 0;
    let id = 0;
    if (store.getState().symbolFilter.symbolFilter.type !== undefined) {
      type = store.getState().symbolFilter.symbolFilter.type;
      id = store.getState().symbolFilter.symbolFilter.id;
    }
    //es imitom rom yvelgan edzebdes da ara kategoriebsi da faoritebshi
    type = 2; 
    id = 0;
    // aq mtavrdeba
    if (e.target.value.length > 1) {
      if (type != 1) {
        store.dispatch(getLeftSideDataAction([]));
      }

      getActiveSearchSymbols(e.target.value, type, id);
      store.dispatch(getSymbolFilterAction({ type: 3, id: id }));
    } else {
      if (type == 2) {
        store.dispatch(getLeftSideDataAction([]));
        getActiveFilterSymbols(id);
      } else if (type == 1) {
        store.dispatch(getLeftSideDataAction([]));
        getActiveFilterFavoriteSymbols();
      } else {
        store.dispatch(getLeftSideDataAction([]));
        getLeftSide();
      }
      store.dispatch(getSymbolFilterAction({ type: 0, id: id }));

    }
  };
  useEffect(() => {
    // pirveli favoritebi unda gamochndeso da aha yleoba
    setSymbolFilter(1);
  }, [])
  if (props.activeCategories == null) {
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
      <div className="leftsiteWidgetheader">
        <div className="leftsiteWidgetheaderIn">
          <div className="leftsiteWidgetheaderFilter">
            <FontAwesomeIcon
              icon={faStar}
              onClick={() => {
                setSymbolFilter(1);
              }}
              size="3x"
              alt="Favorites"
            />
          </div>
          {props.activeCategories.map((el, k) =>
            el.image !== null ? (
              <div className="leftsiteWidgetheaderFilter" key={k}>
                <img
                  src={"images/" + themePre + el.image}
                  onClick={() => {
                    setSymbolFilter(2, el.id);
                  }}
                  alt={el.title}
                />
              </div>
            ) : (
                ""
              )
          )}
          <div className="leftsiteWidgetheaderFilter">
            <FontAwesomeIcon
              icon={faSlidersH}
              onClick={() => {
                setSymbolFilter(0);
              }}
              size="3x"
              alt="Favorites"
            />
          </div>
        </div>
        <div className="leftsiteWidgetsearch leftsiteWidgetsearchLastOne">
          <input
            type="text"
            className="form-control"
            placeholder={t("Search e.g. EURUSD")}
            onKeyUp={(e) => {
              searchSymbol(e);
            }}
          />
          <FontAwesomeIcon
            icon={faSearchDollar}
          />
        </div>
        <div className="leftsideWidgetthead d-flex justify-content-around pt-1 pb-2 pl-4">
          {props.leftSideSettings.show_title == 1 && props.leftSideSettings.title == 0 ? (
            <div className="col-md-3 text-center f-13">{t("Symbol")}</div>
          ) : props.leftSideSettings.show_title == 1 &&
            props.leftSideSettings.title == 1 ? (
                <div className="col-md-3 text-center f-13">{t("Short_Name")}</div>
              ) : props.leftSideSettings.show_title == 1 &&
                props.leftSideSettings.title == 2 ? (
                  <div className="col-md-3 text-center f-13">{t("Description")}</div>
                ) : (
                  " "
                )}


          {props.leftSideSettings.show_change == 1 ? (
            <div className="col-md-2 text-center f-13">{t("Change")}</div>
          ) : (
              " "
            )}



          <div className="col-md-2 text-center f-13">
            {props.leftSideSettings.show_price == 1
              ? t("Bid") : ""}
          </div>
          <div className="col-md-2 text-center f-13">
            {props.leftSideSettings.show_price == 1
              ? t("Ask") : ""}
          </div>

          {props.leftSideSettings.show_chart == 1 ? (
            <div className="col-md-3 f-13">{t("Chart")}</div>
          ) : (
            " "
            )}

          
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeCategories: state.activeCategories.activeCategories,
    leftSideSettings: state.leftSideSettings.leftSideSettings,
    siteTheme: state.siteTheme.siteTheme,
  };
};

export default connect(mapStateToProps, null)(HeaderIndex);
