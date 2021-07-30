import React from 'react'

export default function Steps() {
    return (
        <div className="">
            <div className="stepBox row col-12">
                <div className="col-2 step_number">
                    <span className="">1</span>
                </div>
                <div className="col-10">
                    <span className="step_text">
                    Database column name is the name you want your original column name to be mapped to. You can check your uploaded excel file inorder to find the best suitable name e.g firstname, email address etc
                    </span>
                </div>
            </div>
            <div className="stepBox row col-12">
                <div className="col-2 step_number">
                    <span className="">2</span>
                </div>
                <div className="col-10">
                    <span className="step_text">
                    Type format is the criteria to be used while validating your data that has been set e.g name(text), email(aaa.bbb.ccc)
                    </span>
                </div>
            </div>
        </div>
    )
}
