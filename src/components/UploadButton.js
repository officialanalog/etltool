
import React, { useContext, useState } from "react";
import XLSX from "xlsx";
import { topFunctions } from "../providers/TopProvider";


import { useHistory } from 'react-router-dom'

export default function UploadButton(props) {
  const {
    setOriginalData,
    setOriginalTitle,
    dragFileDetect,
    setFileLoadingStatus,
    setFileName
  } = useContext(topFunctions);

  let history = useHistory();



  const handleFile = (file /*:File*/) => {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    reader.onprogress = evt => {
      var percentLoaded = Math.round((Number(evt.loaded) / Number(evt.total)) * 100);
      setFileLoadingStatus(percentLoaded);
      setFileName(file.name);
    }
    reader.onloadend = () => {
      history.push('/transform');
    }
    reader.onload = e => {
      /* Parse data */
      setFileName(file.name);
      const bstr = e.target.result;
      // rABS ? "binary" : "array",
      const wb = XLSX.read(bstr, {
        type: rABS ? "binary" : "array",
        cellDates: true,
        cellNF: false,
        cellText: false,
      });


      // passing the option 'cellDates': true is important

      // XLSX.utils.sheet_to_json(ws, {})

      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      // console.log(rABS, wb);
      /* Convert array of arrays */

      // { }
      const data = XLSX.utils.sheet_to_json(ws, { dateNF: "dd-mm-yyyy", header: 1, raw: false });
      var k = JSON.parse(JSON.stringify(data[0]));
      data.shift();

      setOriginalData(data);
      setOriginalTitle(k);

      console.log(k, data)
      /* Update state */
      // console.log(make_cols(ws["!ref"]);
      // setData(data);
      // setCols(make_cols(ws["!ref"]));
    };
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  }
  const exportFile = () => {
    /* convert state to workbook */
    const ws = XLSX.utils.aoa_to_sheet(this.state.data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    /* generate XLSX file and send to client */
    XLSX.writeFile(wb, "sheetjs.xlsx");
  }

  return (
    <DragDropFile handleFile={handleFile}>
      <div className={`dropZone ${dragFileDetect ? 'active' : ''}`}>
        <div className="icon file"></div>

        <div className="icon">
          <span className="iconify" data-icon="icomoon-free:file-text2" data-inline="false"></span>
        </div>
        <div className="text1">
          Drag or Drop Files Here...
        </div>
        <div className="text2">Or</div>

        <div className="row">
          <div className="col-12">

            <DataInput handleFile={handleFile} />
          </div>
        </div>
      </div>

    </DragDropFile>
  );

}


export function DragDropFile(props) {

  const {
    setDragFileDetect
  } = useContext(topFunctions);


  const suppress = (evt) => {

    evt.stopPropagation();
    evt.preventDefault();
  }
  const onDrop = (evt) => {
    // setDragFileDetect(true);
    evt.stopPropagation();
    evt.preventDefault();
    const files = evt.dataTransfer.files;
    if (files && files[0]) props.handleFile(files[0]);
  }
  return (
    <div
      onDrop={(e) => {
        setDragFileDetect(false);
        onDrop(e)
      }}
      onDragEnter={(e) => {
        setDragFileDetect(true);
        suppress(e)
      }}
      onDragOver={(e) => {
        setDragFileDetect(true);
        suppress(e)
      }}
    >
      {props.children}
    </div>
  );
}

export function DataInput(props) {

  const handleChange = (e) => {
    const files = e.target.files;
    if (files && files[0]) props.handleFile(files[0]);
  }
  return (
    <span>

      {/* <div className="">
            Choose File
        </div> */}
      <input
        type="file"
        className="btn btn-primary btn-blue btn-center"
        id="file"
        accept={SheetJSFT}
        onChange={(e) => handleChange(e)}
        style={{ display: "none" }}
      />
      <label htmlFor="file" style={{ width: "" }}
        className="btn btn-primary btn-blue btn-center">Choose File</label>
    </span>
  );
}



/* list of supported file types */
const SheetJSFT = [
  "xlsx",
  "xlsb",
  "xlsm",
  "xls",
  "xml",
  "csv",
  "txt",
  "ods",
  "fods",
  "uos",
  "sylk",
  "dif",
  "dbf",
  "prn",
  "qpw",
  "123",
  "wb*",
  "wq*",
  "html",
  "htm"
]
  .map(function (x, i) {
    return (
      <span key={i}>{"." + x}</span>
    );
  })
  .join(",");

