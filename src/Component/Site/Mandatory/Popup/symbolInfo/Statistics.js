import React, { useEffect, useState } from "react";
import { percentOf, sybstractionOf } from "../../../Helpers/Formulas";
import { useTranslation } from "react-i18next";
function Statistics(props) {
  const { t } = useTranslation();
  if (props.data !== null) {
      console.log('asdasd = ',props.data);
    return (
      <div className="d-flex flex-wrap pt-5">
        <div className="col-md-12">
          <div className="d-flex align-items-center assets-static-item mb-2">
            <div>
              <b>{t("Day")}</b>
            </div>
            <div>
              <span>
                <b>{t("Open")}</b>
              </span>
              <br />
              <span>
                {props.data.day_hloc !== null &&
                props.data.day_hloc !== undefined
                  ? JSON.parse(props.data.day_hloc).open !== null &&
                    JSON.parse(props.data.day_hloc).open !== undefined
                    ? JSON.parse(props.data.day_hloc).open
                    : ""
                  : ""}
              </span>
            </div>
            <div>
              {props.data.day_hloc !== null && props.data.day_hloc !== undefined
                ? JSON.parse(props.data.day_hloc).low !== null &&
                    JSON.parse(props.data.day_hloc).low !== undefined
                  ? JSON.parse(props.data.day_hloc).low
                  : ""
                : ""}
            </div>
            <div className="assets-static-item-item-prbar">
              <div
                style={{
                  width:
                    percentOf(
                      props.data.day_hloc !== null &&
                        props.data.day_hloc !== undefined
                        ? JSON.parse(props.data.day_hloc).low !== null &&
                            JSON.parse(props.data.day_hloc).low !== undefined
                          ? JSON.parse(props.data.day_hloc).low
                          : 0
                        : 0,
                      props.data.day_hloc !== null &&
                        props.data.day_hloc !== undefined
                        ? JSON.parse(props.data.day_hloc).high !== null &&
                            JSON.parse(props.data.day_hloc).high !== undefined
                          ? JSON.parse(props.data.day_hloc).high
                          : 0
                        : 0
                    , props.data.digit) + "%",
                }}
              ></div>
            </div>
            <div>
              {props.data.day_hloc !== null && props.data.day_hloc !== undefined
                ? JSON.parse(props.data.day_hloc).high !== null &&
                    JSON.parse(props.data.day_hloc).high !== undefined
                  ? JSON.parse(props.data.day_hloc).high
                  : ""
                : ""}
            </div>
            <div>
              <span>
                <b>{t("Close")}</b>
              </span>
              <br />
              <span>
                {props.data.day_hloc !== null &&
                props.data.day_hloc !== undefined
                  ? JSON.parse(props.data.day_hloc).close !== null &&
                    JSON.parse(props.data.day_hloc).close !== undefined
                    ? JSON.parse(props.data.day_hloc).close
                    : ""
                  : ""}
              </span>
            </div>
            <div>
              <b>{t("Chg")}.</b>{" "}
              {sybstractionOf(
                props.data.day_hloc !== null &&
                  props.data.day_hloc !== undefined
                  ? JSON.parse(props.data.day_hloc).high !== null &&
                    JSON.parse(props.data.day_hloc).high !== undefined
                    ? JSON.parse(props.data.day_hloc).high
                    : 0
                  : 0,
                props.data.day_hloc !== null &&
                  props.data.day_hloc !== undefined
                  ? JSON.parse(props.data.day_hloc).low !== null &&
                    JSON.parse(props.data.day_hloc).low !== undefined
                    ? JSON.parse(props.data.day_hloc).low
                    : 0
                  : 0
              )}
            </div>
            <div>
              <b>{t("Chg")} %</b>{" "}
              {percentOf(
                props.data.day_hloc !== null &&
                  props.data.day_hloc !== undefined
                  ? JSON.parse(props.data.day_hloc).low !== null &&
                    JSON.parse(props.data.day_hloc).low !== undefined
                    ? JSON.parse(props.data.day_hloc).low
                    : 0
                  : 0,
                props.data.day_hloc !== null &&
                  props.data.day_hloc !== undefined
                  ? JSON.parse(props.data.day_hloc).high !== null &&
                  JSON.parse(props.data.day_hloc).high !== undefined
                    ? JSON.parse(props.data.day_hloc).high
                    : 0
                  : 0
              )}
              %
            </div>
          </div>

          <div className="d-flex align-items-center assets-static-item mb-2">
            <div>
              <b>{t("Week")}</b>
            </div>
            <div>
              <span>
                <b>{t("Open")}</b>
              </span>
              <br />
              <span>
                {props.data.week_hloc !== null &&
                props.data.week_hloc !== undefined
                  ? JSON.parse(props.data.week_hloc).open !== null &&
                  JSON.parse(props.data.week_hloc).open !== undefined
                    ? JSON.parse(props.data.week_hloc).open
                    : ""
                  : ""}
              </span>
            </div>
            <div>
              {props.data.week_hloc !== null && props.data.week_hloc !== undefined
                ? JSON.parse(props.data.week_hloc).low !== null &&
                JSON.parse(props.data.week_hloc).low !== undefined
                  ? JSON.parse(props.data.week_hloc).low
                  : ""
                : ""}
            </div>
            <div className="assets-static-item-item-prbar">
              <div
                style={{
                  width:
                    percentOf(
                      props.data.week_hloc !== null &&
                        props.data.week_hloc !== undefined
                        ? JSON.parse(props.data.week_hloc).low !== null &&
                        JSON.parse(props.data.week_hloc).low !== undefined
                          ? JSON.parse(props.data.week_hloc).low
                          : 0
                        : 0,
                      props.data.week_hloc !== null &&
                        props.data.week_hloc !== undefined
                        ? JSON.parse(props.data.week_hloc).high !== null &&
                        JSON.parse(props.data.week_hloc).high !== undefined
                          ? JSON.parse(props.data.week_hloc).high
                          : 0
                        : 0
                    , props.data.digit) + "%",
                }}
              ></div>
            </div>
            <div>
              {props.data.week_hloc !== null && props.data.week_hloc !== undefined
                ? JSON.parse(props.data.week_hloc).high !== null &&
                JSON.parse(props.data.week_hloc).high !== undefined
                  ? JSON.parse(props.data.week_hloc).high
                  : ""
                : ""}
            </div>
            <div>
              <span>
                <b>{t("Close")}</b>
              </span>
              <br />
              <span>
                {props.data.week_hloc !== null &&
                props.data.week_hloc !== undefined
                  ? JSON.parse(props.data.week_hloc).close !== null &&
                  JSON.parse(props.data.week_hloc).close !== undefined
                    ? JSON.parse(props.data.week_hloc).close
                    : ""
                  : ""}
              </span>
            </div>
            <div>
              <b>{t("Chg")}.</b>{" "}
              {sybstractionOf(
                props.data.week_hloc !== null &&
                  props.data.week_hloc !== undefined
                  ? JSON.parse(props.data.week_hloc).high !== null &&
                  JSON.parse(props.data.week_hloc).high !== undefined
                    ? JSON.parse(props.data.week_hloc).high
                    : 0
                  : 0,
                props.data.week_hloc !== null &&
                  props.data.week_hloc !== undefined
                  ? JSON.parse(props.data.week_hloc).low !== null &&
                  JSON.parse(props.data.week_hloc).low !== undefined
                    ? JSON.parse(props.data.week_hloc).low
                    : 0
                  : 0
              )}
            </div>
            <div>
              <b>{t("Chg")} %</b>{" "}
              {percentOf(
                props.data.week_hloc !== null &&
                  props.data.week_hloc !== undefined
                  ? JSON.parse(props.data.week_hloc).low !== null &&
                  JSON.parse(props.data.week_hloc).low !== undefined
                    ? JSON.parse(props.data.week_hloc).low
                    : 0
                  : 0,
                props.data.week_hloc !== null &&
                  props.data.week_hloc !== undefined
                  ? JSON.parse(props.data.week_hloc).high !== null &&
                  JSON.parse(props.data.week_hloc).high !== undefined
                    ? JSON.parse(props.data.week_hloc).high
                    : 0
                  : 0
              )}
              %
            </div>
          </div>

          <div className="d-flex align-items-center assets-static-item mb-2">
            <div>
              <b>{t("Month")}</b>
            </div>
            <div>
              <span>
                <b>{t("Open")}</b>
              </span>
              <br />
              <span>
                {props.data.month_hloc !== null &&
                props.data.month_hloc !== undefined
                  ? JSON.parse(props.data.month_hloc).open !== null &&
                  JSON.parse(props.data.month_hloc).open !== undefined
                    ? JSON.parse(props.data.month_hloc).open
                    : ""
                  : ""}
              </span>
            </div>
            <div>
              {props.data.month_hloc !== null && props.data.month_hloc !== undefined
                ? JSON.parse(props.data.month_hloc).low !== null &&
                JSON.parse(props.data.month_hloc).low !== undefined
                  ? JSON.parse(props.data.month_hloc).low
                  : ""
                : ""}
            </div>
            <div className="assets-static-item-item-prbar">
              <div
                style={{
                  width:
                    percentOf(
                      props.data.month_hloc !== null &&
                        props.data.month_hloc !== undefined
                        ? JSON.parse(props.data.month_hloc).low !== null &&
                        JSON.parse(props.data.month_hloc).low !== undefined
                          ? JSON.parse(props.data.month_hloc).low
                          : 0
                        : 0,
                      props.data.month_hloc !== null &&
                        props.data.month_hloc !== undefined
                        ? JSON.parse(props.data.month_hloc).high !== null &&
                        JSON.parse(props.data.month_hloc).high !== undefined
                          ? JSON.parse(props.data.month_hloc).high
                          : 0
                        : 0
                    , props.data.digit) + "%",
                }}
              ></div>
            </div>
            <div>
              {props.data.month_hloc !== null && props.data.month_hloc !== undefined
                ? JSON.parse(props.data.month_hloc).high !== null &&
                JSON.parse(props.data.month_hloc).high !== undefined
                  ? JSON.parse(props.data.month_hloc).high
                  : ""
                : ""}
            </div>
            <div>
              <span>
                <b>{t("Close")}</b>
              </span>
              <br />
              <span>
                {props.data.month_hloc !== null &&
                props.data.month_hloc !== undefined
                  ? JSON.parse(props.data.month_hloc).close !== null &&
                  JSON.parse(props.data.month_hloc).close !== undefined
                    ? JSON.parse(props.data.month_hloc).close
                    : ""
                  : ""}
              </span>
            </div>
            <div>
              <b>{t("Chg")}.</b>{" "}
              {sybstractionOf(
                props.data.day_hloc !== null &&
                  props.data.day_hloc !== undefined
                  ? JSON.parse(props.data.day_hloc).high !== null &&
                  JSON.parse(props.data.day_hloc).high !== undefined
                    ? JSON.parse(props.data.day_hloc).high
                    : 0
                  : 0,
                props.data.day_hloc !== null &&
                  props.data.day_hloc !== undefined
                  ? JSON.parse(props.data.day_hloc).low !== null &&
                  JSON.parse(props.data.day_hloc).low !== undefined
                    ? JSON.parse(props.data.day_hloc).low
                    : 0
                  : 0
              )}
            </div>
            <div>
              <b>{t("Chg")} %</b>{" "}
              {percentOf(
                props.data.month_hloc !== null &&
                  props.data.month_hloc !== undefined
                  ? JSON.parse(props.data.month_hloc).low !== null &&
                  JSON.parse(props.data.month_hloc).low !== undefined
                    ? JSON.parse(props.data.month_hloc).low
                    : 0
                  : 0,
                props.data.month_hloc !== null &&
                  props.data.month_hloc !== undefined
                  ? JSON.parse(props.data.month_hloc).high !== null &&
                  JSON.parse(props.data.month_hloc).high !== undefined
                    ? JSON.parse(props.data.month_hloc).high
                    : 0
                  : 0
              )}
              %
            </div>
          </div>

          <div className="d-flex align-items-center assets-static-item mb-2">
            <div>
              <b>{t("Qtr")}</b>
            </div>
            <div>
              <span>
                <b>{t("Open")}</b>
              </span>
              <br />
              <span>
                {props.data.qtr_hloc !== null &&
                props.data.qtr_hloc !== undefined
                  ? JSON.parse(props.data.qtr_hloc).open !== null &&
                  JSON.parse(props.data.qtr_hloc).open !== undefined
                    ? JSON.parse(props.data.qtr_hloc).open
                    : ""
                  : ""}
              </span>
            </div>
            <div>
              {props.data.qtr_hloc !== null && props.data.qtr_hloc !== undefined
                ? JSON.parse(props.data.qtr_hloc).low !== null &&
                JSON.parse(props.data.qtr_hloc).low !== undefined
                  ? JSON.parse(props.data.qtr_hloc).low
                  : ""
                : ""}
            </div>
            <div className="assets-static-item-item-prbar">
              <div
                style={{
                  width:
                    percentOf(
                      props.data.qtr_hloc !== null &&
                        props.data.qtr_hloc !== undefined
                        ? JSON.parse(props.data.qtr_hloc).low !== null &&
                        JSON.parse(props.data.qtr_hloc).low !== undefined
                          ? JSON.parse(props.data.qtr_hloc).low
                          : 0
                        : 0,
                      props.data.qtr_hloc !== null &&
                        props.data.qtr_hloc !== undefined
                        ? JSON.parse(props.data.qtr_hloc).high !== null &&
                        JSON.parse(props.data.qtr_hloc).high !== undefined
                          ? JSON.parse(props.data.qtr_hloc).high
                          : 0
                        : 0
                    , props.data.digit) + "%",
                }}
              ></div>
            </div>
            <div>
              {props.data.qtr_hloc !== null && props.data.qtr_hloc !== undefined
                ? JSON.parse(props.data.qtr_hloc).high !== null &&
                JSON.parse(props.data.qtr_hloc).high !== undefined
                  ? JSON.parse(props.data.qtr_hloc).high
                  : ""
                : ""}
            </div>
            <div>
              <span>
                <b>{t("Close")}</b>
              </span>
              <br />
              <span>
                {props.data.qtr_hloc !== null &&
                props.data.qtr_hloc !== undefined
                  ? JSON.parse(props.data.qtr_hloc).close !== null &&
                  JSON.parse(props.data.qtr_hloc).close !== undefined
                    ? JSON.parse(props.data.qtr_hloc).close
                    : ""
                  : ""}
              </span>
            </div>
            <div>
              <b>{t("Chg")}.</b>{" "}
              {sybstractionOf(
                props.data.qtr_hloc !== null &&
                  props.data.qtr_hloc !== undefined
                  ? JSON.parse(props.data.qtr_hloc).high !== null &&
                  JSON.parse(props.data.qtr_hloc).high !== undefined
                    ? JSON.parse(props.data.qtr_hloc).high
                    : 0
                  : 0,
                props.data.qtr_hloc !== null &&
                  props.data.qtr_hloc !== undefined
                  ? JSON.parse(props.data.qtr_hloc).low !== null &&
                  JSON.parse(props.data.qtr_hloc).low !== undefined
                    ? JSON.parse(props.data.qtr_hloc).low
                    : 0
                  : 0
              )}
            </div>
            <div>
              <b>{t("Chg")} %</b>{" "}
              {percentOf(
                props.data.qtr_hloc !== null &&
                  props.data.qtr_hloc !== undefined
                  ? JSON.parse(props.data.qtr_hloc).low !== null &&
                  JSON.parse(props.data.qtr_hloc).low !== undefined
                    ? JSON.parse(props.data.qtr_hloc).low
                    : 0
                  : 0,
                props.data.qtr_hloc !== null &&
                  props.data.qtr_hloc !== undefined
                  ? JSON.parse(props.data.qtr_hloc).high !== null &&
                  JSON.parse(props.data.qtr_hloc).high !== undefined
                    ? JSON.parse(props.data.qtr_hloc).high
                    : 0
                  : 0
              )}
              %
            </div>
          </div>

          <div className="d-flex align-items-center assets-static-item mb-2">
            <div>
              <b>{t("Year")}</b>
            </div>
            <div>
              <span>
                <b>{t("Open")}</b>
              </span>
              <br />
              <span>
                {props.data.year_hloc !== null &&
                props.data.year_hloc !== undefined
                  ? JSON.parse(props.data.year_hloc).open !== null &&
                  JSON.parse(props.data.year_hloc).open !== undefined
                    ? JSON.parse(props.data.year_hloc).open
                    : ""
                  : ""}
              </span>
            </div>
            <div>
              {props.data.year_hloc !== null && props.data.year_hloc !== undefined
                ? JSON.parse(props.data.year_hloc).low !== null &&
                JSON.parse(props.data.year_hloc).low !== undefined
                  ? JSON.parse(props.data.year_hloc).low
                  : ""
                : ""}
            </div>
            <div className="assets-static-item-item-prbar">
              <div
                style={{
                  width:
                    percentOf(
                      props.data.year_hloc !== null &&
                        props.data.year_hloc !== undefined
                        ? JSON.parse(props.data.year_hloc).low !== null &&
                        JSON.parse(props.data.year_hloc).low !== undefined
                          ? JSON.parse(props.data.year_hloc).low
                          : 0
                        : 0,
                      props.data.year_hloc !== null &&
                        props.data.year_hloc !== undefined
                        ? JSON.parse(props.data.year_hloc).high !== null &&
                        JSON.parse(props.data.year_hloc).high !== undefined
                          ? JSON.parse(props.data.year_hloc).high
                          : 0
                        : 0
                    , props.data.digit) + "%",
                }}
              ></div>
            </div>
            <div>
              {props.data.year_hloc !== null && props.data.year_hloc !== undefined
                ? JSON.parse(props.data.year_hloc).high !== null &&
                JSON.parse(props.data.year_hloc).high !== undefined
                  ? JSON.parse(props.data.year_hloc).high
                  : ""
                : ""}
            </div>
            <div>
              <span>
                <b>{t("Close")}</b>
              </span>
              <br />
              <span>
                {props.data.year_hloc !== null &&
                props.data.year_hloc !== undefined
                  ? JSON.parse(props.data.year_hloc).close !== null &&
                  JSON.parse(props.data.year_hloc).close !== undefined
                    ? JSON.parse(props.data.year_hloc).close
                    : ""
                  : ""}
              </span>
            </div>
            <div>
              <b>{t("Chg")}.</b>{" "}
              {sybstractionOf(
                props.data.year_hloc !== null &&
                  props.data.year_hloc !== undefined
                  ? JSON.parse(props.data.year_hloc).high !== null &&
                  JSON.parse(props.data.year_hloc).high !== undefined
                    ? JSON.parse(props.data.year_hloc).high
                    : 0
                  : 0,
                props.data.year_hloc !== null &&
                  props.data.year_hloc !== undefined
                  ? JSON.parse(props.data.year_hloc).low !== null &&
                  JSON.parse(props.data.year_hloc).low !== undefined
                    ? JSON.parse(props.data.year_hloc).low
                    : 0
                  : 0
              )}
            </div>
            <div>
              <b>{t("Chg")} %</b>{" "}
              {percentOf(
                props.data.year_hloc !== null &&
                  props.data.year_hloc !== undefined
                  ? JSON.parse(props.data.year_hloc).low !== null &&
                  JSON.parse(props.data.year_hloc).low !== undefined
                    ? JSON.parse(props.data.year_hloc).low
                    : 0
                  : 0,
                props.data.year_hloc !== null &&
                  props.data.year_hloc !== undefined
                  ? JSON.parse(props.data.year_hloc).high !== null &&
                  JSON.parse(props.data.year_hloc).high !== undefined
                    ? JSON.parse(props.data.year_hloc).high
                    : 0
                  : 0
              )}
              %
            </div>
          </div>

          <div className="d-flex align-items-center assets-static-item mb-2">
            <div>
              <b>{t("YTD")}</b>
            </div>
            <div>
              <span>
                <b>{t("Open")}</b>
              </span>
              <br />
              <span>
                {props.data.ytd_hloc !== null &&
                props.data.ytd_hloc !== undefined
                  ? JSON.parse(props.data.ytd_hloc).open !== null &&
                  JSON.parse(props.data.ytd_hloc).open !== undefined
                    ? JSON.parse(props.data.ytd_hloc).open
                    : ""
                  : ""}
              </span>
            </div>
            <div>
              {props.data.ytd_hloc !== null && props.data.ytd_hloc !== undefined
                ? JSON.parse(props.data.ytd_hloc).low !== null &&
                JSON.parse(props.data.ytd_hloc).low !== undefined
                  ? JSON.parse(props.data.ytd_hloc).low
                  : ""
                : ""}
            </div>
            <div className="assets-static-item-item-prbar">
              <div
                style={{
                  width:
                    percentOf(
                      props.data.ytd_hloc !== null &&
                        props.data.ytd_hloc !== undefined
                        ? JSON.parse(props.data.ytd_hloc).low !== null &&
                        JSON.parse(props.data.ytd_hloc).low !== undefined
                          ? JSON.parse(props.data.ytd_hloc).low
                          : 0
                        : 0,
                      props.data.ytd_hloc !== null &&
                        props.data.ytd_hloc !== undefined
                        ? JSON.parse(props.data.ytd_hloc).high !== null &&
                        JSON.parse(props.data.ytd_hloc).high !== undefined
                          ? JSON.parse(props.data.ytd_hloc).high
                          : 0
                        : 0
                    , props.data.digit) + "%",
                }}
              ></div>
            </div>
            <div>
              {props.data.ytd_hloc !== null && props.data.ytd_hloc !== undefined
                ? JSON.parse(props.data.ytd_hloc).high !== null &&
                JSON.parse(props.data.ytd_hloc).high !== undefined
                  ? JSON.parse(props.data.ytd_hloc).high
                  : ""
                : ""}
            </div>
            <div>
              <span>
                <b>{t("Close")}</b>
              </span>
              <br />
              <span>
                {props.data.ytd_hloc !== null &&
                props.data.ytd_hloc !== undefined
                  ? JSON.parse(props.data.ytd_hloc).close !== null &&
                  JSON.parse(props.data.ytd_hloc).close !== undefined
                    ? JSON.parse(props.data.ytd_hloc).close
                    : ""
                  : ""}
              </span>
            </div>
            <div>
              <b>{t("Chg")}.</b>{" "}
              {sybstractionOf(
                props.data.ytd_hloc !== null &&
                  props.data.ytd_hloc !== undefined
                  ? JSON.parse(props.data.ytd_hloc).high !== null &&
                  JSON.parse(props.data.ytd_hloc).high !== undefined
                    ? JSON.parse(props.data.ytd_hloc).high
                    : 0
                  : 0,
                props.data.ytd_hloc !== null &&
                  props.data.ytd_hloc !== undefined
                  ? JSON.parse(props.data.ytd_hloc).low !== null &&
                  JSON.parse(props.data.ytd_hloc).low !== undefined
                    ? JSON.parse(props.data.ytd_hloc).low
                    : 0
                  : 0
              )}
            </div>
            <div>
              <b>{t("Chg")} %</b>{" "}
              {percentOf(
                props.data.ytd_hloc !== null &&
                  props.data.ytd_hloc !== undefined
                  ? JSON.parse(props.data.ytd_hloc).low !== null &&
                  JSON.parse(props.data.ytd_hloc).low !== undefined
                    ? JSON.parse(props.data.ytd_hloc).low
                    : 0
                  : 0,
                props.data.ytd_hloc !== null &&
                  props.data.ytd_hloc !== undefined
                  ? JSON.parse(props.data.ytd_hloc).high !== null &&
                  JSON.parse(props.data.ytd_hloc).high !== undefined
                    ? JSON.parse(props.data.ytd_hloc).high
                    : 0
                  : 0
              )}
              %
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <>{t("No Data Found")}</>;
  }
}
export default Statistics;
