import axios from "axios";
import { showErrors, showAlertMSG } from "../../Lib/helpers";
import {
  getRefreshPageAction,
  getsiteThemeAction,
  getoneClickTradingAction,
  getActiveLanguageAction,
  getSimpleTrade,
  getSimpleTradePercent,
} from "../../Red";
import store from "../../Red/store";
import i18n from "../../Languages/i18n";

export const getHeaders = async () => {
  try {
    const res = await axios.get("/api/headers");
    let data = res.data;
    return data;
  } catch (err) {
    showErrors(err);
    return null;
  }
};

export const getHeader = async (id) => {
  try {
    const res = await axios.get("/api/headers/show/" + id);
    let data = res.data;
    return data;
  } catch (err) {
    showErrors(err);
    return null;
  }
};

export const uploadImages = async (data) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };

  const formData = new FormData();
  formData.append("myImage", data);
  try {
    const res = await axios.post("/api/uploadfile", formData, config);
    console.log(res.data);
    //return false;
    if (res.data.status == 1) {
      return res.data;
    } else {
      showAlertMSG("Image not uploaded", 3);
      return res.data;
    }
  } catch (err) {
    showErrors(err);
    return false;
  }
};

export const saveHeaders = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(data);
  try {
    const res = await axios.post("/api/headers", body, config);
    if (res.data.status == 1) {
      showAlertMSG("Header inserted successfully", 1);
      store.dispatch(getRefreshPageAction(true));
    } else {
      showAlertMSG("Header not inserted", 3);
    }
  } catch (err) {
    showErrors(err);
  }
};

export const deleteHeader = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ id: id });
  try {
    const res = await axios.post("/api/headers/delete", body, config);
    if (res.data.status == 1) {
      showAlertMSG("Header deleted successfully", 1);
      store.dispatch(getRefreshPageAction(true));
    } else {
      showAlertMSG("Header not deleted", 3);
    }
  } catch (err) {
    showErrors(err);
  }
};

export const saveWebsiteSettings = async (
  id,
  oneclicktrading,
  theme,
  language,
  simpleTrade,
  simpleTradePercent
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    email: id,
    oneclicktrading: oneclicktrading,
    theme: theme,
    language: language,
    simpleTrade: simpleTrade,
    simpleTradePercent: simpleTradePercent,
  });
  try {
    const res = await axios.post("/crm/settings", body, config);
    if (res.data.status == 1) {
      // console.log(theme, oneclicktrading, language);
      store.dispatch(getsiteThemeAction(theme));
      store.dispatch(getoneClickTradingAction(oneclicktrading));
      store.dispatch(getSimpleTrade(simpleTrade));
      if (!isNaN(parseInt(simpleTradePercent))) {
        store.dispatch(
          getSimpleTradePercent(parseInt(simpleTradePercent))
        );
      }
      store.dispatch(getActiveLanguageAction(language));
      i18n.changeLanguage(language);
      return { status: 1 };
    } else {
      showAlertMSG("Header not inserted", 3);
      return { status: 0 };
    }
  } catch (err) {
    showErrors(err);
    return { status: 0 };
  }
};
