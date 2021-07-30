import React, {useState, useContext} from 'react';

import Navigation from '../components/Navigation';
import Steps from '../components/Steps';
import TransformSection from '../components/TransformSection';
import UploadButton from '../components/UploadButton';
import { topFunctions } from "../providers/TopProvider";


export default function Upload() {
    const {
        fileLoadingStatus,
        fileNameWithoutExtension,
        fileExtension,
        setUploadPage,
        setPageColor
      } = useContext(topFunctions);

  return (
    <div className="row">
        <div className="col-12">
            <Navigation />

            <div className="uploadArea">
                <h3>Upload File</h3>
                <h5>This is a simple upload form that will read your excel file, parse it and allow you to export the data</h5>
                
                <UploadButton/>


                {fileLoadingStatus > 0 &&

                    <div className="uploadStatus progressDiv">
                    <div className="progressTitle">Uploading</div>
                    <div className="uploadName progressBox">
                        <span className="progressBoxTitle">
                            <span className="filename ">{fileNameWithoutExtension}</span>
                            <span className="extension">.{fileExtension}</span>
                        </span>
                    </div>
                    
                    <div className="progressBar"
                        style={{position:"relative"}}
                    >
                        <div className="progressPercent float-right"
                        style={{
                            position:"absolute",
                            right:"0",
                            top:"-30px"
                        }}
                        >
                            {fileLoadingStatus}%
                        </div>
                        <div 
                        style={{width:`${fileLoadingStatus}%`}}
                        className="progressTrack float-right"
                        ></div>
                    </div>
                    </div>

                }

            </div>
        </div>
        
    
    
    </div>
  );
}
