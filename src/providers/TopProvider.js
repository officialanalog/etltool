import React, { useState, useEffect } from "react";
import { defaultData, defaultTitle } from '../data/sample';
import getFirebase from "../firebase/firebase";

const TopProvider = (props) => {
  const [originalData, setOriginalData] = useState([]);
  const [originalTitle, setOriginalTitle] = useState([]);
  const [dragFileDetect, setDragFileDetect] = useState(false)
  const [processedData, setProcessedData] = useState([]);
  const [processedTitle, setProcessedTitle] = useState([]);

  const [processedDataTemp, setProcessedDataTemp] = useState([]);
  const [processedTitleTemp, setProcessedTitleTemp] = useState([]);
  const [ignoreUnmappped, setIgnoreUnmappped] = useState(false);
  const [doneMapping, setDoneMapping] = useState(false);
  const [doneValidating, setDoneValidating] = useState(false);

  const [showValidationBox, setShowValidationBox] = useState(false)
  const [userDetails, setUserDetails] = useState({});
  const [rowTempData, setRowTempData] = useState([]);

  const [pageColor, setPageColor] = useState("white");

  // const [message, setMessage] = useState({});

  const [rowToTransform, setRowToTransform] = useState(0);

  const [showOnlyInvalid, setShowOnlyInValid] = useState(true);
  const [fileLoadingStatus, setFileLoadingStatus] = useState(0)
  const [fileName, setFileName] = useState("");
  const [fileNameWithoutExtension, setFileNameWithoutExtension] = useState("Sample");
  const [fileExtension, setFileExtension] = useState("xls");

  const [favourites, setFavourites] = useState([]);

  const [subTabPage, setSubTabPage] = useState(1);
  const [rowDetails, setRowDetails] = useState([])

  const [uploadPage, setUploadPage] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  const [tableData, setTableData] = useState([]);
  const [tableTitle, setTableTitle] = useState([]);



  const [formatList, setFormatList] = useState([
    { name: "Ignore Validation", function: "validatePass" },
    { name: "First Name", function: "validateText" },
    { name: "Last Name", function: "validateText" },
    { name: "Phone", function: "validatePhone2" },
    { name: "Email (aaa@bbb.ccc)", function: "validateEmail" },
    { name: "Website (aaa.bbb)", function: "validateWebsite" },
    { name: "Text", function: "validateText" },
    { name: "Number", function: "validateNumber" },
    { name: "SSN (000-00-0000)", function: "validateSSN" },
    { name: "Date (DD-MM-YYYY)", function: "validateDate" },
    { name: "DOB (18yrs< DOB < 100yrs , DD-MM-YYYY)", function: "validateBirthday" },
  ]);

  const [message, setMessage] = useState({
    text: "",
    type: ""
  })

  useEffect(() => {
    if (typeof message.text !== "undefined") {
      if (message.text !== "") {
        setTimeout(function () {
          var msg = {
            text: "",
            type: ""
          };
          setMessage(msg);
        }, 5000);
      }
    }
  }, [message])


  useEffect(() => {
    const firebase = getFirebase();
    if (firebase) {
      firebase.auth().onAuthStateChanged((authUser) => {
        if (authUser) {
          setCurrentUser(authUser.email);
          setUserDetails(authUser.providerData);
          // localStorage.setItem('authUser', JSON.stringify(authUser));
        } else {
          setUserDetails({});
        }
      });
    }
  }, []);

  const encodeCommas = (stringText) => {
    var t = stringText.replace(/'/g, '<#@?@#>');
    return t;
  }

  const decodeCommas = (stringText) => {
    var t = stringText.replace(/<#@?@#>/g, "'");
    return t;
  }
  const validate = (row, validation) => {
    if (typeof row !== "undefined" && typeof validation !== "undefined") {
      if (row !== "" && validation !== "") {
        var v = formatList[validation].function;
        var vs = [...validationStatus];
        var invalid_count = 0;
        var valid_count = 0;
        for (var j = 0; j < processedData.length; j++) {
          var m = encodeCommas(processedData[j][row]);
          console.log(m);
          if (eval(v + "('" + encodeURIComponent(m) + "')")) {
            vs[j][row] = true;
            valid_count++;
          } else {
            vs[j][row] = false;
            invalid_count++;
          }
        }
        var rd = [...rowDetails]
        rd[row].invalid_rows = invalid_count;
        rd[row].valid_rows = valid_count;
        setRowDetails(rd);
        setValidationStatus(vs);



      }
    }
  }

  const validateDate = (valueStr) => {
    var str = decodeCommas(decodeURIComponent(valueStr));
    const regex = /^(([^<span>()[\]\\.,;:\s@"]+(\.[^<span>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(str.toLowerCase())
  }

  const validatePass = (valueStr) => {
    return true
  }

  const validateDate2 = (valueStr) => {
    var str = decodeCommas(decodeURIComponent(valueStr));
    const regex = /([0-2][0-9]|(3)[0-1])[-|\/](((0)[0-9])|((1)[0-2]))[-|\/]\d{4}/;
    return regex.test(str.toLowerCase())
  }

  const futureDate = (valueStr) => {
    var str = decodeCommas(decodeURIComponent(valueStr));
    const regex = /([0-2][0-9]|(3)[0-1])[-|\/](((0)[0-9])|((1)[0-2]))[-|\/]\d{4}/;
    var isValid = false;
    if (regex) {
      var d = str.split("-");
      var day = d[0];
      var month = d[1];
      var year = d[2];

      var dateObject = new Date(year, month, day);
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();


    }
    return regex.test(str.toLowerCase());
  }

  const validateNotEmpty = (valueStr) => {
    var str = decodeCommas(decodeURIComponent(valueStr));
    const regex = /^$|\s+/;
    var result = regex.test(str.toLowerCase());
    return !result;
  }

  const validateFirstName = (valueStr) => {
    var str = decodeCommas(decodeURIComponent(valueStr));
    var isString = validateText(valueStr);
    var isNotEmpty = validateNotEmpty(valueStr);
    return isString && isNotEmpty;
  }

  const validateBirthday = (birthday) => {

    var regexVar = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/; // add anchors; use literal
    var regexVarTest = regexVar.test(birthday); // pass the string, not the Date
    var userBirthDate = new Date(birthday.replace(regexVar, "$3-$2-$1")); // Use YYYY-MM-DD format
    var todayYear = (new Date()).getFullYear(); // Always use FullYear!!
    var cutOff19 = new Date(); // should be a Date
    cutOff19.setFullYear(todayYear - 19); // ...
    var cutOff95 = new Date();
    cutOff95.setFullYear(todayYear - 100);
    if (!regexVarTest) { // Test this before the other tests
      return false;
    } else if (isNaN(userBirthDate)) {
      return false;
    } else if (userBirthDate > cutOff19) {
      return false;
    } else if (userBirthDate < cutOff95) {
      return false
    } else {
      return true
    }
  }

  const validateSSN = (valueStr) => {
    var str = decodeCommas(decodeURIComponent(valueStr));
    const regex = /^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$/;
    return regex.test(str.toLowerCase())
  }
  const validateEmail = (valueStr) => {
    var str = decodeCommas(decodeURIComponent(valueStr));
    const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    return regex.test(str.toLowerCase())
  }

  const validatePhone = (valueStr) => {
    var str = decodeCommas(decodeURIComponent(valueStr));
    const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    // const regex2 = /^(\d{3}-?\d{3}-?\d{4}|XXX-XXX-XXXX)$/
    // const regex3 = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/
    return regex.test(str);
  }

  const validatePhone2 = (valueStr) => {
    // 7 or 10 digit number, with extensions allowed, delimiters are spaces, dashes, or periods
    var str = decodeCommas(decodeURIComponent(valueStr));
    const regex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\.\/0-9]*$/
    return regex.test(str)
  }

  const validateWebsite = (valueStr) => {
    var str = decodeCommas(decodeURIComponent(valueStr));
    const regex = /^(http:\/\/|https:\/\/)?(www.)?([a-zA-Z0-9]+).[a-zA-Z0-9]*.[‌​a-z]{3}\.([a-z]+)?$/g
    return regex.test(str)
  }

  const validateText = (valueStr) => {
    var str = decodeCommas(decodeURIComponent(valueStr));
    const regex = /^[a-zA-Z ]*$/
    return regex.test(str)
  }

  const validateNumber = (valueStr) => {
    var str = decodeCommas(decodeURIComponent(valueStr));
    const regex = /^[0-9]*$/;
    return regex.test(str)
  }




  const [validationRules, setValidationRules] = useState({});

  const [validationStatus, setValidationStatus] = useState([]);

  useEffect(() => {
    setOriginalData(JSON.parse(JSON.stringify(defaultData)));
    setOriginalTitle(JSON.parse(JSON.stringify(defaultTitle)));
  }, [defaultData, defaultTitle])


  useEffect(() => {

    var c = Array();
    for (var i = 0; i < originalTitle.length; i++) {
      var d = {}
      d.new_name = "";
      d.validation = "";
      d.invalid_rows = 0;
      d.valid_rows = 0;
      d.ignoreRow = false;
      c.push(d);
    }
    setRowDetails(c);


    var v = Array();
    for (var i = 0; i < originalData.length; i++) {
      v[i] = Array();
      for (var j = 0; j < originalData[i].length; j++) {
        v[i][j] = true;
      }
    }

    setValidationStatus(v);
    setProcessedData(JSON.parse(JSON.stringify(originalData)))
    setProcessedDataTemp(JSON.parse(JSON.stringify(originalData)))
    setRowTempData(JSON.parse(JSON.stringify(originalData)));
  }, [originalData, originalTitle])

  useEffect(() => {
    setProcessedTitle([])
    setProcessedTitleTemp([])

  }, [originalTitle])

  useEffect(() => {
    setDoneMapping(false);
    setDoneValidating(false);
    var c = Array();

    var checkValidFalse = false;
    var checkValidTrue = false;

    var checkMapFalse = false;
    var checkMapTrue = false;
    for (var i = 0; i < rowDetails.length; i++) {
      if (rowDetails[i].new_name !== "") {
        checkMapTrue = true;
        c.push(rowDetails[i].new_name);
      } else {
        checkMapFalse = true;
        c.push("");
      }

      if (rowDetails[i].validation !== "") {
        checkValidTrue = true;
      } else {
        checkValidFalse = true;
      }

    }

    setDoneMapping(checkMapTrue && !checkMapFalse)
    setDoneValidating(checkValidTrue && !checkValidFalse)
    setProcessedTitle(c);
  }, [rowDetails, originalTitle])


  useEffect(() => {
    if (fileName !== "") {
      var ext = fileName.split('.').pop();
      setFileExtension(ext);
      const fwe = fileName.split('.').slice(0, -1).join('.');

      var fileName_without_extention = fwe.replace(/[\W_]+/g, '');


      setFileNameWithoutExtension(fileName_without_extention);
    }
  }, [fileName])



  useEffect(() => {
    var data = [];
    var title = [];
    if (typeof rowDetails[0] !== "undefined") {
      for (var i = 0; i < rowDetails.length; i++) {
        if (!rowDetails[i].ignoreRow) {
          var tt = {};
          var t = rowDetails[i].new_name;
          if (t === "") {
            t = originalTitle[i]
          }
          tt = { index: i, name: t, }
          title.push(tt);
        }
      }

      for (var i = 0; i < processedData.length; i++) {
        data[i] = {};
        for (var j = 0; j < title.length; j++) {
          data[i][title[j].name] = processedData[i][title[j].index];
        }
      }
      setTableData(data);
      setTableTitle(title)
    }
  }, [processedData,
    rowDetails,
    originalTitle])





  const [tableDataToShow, setTableDataToShow] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [tableDataSearched, setTableDataSearched] = useState([]);
  const [page, setPage] = useState(1);
  const [per_page, setPer_Page] = useState(5);
  const [startIndex, setStateIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [pageShown, setPageShown] = useState([0, 0]);

  const filterTable = (td) => {
    var c = [];
    var filtered_1 = td.filter((tr, index) => {
      if (startIndex <= index && endIndex >= index) {
        return true;
      }
    })
    return filtered_1
    // for(var i = )
  }

  const searchTable = (td, word) => {
    var filtered_1 = td.filter((tr, index) => {
      for (var i = 0; i < tableTitle.length; i++) {
        if (typeof tableTitle[i] !== "undefined") {
          var tn = tr[tableTitle[i].name].toLowerCase()
          if (tn.indexOf(word.toLowerCase()) > -1) {
            console.log(tableTitle[i].name);
            return true;
            break;
          }
        } else {
          return true
        }
      }
    })
    // console.log(filtered_1);
    return filtered_1
  }

  useEffect(() => {
    var si = (page - 1) * per_page;
    var ei = (page * per_page) - 1;
    var pc = Math.ceil(tableDataSearched.length / per_page);
    var psstart = page - 5;
    setStateIndex(si);
    setEndIndex(ei);
    setPageCount(pc)

    if (page < 5) {
      psstart = 0;
    } else {
      psstart = page - 5;
    }
    var psend = page + 5;
    if (psend >= pc) {
      psend = pageCount
    }
    var ps = [psstart, psend]
    setPageShown(ps)

  }, [
    tableDataSearched,
    per_page,
    page])


  useEffect(() => {
    var tds = searchTable(tableData, searchWord);
    setTableDataSearched(tds);
  }, [searchWord, tableData, per_page])

  useEffect(() => {
    var tds = filterTable(tableDataSearched);
    setTableDataToShow(tds);
  }, [
    tableDataSearched,
    page
  ])


  return (
    <topFunctions.Provider
      value={{
        defaultTitle,
        defaultData,
        originalData,
        setOriginalData,
        originalTitle,
        setOriginalTitle,
        processedDataTemp,
        setProcessedDataTemp,
        processedData,
        setProcessedData,
        processedTitle,
        setProcessedTitleTemp,
        rowToTransform,
        setRowToTransform,
        formatList,
        setFormatList,
        validationRules,
        setValidationRules,
        favourites,
        setFavourites,
        message,
        setMessage,
        subTabPage,
        setSubTabPage,
        rowDetails,
        setRowDetails,
        setValidationStatus,
        validationStatus,
        validate,
        rowTempData,
        setRowTempData,
        dragFileDetect,
        setDragFileDetect,
        fileLoadingStatus,
        setFileLoadingStatus,
        fileName,
        setFileName,
        setFileExtension,
        fileNameWithoutExtension,
        setFileNameWithoutExtension,
        fileExtension,
        doneMapping,
        setDoneMapping,
        doneValidating,
        setDoneValidating,
        currentUser,
        setCurrentUser,
        pageColor,
        setPageColor,
        uploadPage,
        setUploadPage,
        ignoreUnmappped,
        setIgnoreUnmappped,
        showValidationBox,
        setShowValidationBox,
        tableData,
        setTableData,
        tableTitle,
        setTableTitle,
        tableDataToShow,
        setTableDataToShow,
        searchWord,
        setSearchWord,
        tableDataSearched,
        setTableDataSearched,
        page,
        setPage,
        per_page,
        setPer_Page,
        startIndex,
        setStateIndex,
        endIndex,
        setEndIndex,
        pageCount,
        setPageCount,
        pageShown,
        setPageShown

      }}
    >
      {props.children}
    </topFunctions.Provider>
  );
};
export default TopProvider;
export const topFunctions = React.createContext();
