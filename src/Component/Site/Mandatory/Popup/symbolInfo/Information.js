import React, { useEffect, useState } from "react";
import { calculateLeverage, getMin, getMax } from "../../../Helpers/Formulas";
import { useTranslation } from "react-i18next";
function Information(props) {
  const { t } = useTranslation();
  const [minorCategory, setminorCategory] = useState("");
  const [majorCategory, setmajorCategory] = useState("");
  const [htmlSessionData, sethtmlSessionData] = useState([]);
  const sessionDays = {
    0: t("Sunday"),
    1: t("Monday"),
    2: t("Thuseday"),
    3: t("Wednesday"),
    4: t("Thursday"),
    5: t("Friday"),
    6: t("Saturday"),
  };
  useEffect(() => {
    if (props.data !== null && props.categories !== null) {
      let per_id = 0;
      let firstCat = '';
      if (
        props.categories[props.data.category] !== null &&
        props.categories[props.data.category] !== undefined
      ) {
        per_id = props.categories[props.data.category].parent_id;
        firstCat = props.categories[props.data.category].title;
      }

      if (
        per_id !== 0 &&
        props.categories[per_id] !== null &&
        props.categories[per_id] !== undefined
      ) {
        setminorCategory(props.categories[props.data.category].title);
        setmajorCategory(props.categories[per_id].title);
      }
      else{
        setminorCategory('-');
        setmajorCategory(props.categories[props.data.category].title);
      }

      let sess = props.data.session_data;
      let splSess = sess.split(" || ");
      let htmlArr = [];
      let it = 0;
      splSess.forEach((row) => {
        let spltRow = row.split(" = ");
        if (
          spltRow[0] !== undefined &&
          sessionDays[spltRow[0].trim()] !== undefined &&
          spltRow[1] !== undefined
        ) {
          htmlArr.push(
            <div className="col-md-12 text-center row" key={it}>
              <div className="col-md-6 text-left mt-2">
                <span className="symbol-assets-info-title">
                  <b>{sessionDays[spltRow[0].trim()]}</b>
                </span>
              </div>
              <div className="col-md-6 text-left mt-2">
                <span className="symbol-assets-info-title">{(spltRow[1].trim() == '00:00 - 00:00') ? '-' : spltRow[1]}</span>
              </div>
            </div>
          );
          it++;
          sethtmlSessionData(htmlArr)
        }
      });
    }
  }, [props.data, props.categories]);
  if (props.data !== null && props.categories) {
    return (
      <div className="d-flex flex-wrap pt-5">
        <div className="col-md-7 d-flex flex-wrap">
          <div className="col-md-6">
            <div className="symbol-assets-info-title text-center">
              <b>{t('Asset Class')}</b>
            </div>
            <div className="symbol-assets-info-val text-center mt-2 mb-3">
              {majorCategory}
            </div>
          </div>
          <div className="col-md-6">
            <div className="symbol-assets-info-title text-center">
              <b>{t('Asset Sub-Class')}</b>
            </div>
            <div className="symbol-assets-info-val text-center mt-2 mb-3">
              {minorCategory}
            </div>
          </div>

          <div className="col-md-6">
            <div className="symbol-assets-info-title text-center">
              <b>{t('Contract Size')}</b>
            </div>
            <div className="symbol-assets-info-val text-center mt-2 mb-3">
              {props.data.contractSize}
            </div>
          </div>
          <div className="col-md-6">
            <div className="symbol-assets-info-title text-center f-13">
              <b>{t('Leverage')} / {t('Margin')}</b>
            </div>
            <div className="symbol-assets-info-val text-center mt-2 mb-3">
              {calculateLeverage(props.data.margin_value)}
            </div>
          </div>

          <div className="col-md-6">
            <div className="symbol-assets-info-title text-center">
              <b>{t('Min Position')}</b>
            </div>
            <div className="symbol-assets-info-val text-center mt-2 mb-3">
              {getMin(props.data.volumeMin)}
            </div>
          </div>
          <div className="col-md-6">
            <div className="symbol-assets-info-title text-center">
              <b>{t('Max Position')}</b>
            </div>
            <div className="symbol-assets-info-val text-center mt-2 mb-3">
              {getMax(props.data.volumeMax)}
            </div>
          </div>

          <div className="col-md-6">
            <div className="symbol-assets-info-title text-center">
              <b>{t('Commission')}</b>
            </div>
            <div className="symbol-assets-info-val text-center mt-2 mb-3">
              0.0
            </div>
          </div>
          <div className="col-md-6">
            <div className="symbol-assets-info-title text-center">
              <b>{t('Min Commission')}</b>
            </div>
            <div className="symbol-assets-info-val text-center mt-2 mb-3">
              0.0
            </div>
          </div>

          <div className="col-md-6 text-center">
            <span className="symbol-assets-info-title text-center">
              <b>{t('Buy')}</b>{" "}
            </span>
            <span className="symbol-assets-info-val text-center mt-2 mb-3">
              {props.data.swapLong}
            </span>
          </div>
          <div className="col-md-6 text-center">
            <span className="symbol-assets-info-title text-center">
              <b>{t('Sell')}</b>{" "}
            </span>
            <span className="symbol-assets-info-val text-center mt-2 mb-3">
              {props.data.swapShort}
            </span>
          </div>
          <div className="col-md-12 text-center mt-2">
            <span className="symbol-assets-info-title">
              <b>{t('Commission type')}</b>{" "}
            </span>
            <span>{t('Points')}</span>
          </div>
        </div>
        <div className="col-md-5 d-flex flex-wrap">
          <div className="col-md-12 text-center mb-3">
            <span className="symbol-assets-info-title">
              <b>{t('Trading Hours')}</b>
            </span>
          </div>
            {htmlSessionData}
        </div>
      </div>
    );
  } else {
    return <>{t('No Data Found')}</>;
  }
}

export default Information;
