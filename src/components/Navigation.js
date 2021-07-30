import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import Jsontoexcel from './Jsontoexcel';
import Logout from '../authentication/Logout'

import { topFunctions } from "../providers/TopProvider";


export default function Navigation() {
    const {
        processedTitle,
        TableDataSearched
    } = useContext(topFunctions);

    return (
        <div className="header">
            <div className="logo"></div>
            <div className="navigation col-4 " >
                <Link to="/upload">
                    <span className="thisNav col-4">
                        <span className="iconify" data-icon="bytesize:import" data-inline="false"></span>
                        <span className="text">Import</span>
                    </span>
                </Link>
                <div className="thisNav col-4">
                    <span className="iconify" data-icon="bytesize:export" data-inline="false"></span>
                    {/* <span className="text">Export</span> */}
                    <Jsontoexcel
                    // processedTitle={processedTitle}
                    />
                </div>
                <div className="thisNav col-4">
                    <span className="iconify" data-icon="ant-design:logout-outlined" data-inline="false"></span>
                    <Logout />
                    {/* <span className="text">Signout</span> */}
                </div>
            </div>
        </div>
    )
}
