import React, { useContext, useEffect } from 'react';
import { topFunctions } from "../providers/TopProvider";


export default function DataValidationBox() {
    const {
        formatList,
        rowDetails,
        setRowDetails,
        rowToTransform,
        originalData,
        originalTitle,
        processedData,
        processedTitle,
        showValidationBox,
        setShowValidationBox,
        validationStatus,
        rowTempData,
        setRowTempData,
        validate,
        setProcessedData

    } = useContext(topFunctions);

    useEffect(() => {
        var c = Array();
        if (typeof processedData !== "undefined") {
            c = [...processedData];
            setRowTempData(JSON.parse(JSON.stringify(processedData)));
        }

    }, [rowToTransform])

    useEffect(() => {
        if (typeof rowDetails[rowToTransform] !== "undefined") {
            validate(rowToTransform, rowDetails[rowToTransform].validation)
        }
    }, [processedData]);

    return (
        <div className="ade">
            {/* {JSON.stringify(processedTitle)} */}
            <div className={`overlay animate__animated 
            ${showValidationBox ? 'animate__fadeIn' : 'animate__fadeOut'} `}
            // onClick={() => setShowValidationBox(false)}
            >
                <div className={`validationBox animate__animated 
                ${showValidationBox ? 'animate__slideInRight' : 'animate__slideOutRight'} `}>
                    <div className="close"
                        onClick={() => setShowValidationBox(false)}
                    >
                        <div className="iconify"
                            data-icon="iconoir:cancel"
                            data-inline="false"

                        ></div>
                    </div>


                    <div className="overlay_title"
                        style={{}}
                    >Replace incorrect values</div>

                    <div className="overlay-label"
                    >Column</div>
                    <div className="overlay_box">
                        {typeof rowDetails[rowToTransform] !== "undefined" &&
                            <span>
                                {rowDetails[rowToTransform].new_name !== "" &&
                                    <span>
                                        {rowDetails[rowToTransform].new_name}
                                    </span>
                                }
                                {rowDetails[rowToTransform].new_name === "" &&
                                    <span>
                                        {originalTitle[rowToTransform]}
                                    </span>
                                }
                            </span>
                        }
                    </div>

                    <div className="overlay_label">Type format</div>
                    <div className="overlay_box">
                        {typeof rowDetails[rowToTransform] !== "undefined" &&
                            <span>
                                {typeof formatList[rowDetails[rowToTransform].validation] !== "undefined" &&
                                    <span>
                                        {formatList[rowDetails[rowToTransform].validation].name}
                                    </span>
                                }

                                {rowDetails[rowToTransform].validation === "" &&
                                    <span>
                                        No Format Selected
                                    </span>
                                }

                            </span>
                        }
                    </div>

                    <div className="overlay_label">Invalid errors!!</div>
                    <div className="overlay_table mt-3">

                        <div className="overlay_table_head row">
                            <div className="col-5">Original row text</div>
                            <div className="col-1"></div>
                            <div className="col-6">Replace text with</div>
                        </div>





                        {originalData.map((data, index) => {
                            return (
                                <span key={index}
                                    className=""
                                >
                                    {typeof validationStatus[index] !== "undefined" &&
                                        <span>
                                            {!validationStatus[index][rowToTransform] &&
                                                <div className={`row overlay_table_tbody row mt-2 ${index % 2 == 0 ? 'odd' : ''}`} key={index}>
                                                    <div className="col-5 td_box"><div className="text">{data[rowToTransform]}</div></div>
                                                    <span className="col-1">
                                                        <span className="iconify " data-icon="akar-icons:arrow-right" data-inline="false"></span>
                                                    </span>
                                                    {typeof processedData[index] !== "undefined" &&
                                                        <div className={`col-6 td_box ${validationStatus[index][rowToTransform] ? 'valid' : 'invalid'}`}>
                                                            <input value={rowTempData[index][rowToTransform]}
                                                                className="dataInput"

                                                                onChange={(e) => {
                                                                    var rtd = [...rowTempData];
                                                                    if (typeof rtd[index] !== "undefined") {
                                                                        rtd[index][rowToTransform] = e.target.value
                                                                    }
                                                                    setRowTempData(rtd)

                                                                }}
                                                            />
                                                        </div>
                                                    }
                                                </div>
                                            }
                                        </span>
                                    }
                                </span>
                            )
                        })}



                    </div>
                    {
                        JSON.stringify(rowTempData) !== JSON.stringify(processedData) &&
                        <button className="btn btn-primary btn-blue mx-1 mt-3"
                            onClick={async () => {
                                await setProcessedData(JSON.parse(JSON.stringify(rowTempData)));
                            }}
                        >Apply</button>
                    }
                    <button className="btn btn-primary btn-light mx-1 mt-3"
                        onClick={() => setShowValidationBox(false)}
                    >Cancel</button>
                </div>
            </div>
        </div>
    );
}
