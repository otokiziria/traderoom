import React, { useRef, useState, useEffect } from "react";
import {
  saveCategories,
  getCategory,
  getSortedCategories,
  uploadImages
} from "../../../../Services/Categories/categories";
import { showAlertMSG } from "../../../../Lib/helpers";

function CategoriesEdit(props) {
  const ref_title = useRef(null);
  const ref_parent_id = useRef(null);
  const ref_status = useRef(null);
  const ref_image = useRef(null);

  const [sortedOptions, setsortedOptions] = useState([]);
  const [statusSelected, setstatusSelected] = useState(-1);
  const [parentSelected, setparentSelected] = useState(-1);
  const [imageFile,  setimageFile] = useState(null);
  const [imageNameFile,  setimageNameFile] = useState('');
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

  const getCategoryData = async () => {
    let retData = await getCategory(props.data);
    if (retData !== null) {
      ref_title.current.value = retData.row.title;
      setimageNameFile(retData.row.image);
      setstatusSelected(retData.row.status);
      setparentSelected(retData.row.parent_id);
      // generateSelectOptions();
    }
  };

  const getSortedCategoriesData = async () => {
    let sortedCategoryData = await getSortedCategories();
    //setsortedcategory(sortedCategoryData.row);
    //console.log(sortedCategoryData.row, sortedcategory);
    generateSelectOptions(sortedCategoryData.row);
  };

  useEffect(() => {
    if (props.data !== 0) {
      getCategoryData(props.data);
    }
    getSortedCategoriesData();
  }, []);

  const saveData = async (e) => {
    e.preventDefault();
    if (
      ref_title.current.value === undefined ||
      ref_title.current.value.length == 0
    ) {
      showAlertMSG("Title is empty", 3);
      return false;
    }

    let image_name = imageNameFile;
    
    if(imageFile !== null && imageFile != ''){
        let uplImage = await uploadImages(imageFile);
        if(uplImage.status == 1){
          image_name = uplImage.filename;
        }
    }
console.log('lightLogoNameFile = ',image_name);
 

    let data = {
      id: props.data,
      image: (image_name !== null) ? image_name : '',
      title: ref_title.current.value,
      parent_id: ref_parent_id.current.value,
      status: ref_status.current.value,
    };
    saveCategories(data);
  };
  return (
    <div style={{ backgroundColor: "#fff" }}>
      <form>
      <div className="form-group">
          <label htmlFor="for_state">Image</label>
          <input type="file" ref={ref_image} className='className="form-control"' onChange={(e)=>{
                setimageFile(e.target.files[0]);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="for_title">Title</label>
          <input
            ref={ref_title}
            type="text"
            className="form-control"
            id="for_title"
            placeholder="Enter title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="for_category">Parent Category</label>
          <select
            ref={ref_parent_id}
            id="for_category"
            className="form-control"
            value={parentSelected}
            readOnly={false}
            onChange={(e) => {
              setparentSelected(e.target.value);
            }}
          >
            <option value="0">Choose Parent Category</option>
            {sortedOptions}
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
          onClick={(e) => {
            e.preventDefault();
            saveData(e);
          }}
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default CategoriesEdit;
