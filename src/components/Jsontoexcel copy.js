import React, { useContext } from 'react'
import { topFunctions } from "../providers/TopProvider";

export default function Jsontoexcel(props) {


  const {
    fileNameWithoutExtension
  } = useContext(topFunctions);


  const JSONToCSVConvertor = (JSONData, ReportTitle, ShowLabel) => {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != "object" ? JSON.parse(JSONData) : JSONData;

    var CSV = "";
    //Set Report title in first row or line

    // CSV += ReportTitle + "\r\n\n";

    //This condition will generate the Label/Header
    if (ShowLabel) {
      var row = "";

      //This loop will extract the label from 1st index of on array
      for (var index in arrData[0]) {
        //Now convert each value to string and comma-seprated
        row += index + ",";
      }

      row = row.slice(0, -1);

      //append Label row with line break
      CSV += row + "\r\n";
    }

    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
      var row = "";

      //2nd loop will extract each column and convert it in string comma-seprated
      for (var index in arrData[i]) {
        row += '"' + arrData[i][index] + '",';
      }

      row.slice(0, row.length - 1);

      //add a line break after each row
      CSV += row + "\r\n";
    }

    if (CSV == "") {
      alert("Invalid data");
      return;
    }

    var fn = fileNameWithoutExtension;
    //this will remove the blank-spaces from the title and replace it with an underscore
    fn += ReportTitle.replace(/ /g, "_");

    //Initialize file format you want csv or xls
    var uri = "data:text/csv;charset=utf-8," + escape(CSV);
    var link = document.createElement("a");
    link.href = uri;

    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fn + ".csv";

    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const exportData = () => {
    // console.log
    var nn = [];
    if (typeof props.processedData !== "undefined") {

      // for(var i=0; i < props.processedData.length ; i++){
      //   nn[i] = Array();
      //   if(typeof props.currentRows === "undefined"){
      //     for(var j=0; j < props.processedTitle.length; j++){
      //       nn[i][props.processedTitle[j]] = props.processedData[i][j];
      //     }
      //   }else{
      //     for(var j=0; j < props.currentRows.length; j++){
      //       nn[i][props.processedTitle[props.currentRows[j]]] = props.processedData[i][props.currentRows[j]];
      //     }
      //   }
      // }
      console.log(props.processedData)
      JSONToCSVConvertor(props.processedData, "", true);

    }
  }
  return (
    <div>
      {/* <div className="sheetNav" onClick={() => { 
        exportData();
      }}> */}
      <span className="text">Export Data</span>

    </div>
  )
}