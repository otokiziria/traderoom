import React, { useRef, useState, useEffect } from "react";
import {
  saveCategories,
  getSortedCategories,
} from "../../../../Services/Categories/categories";
import {
  getGroupPaths
} from "../../../../Services/Symbols/groups";
import {
  saveSymbol,
  getSymbol
} from "../../../../Services/Symbols/symbols";
import { showAlertMSG } from "../../../../Lib/helpers";

function SymbolsEdit(props) {
  const ref_symbol = useRef(null);
  const ref_ticker = useRef(null);
  const ref_category = useRef(null);
  const ref_short_name = useRef(null);
  const ref_description = useRef(null);
  const ref_status = useRef(null);
  const ref_group_path = useRef(null);
  
  const [showForm, setshowForm] = useState(false);
  const [sortedOptions, setsortedOptions] = useState([]);
  const [grouppathOptions, setgrouppathOptions] = useState([]);
  const [statusSelected, setstatusSelected] = useState(-1);
  const [parentSelected, setparentSelected] = useState(-1);
  const [grouppathSelected, setgrouppathSelected] = useState(-1);
  // const [sortedcategory, setsortedcategory] = useState([]);

  const generateSelectOptions = (sortedcategory) => {
    if (sortedcategory.length > 0) {
      let nsortedCategory = [];

      for (let i = 0; i < sortedcategory.length; i++) {
        let sub = "";
        if (sortedcategory[i].level > 0) {
          for (let a = 0; a < sortedcategory[i].level; a++) {
            sub += "!_";
          }
        }
        nsortedCategory.push(
          <option key={i} value={sortedcategory[i].id}>
            {sub + sortedcategory[i].title}
          </option>
        );
      }
      setsortedOptions(nsortedCategory);
    }
  };

  const generateSelectOptionsPath = (sortedcategory) => {
    if (sortedcategory.length > 0) {
      let nsortedCategory = [];

      for (let i = 0; i < sortedcategory.length; i++) {
        let sub = "";
        if (sortedcategory[i].level > 0) {
          for (let a = 0; a < sortedcategory[i].level; a++) {
            sub += "!_";
          }
        }
        nsortedCategory.push(
          <option key={i} value={sortedcategory[i].id}>
            {sub + sortedcategory[i].title}
          </option>
        );
      }
      setgrouppathOptions(nsortedCategory);
    }
  };

  const getSymbolData = async () => {
    let retData = await getSymbol(props.data);
    if (retData !== null) {
      ref_symbol.current.value = retData.row.symbol;
      ref_ticker.current.value = retData.row.ticker;
      ref_short_name.current.value = retData.row.short_name;
      ref_description.current.value = retData.row.description;
      setstatusSelected(retData.row.status);
      setparentSelected(retData.row.category);
      setgrouppathSelected(retData.row.path_id);
      // generateSelectOptions();
    }
  };

  const getSortedCategoriesData = async () => {
    let sortedCategoryData = await getSortedCategories();
    generateSelectOptions(sortedCategoryData.row);
  };

  const getGroupPathData = async () => {
    let groupPathData = await getGroupPaths();
    generateSelectOptionsPath(groupPathData.row);
  };

  useEffect(() => {
    console.log(props);
    if (props.isNew !== undefined && props.isNew === true) {
       if(props.data.symbol === undefined){
        ref_symbol.current.value = '';
        ref_ticker.current.value = '';
        ref_description.current.value = '';
        ref_short_name.current.value = '';
        setshowForm(false);
       }
       else{
        setshowForm(true);
        ref_symbol.current.value = props.data.symbol;
        ref_description.current.value = props.data.description;
       }
    }
    else{
      if(props.data === 0){
        ref_symbol.current.value = '';
        ref_ticker.current.value = '';
        ref_description.current.value = '';
        ref_short_name.current.value = '';
        setshowForm(false);
      }
      else{
        getSymbolData(props.data);
        setshowForm(true);
        ref_symbol.current.value = props.data.symbol;
        ref_ticker.current.value = props.data.ticker;
        ref_description.current.value = props.data.description;
      }
    }
    getSortedCategoriesData();
    getGroupPathData();
  }, []);

  const saveData = () => {
    if(!showForm){
      showAlertMSG('You did not choose Symbol !!!', 2);
      return false;
    }

    if (
      ref_symbol.current.value === undefined ||
      ref_symbol.current.value.length == 0
    ) {
      showAlertMSG("Symbol is empty", 3);
      return false;
    }

    if (
      ref_group_path.current.value === undefined ||
      ref_group_path.current.value == 0
    ) {
      showAlertMSG("Group Path is empty", 3);
      return false;
    }
    let data = {};
    if (props.isNew !== undefined && props.isNew === true) {
      data = {
        id: 0,
        symbol: ref_symbol.current.value,
        short_name: ref_short_name.current.value,
        description: ref_description.current.value,
        category: ref_category.current.value,
        path_id: ref_group_path.current.value,
        ticker: ref_ticker.current.value,
        path: props.data.path,
        contractSize: props.data.contractSize,
        currencyBase: props.data.currencyBase,
        currencyProfit: props.data.currencyProfit,
        currencyMargin: props.data.currencyMargin,
        digits: props.data.digits,
        point: props.data.point,
        volumeStep: props.data.volumeStep,
        volumeLimit: props.data.volumeLimit,
        volumeMin: props.data.volumeMin,
        volumeMax: props.data.volumeMax,
        margin_value: props.data.marginRateInitialBuy,
        sessionData: props.data.sessionData,
        status: ref_status.current.value
      };
    }
    else{
      data = {
        id: props.data,
        symbol: ref_symbol.current.value,
        short_name: ref_short_name.current.value,
        description: ref_description.current.value,
        category: ref_category.current.value,
        path_id: ref_group_path.current.value,
        status: ref_status.current.value,
        ticker: ref_ticker.current.value,
        path: '',
        contractSize: '',
        currencyBase: '',
        currencyProfit: '',
        currencyMargin: '',
        digits: '',
        point: '',
        margin_value: '',
        sessionData: '',
        volumeStep: '',
        volumeLimit: '',
        volumeMin: '',
        volumeMax: ''
      }
    }
    
    saveSymbol(data);

  };
 
    return (
      
      <div style={{ backgroundColor: "#fff" }}>
        {
           ((!showForm) ? ( 
            <div style={{textAlign: 'center', color: 'red'}}>
            Choose Symbol !!!
            </div> ) : '') 
        }
        <form>
          <div className="form-group">
            <label htmlFor="for_symbol">Symbol</label>
            <input
              ref={ref_symbol}
              type="text"
              className="form-control"
              id="for_symbol"
              placeholder="Enter title"
              disabled={true}
            />
          </div>
          <div className="form-group">
            <label htmlFor="for_short_name">Short Name</label>
            <input
              ref={ref_short_name}
              type="text"
              className="form-control"
              id="for_short_name"
              placeholder="Enter Short Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="for_ticker">Ticker</label>
            <input
              ref={ref_ticker}
              type="text"
              className="form-control"
              id="for_ticker"
              placeholder="Enter ticker"
            />
          </div>
          <div className="form-group">
            <label htmlFor="for_description">Description</label>
            <input
              ref={ref_description}
              type="text"
              className="form-control"
              id="for_description"
              placeholder="Enter Description"
            />
          </div>
          <div className="form-group">
            <label htmlFor="for_category">Category</label>
            <select
              ref={ref_category}
              id="for_category"
              className="form-control"
              value={parentSelected}
              readOnly={false}
              onChange={(e) => {
                setparentSelected(e.target.value);
              }}
            >
              <option value="0">Choose Category</option>
              {sortedOptions}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="for_group_path">Group Path</label>
            <select
              ref={ref_group_path}
              id="for_group_path"
              className="form-control"
              value={grouppathSelected}
              readOnly={false}
              onChange={(e) => {
                setgrouppathSelected(e.target.value);
              }}
            >
              <option value="0">Choose Group Path</option>
              {grouppathOptions}
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

export default SymbolsEdit;
