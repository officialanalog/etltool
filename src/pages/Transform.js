import React from 'react';

import Navigation from '../components/Navigation';
import Steps from '../components/Steps';
import TransformSection from '../components/TransformSection';




export default function Transform() {

    

  return (
    <div className="">
        <div className="">
            <Navigation />
        </div>
        <div className="row col-12">
            <div className="steps col-4 row">
                <Steps />
            </div>
            <div className="steps col-8 row">
                <TransformSection />
            </div>
        </div>
    </div>
  );
}
