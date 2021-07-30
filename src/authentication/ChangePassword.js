import React from 'react'

export default function ChangePassword() {
    return (
        <div className="greybg">
            <div className="form1 mt-4 card-text">
                <h3 className="text-center mt-4">Change Password</h3>
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    Incorrect username or password.
                </div>
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Old Password</label>
                        <input type="password" className="form-control form-control-sm" id="exampleInputPassword1" ></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">New Password</label>
                        <input type="password" className="form-control form-control-sm" id="exampleInputPassword1" ></input>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block mb-3">Change Password</button>

                </form>
            </div>
        </div>

    )
}
