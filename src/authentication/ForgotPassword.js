import React, { useContext, useEffect } from 'react'
import useInput from "../hooks/useInputs"
import getFirebase from "../firebase/firebase";
import { topFunctions } from "../providers/TopProvider";
import { Link } from 'react-router-dom';


export default function ForgotPassword() {
    const {
        setMessage,
        setPageColor
    } = useContext(topFunctions);

    useEffect(() => {
        setPageColor("greybg")
    }, [])
    const email = useInput("")
    const firebaseInstance = getFirebase();
    const ForgotPassword = async (event) => {
        event.preventDefault();

        try {
            if (firebaseInstance) {
                await firebaseInstance.auth().sendPasswordResetEmail(email.value)
                    .then(() => {
                        var msg = {
                            text: "Reset Message sent to your email.",
                            type: "success"
                        };
                        setMessage(msg);
                    })

            }
        } catch (error) {
            var msg = {
                text: error.message,
                type: "error"
            };
            setMessage(msg);
        }
    };
    return (
        <div className="row fullscreen white">
            <div className="col-4 blue"></div>
            <div className="col-8 white">
                <div className="form1 mt-4 col-6 mx-auto">
                    <h3 className="title">Reset Password</h3>

                    <form onSubmit={(event) => ForgotPassword(event)}>
                        <p className="subtitle">Enter your email address and we will send you instructions to reset your password</p>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1 label">Email Address</label>
                            <input type="text" className="form-control form-control-sm input"
                                id="exampleInputPassword1"
                                name="userEmail"
                                placeholder="Enter email address"
                                {...email}
                            ></input>
                        </div>
                        <button type="submit" className="btn btn-blue btn-block mt-4">Reset Password</button>
                        <div className="sign-up label">
                            Nevermind take me back to <Link to="/login">Sign In</Link>
                        </div>

                    </form>
                </div>
            </div>
        </div>

    )
}
