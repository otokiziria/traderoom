import React, { useRef, useState, useEffect } from "react";
import {
  saveLangs,
  getLang
} from "../../../../Services/Lang/langs";
import {
  getLangCats
} from "../../../../Services/LangCat/langcats";
//import { showAlertMSG } from "../../../../Lib/helpers";

function CategoriesEdit(props) {
  const ref_category = useRef(null);
  const ref_original = useRef(null);
  const ref_translated = useRef(null);
  const ref_status = useRef(null);

  const [statusSelected, setstatusSelected] = useState(-1);
  const [categorySelected, setcategorySelected] = useState(-1);
  const [categoryOptions, setcategoryOptions] = useState([]);
  // const [sortedcategory, setsortedcategory] = useState([]);

  const generateSelectOptions = (sortedcategory) => {
    if (sortedcategory.length > 0) {
      let nsortedCategory = [];

      for (let i = 0; i < sortedcategory.length; i++) {
        if (sortedcategory[i].status == 1) {
          nsortedCategory.push(
            <option key={i} value={sortedcategory[i].id}>
              {sortedcategory[i].title+" - "+sortedcategory[i].alias}
            </option>
          );
        }
        
      }
      setcategoryOptions(nsortedCategory);
    }
  };

  const getLanguageCategoriesData = async () => {
    let sortedCategoryData = await getLangCats();
    //setsortedcategory(sortedCategoryData.row);
    //console.log(sortedCategoryData.row, sortedcategory);
    generateSelectOptions(sortedCategoryData.row);
  };

  const getLangData = async () => {
    let retData = await getLang(props.data);
    if (retData !== null) {
      ref_original.current.value = retData.row.original;
      ref_translated.current.value = retData.row.translated;
      setstatusSelected(retData.row.status);
      setcategorySelected(retData.row.category);
      // generateSelectOptions();
    }
  };

  useEffect(() => {
    if (props.data !== 0) {
      getLangData(props.data);
    }
    getLanguageCategoriesData();
  }, []);

  const saveData = () => {
    
    let data = {
      id: props.data,
      category: ref_category.current.value,
      original: ref_original.current.value,
      translated: ref_translated.current.value,
      status: ref_status.current.value
    };
    saveLangs(data);
  };
  return (
    <div style={{ backgroundColor: "#fff" }}>
      <form>
      <div className="form-group">
          <label htmlFor="for_category">Category</label>
          <select
            ref={ref_category}
            id="for_category"
            className="form-control"
            value={categorySelected}
            readOnly={false}
            onChange={(e) => {
              setcategorySelected(e.target.value);
            }}
          >
            <option value="0">Choose Category</option>
            {categoryOptions}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="for_originalte">Original</label>
          <input
            ref={ref_original}
            type="text"
            className="form-control"
            id="for_original"
            placeholder="Enter original"
          />
        </div>
        <div className="form-group">
          <label htmlFor="for_translated">Translation</label>
          <input
            ref={ref_translated}
            type="text"
            className="form-control"
            id="for_Translated"
            placeholder="Enter translation"
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

export default CategoriesEdit;
