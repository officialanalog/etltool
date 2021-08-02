import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { topFunctions } from "../providers/TopProvider";
import DataValidationBox from './DataValidationBox';
import { useHistory } from 'react-router-dom'

export default function SheetTable() {
    let history = useHistory();
    const {
        originalData,
        originalTitle,
        processedData,
        processedTitle,
        rowToTransform,
        setRowToTransform,
        setRowDetails,
        fileNameWithoutExtension,
        setFileNameWithoutExtension,
        message,
        setMessage,
        subTabPage,
        validationStatus,
        rowTempData,
        setProcessedData,
        validate,
        rowDetails,
        setPageColor,
        setUploadPage,
        formatList,
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

    } = useContext(topFunctions);

    useEffect(() => {
        if (JSON.stringify(originalData) === "[]") {
            history.push('/upload');
        }
    }, [originalData])


    return (
        <div>
            <div className="sheetBody">
                <div>
                    <input value={fileNameWithoutExtension}
                        className="sheetTitle"
                        onChange={(e) => {
                            var v = e.target.value;
                            var patt = /^\w+$/
                            if (patt.test(v) && v.length > 1) {
                                setFileNameWithoutExtension(e.target.value)
                            }
                        }}
                    />
                </div>
                {showValidationBox &&
                    <DataValidationBox />
                }
                <div className="sheetBox">
                    <div className="sheetBox_Title">
                        <span className="filters">
                            <div className="filterbox">
                                <span className="iconify" data-icon="fa-solid:filter" data-inline="false"></span>
                                <span className="text">Filter</span>
                            </div>
                            <div className="filtersearch">
                                <div className="searchicon">
                                    <span className="iconify" data-icon="bi:search" data-inline="false"></span>
                                    <input className="searchinput"
                                        value={searchWord}
                                        onChange={(e) => {
                                            setSearchWord(e.target.value)
                                        }}
                                    />
                                </div>
                            </div>
                        </span>
                        <Link to="/transform">
                            <div className="btn filtertransform btn-green">
                                <span className="iconify" data-icon="bi:lightning-charge" data-inline="false"></span>
                                Transform
                            </div>
                        </Link>
                    </div>
                    <div className="sheetBox_table_wrapper">
                        <table className="sheetBox_table">
                            <thead className="sheetBox_thead">
                                <tr>
                                    <th className={`id_row`}>
                                        <div className="columnTitle">ID</div>
                                        <div className={`validBox valid`}>.</div>
                                    </th>
                                    {tableTitle.map((columnName, index) => {
                                        return (
                                            <th key={index}>
                                                <div className="columnTitle">{columnName.name}</div>
                                                {typeof rowDetails[columnName.index] !== "undefined" &&
                                                    <div className={`validBox 
                                                    ${rowDetails[columnName.index].invalid_rows == 0 ? 'valid' : ''}`}
                                                        onClick={() => {
                                                            setRowToTransform(columnName.index)
                                                            setShowValidationBox(true);
                                                        }}
                                                    >
                                                        {rowDetails[columnName.index].invalid_rows} Invalid Rows
                                                    </div>
                                                }
                                            </th>
                                        )
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {tableDataToShow.map((row, index) => {
                                    return (
                                        <tr className="sheetBox_tbody" key={index}>
                                            <td className="columnTitle">{index + 1}</td>
                                            {tableTitle.map((column, index2) => {
                                                return (
                                                    <td key={index2}>
                                                        {row[column.name] !== null && typeof row[column.name] !== "undefined" &&
                                                            <span>{row[column.name].toString()}</span>
                                                        }
                                                        {row[column.name] === null &&
                                                            <span></span>
                                                        }
                                                    </td>
                                                )
                                            })}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>

                    </div>
                    <div className="table_footer">

                        <div className="pagination">
                            <span className={`page`}
                                className={`page`}
                                onClick={() => {
                                    setPage(1)
                                }}
                            >
                                <span className="iconify"
                                    data-icon="eva:arrow-ios-back-outline"
                                    data-inline="false"></span>
                            </span>
                            {Array.apply(0, Array(11)).map(function (x, i) {
                                return (
                                    <span key={i}>
                                        {(page + i) - 5 > 0 && (page + i) - 5 <= pageCount &&
                                            <span className={`page ${page === ((page + i) - 5) ? 'active' : ''}`} key={i}
                                                onClick={
                                                    () => setPage((page + i) - 5)
                                                }
                                            >{(page + i) - 5}
                                            </span>
                                        }
                                    </span>
                                )
                            })}
                            <span
                                className={`page`}
                                onClick={() => {
                                    setPage(pageCount - 1)
                                }}
                            >
                                <span className="iconify"
                                    data-icon="eva:arrow-ios-forward-outline"
                                    data-inline="false"
                                ></span>
                            </span>
                        </div>
                        <span className="row_per_page"></span>
                        <span> Rows per page </span>
                        <select onChange={(e) => {
                            setPer_Page(e.target.value)
                        }}>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                            <option value={500}>500</option>
                        </select>
                    </div>
                </div>
            </div>

        </div>
    );
}
