import React from "react";

function ShowData(props) {
  if (props.data !== undefined && props.data !== null) {
    let objHtml = [];
    let i = 0 ;
    for (let [key, value] of Object.entries(props.data)) {
      objHtml.push(
        <div className="row" key={i}>
          <div className="col-sm-6 text-center">{key}</div>
          <div className="col-sm-6 text-center">{value}</div>
        </div>
      );
      i++;
    }
    return <div className="container-fluid" style={{backgroundColor: '#fff', margin: '10px'}}>{objHtml}</div>;
  } else {
    return <div></div>;
  }
}

export default ShowData;
