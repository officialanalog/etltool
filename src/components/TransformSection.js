import React, { useState, useContext } from 'react'
import { Link } from "react-router-dom"
import { topFunctions } from "../providers/TopProvider";
export default function TransformSection() {

    const {
        originalData,
        originalTitle,
        processedData,
        processedTitle,
        rowToTransform,
        setRowToTransform,
        setRowDetails,
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
        setIgnoreUnmappped
    } = useContext(topFunctions);

    return (
        <div className="transform_section">
            <div className="notes1">
                Tell us a bit about the new column names you would like to use to map to your original
                column names and also set up the type format for validation of data.
            </div>
            <div className="row">
                <div className="col-6 fieldset">
                    <div className="input_title">Original Column Name</div>
                    <select className="input1"
                        onChange={(e) => {
                            setRowToTransform(e.target.value)
                            console.log(rowToTransform)
                        }}
                    >
                        <option disabled={true} value="">Select from the column name list</option>
                        {originalTitle.map((thisTitle, index) => {
                            return (
                                <option key={index}
                                    value={index}
                                >{thisTitle}</option>
                            )
                        })}

                    </select>
                </div>

                <div className="col-6 fieldset mt-2">
                    {typeof rowDetails[rowToTransform] !== "undefined" &&
                        <span>
                            {rowDetails[rowToTransform].ignoreRow &&
                                <button className="btn btn-secondary mt-5"
                                    onClick={(e) => {
                                        var v = [...rowDetails]
                                        if (typeof v[rowToTransform] !== "undefined") {
                                            v[rowToTransform].ignoreRow = false;
                                            console.log(rowToTransform, v)
                                            validate(rowToTransform, e.target.value)
                                            setRowDetails(v);
                                        }
                                    }}
                                >Add Column</button>
                            }
                        </span>
                    }
                </div>

            </div>

            <div className="row">
                {typeof rowDetails[rowToTransform] !== "undefined" &&
                    <div className="col-6">
                        <div className="input_title">Set your new database column name</div>
                        <input className="input1" placeholder="e.g Phone Number"
                            value={rowDetails[rowToTransform].new_name}
                            onChange={(e) => {
                                var v = [...rowDetails]
                                if (typeof v[rowToTransform] !== "undefined") {
                                    v[rowToTransform].new_name = e.target.value;
                                    setRowDetails(v);
                                }
                            }}
                        />
                    </div>
                }
                <div className="col-6 fieldset">

                    <div className="input_title">Set the type format</div>
                    {typeof rowDetails[rowToTransform] !== "undefined" &&
                        <select className="input1"
                            onChange={(e) => {

                                var v = [...rowDetails]
                                if (typeof v[rowToTransform] !== "undefined") {
                                    v[rowToTransform].validation = e.target.value;
                                    console.log(rowToTransform, v)
                                    validate(rowToTransform, e.target.value)
                                    setRowDetails(v);
                                }
                            }}

                        >
                            <option disabled={true} value="">Select from the column name list</option>
                            {formatList.map((thisFormat, index) => {
                                return (
                                    <option key={index} value={index}>{thisFormat.name}</option>
                                )
                            })}
                        </select>
                    }
                </div>

            </div>


            <div className="fieldset">
                <div className="col-12">
                    <div className="input_title">New Column Names </div>
                    <div className="input_side_title">Remove All</div>
                    <div className="column_area">
                        {rowDetails.map((thisRow, index) => {
                            return (
                                <span key={index}>
                                    {typeof rowDetails[index] !== "undefined" &&
                                        <span>

                                            <span>
                                                {!rowDetails[index].ignoreRow
                                                    &&
                                                    <div key={index}
                                                        value={index}
                                                        className="column_names"
                                                    >
                                                        {thisRow.new_name !== "" ?
                                                            <span>
                                                                {thisRow.new_name}
                                                            </span>
                                                            : originalTitle[index]
                                                        }
                                                        <span
                                                            onClick={(e) => {
                                                                var v = [...rowDetails]
                                                                if (typeof v[index] !== "undefined") {
                                                                    v[index].ignoreRow = true;
                                                                    validate(rowToTransform, e.target.value)
                                                                    setRowDetails(v);
                                                                }
                                                            }}>
                                                            <span
                                                                className="iconify" data-icon="iconoir:cancel" data-inline="false"

                                                            ></span>
                                                        </span>
                                                    </div>
                                                }
                                            </span>

                                        </span>
                                    }
                                </span>
                            )
                        })}

                    </div>

                    <div className="radio">
                        <input type="checkbox"
                            checked={ignoreUnmappped}
                            onChange={(e) => {
                                if (ignoreUnmappped) {
                                    setIgnoreUnmappped(false);
                                } else {
                                    setIgnoreUnmappped(true);
                                }
                            }}
                        />
                        <span className="radioText">
                            Ignore all column names not mapped
                        </span>
                    </div>
                </div>
            </div>

            <div className="notes2  mb-4">
                The above set database column names will be used to map to your original column name from the uploaded file
            </div>
            <Link to="/sheet">
                <button className="btn btn-primary btn-blue mx-auto btn-center"> Prep Data</button>
            </Link>
        </div >
    )
}
