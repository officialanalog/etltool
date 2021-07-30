import React from 'react';

import Navigation from '../components/Navigation';
import SheetTable from '../components/SheetTable';
import Steps from '../components/Steps';
import TransformSection from '../components/TransformSection';
export default function Sheet() {
    return (
        <div className="">
            <div className="col-12">
                <Navigation />
            </div>
            <SheetTable />
        </div>
    );
}
