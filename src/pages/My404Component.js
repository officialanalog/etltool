import React from 'react';

import { Link } from 'react-router-dom';
export default function My404Component() {
    return (
        <div className="My404page">
            <div className="page_inner">
                <div className="My404_image"></div>
                <div className="My404_title"
                >Oops</div>
                <div className="My404_subtitle">Page not found</div>
                <Link to="/"><button className="btn btn-blue">Go back</button></Link>
            </div>
        </div>
    );
}
