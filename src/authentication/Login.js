import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import getFirebase from "../firebase/firebase";
import useInput from "../hooks/useInputs"
import { topFunctions } from "../providers/TopProvider";
import LoginwithGoogle from './LoginwithGoogle';

export default function Login() {

    const {
        setMessage,
        setCurrentUser,
        setPageColor
    } = useContext(topFunctions);

    useEffect(() => {
        setPageColor("greybg")
    }, [])

    const email = useInput("")
    const password = useInput("")

    const firebaseInstance = getFirebase();
    const signIn = async (event) => {
        event.preventDefault();

        try {
            if (firebaseInstance) {
                await firebaseInstance
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value)
                    .then(() => {
                        setCurrentUser(email.value);
                        var msg = {
                            text: "User Logged In Successfully",
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
        <div className="row fullscreen">
            <div className="col-4 side">
                <div className="side-body">
                    <h3>
                        A few clicks away from cleaning up your data.
                    </h3>
                    <div className="side-illustration"></div>
                </div>
                <div className="side-bg"></div>
                <div className="side-blue">
                </div>
            </div>
            <div className="col-8 white">
                <div className="form1 mt-4 col-6 mx-auto">
                    <h3 className="title">Login</h3>
                    <p className="subtitle">Ready to transform new data?</p>
                    <form onSubmit={signIn}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1"
                                className="label"
                            >Email address</label>
                            <input type="email" name="userEmail" className="input form-control form-control-sm" id="exampleInputEmail1" aria-describedby="emailHelp"
                                {...email}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1 label">Password</label>
                            <Link to="/forgot"
                                className="sub-button"
                            >Forgot password?</Link>
                            <input type="password" name="userPassword" className="input form-control form-control-sm" id="exampleInputPassword1"
                                {...password}
                            />
                        </div>
                        <button type="submit" className="btn btn-blue btn-block mb-3"
                        >Sign in</button>

                        <LoginwithGoogle />

                        <div className="form1-footnote">
                            New User on our ETL platform? <Link to="/signup">Sign Up</Link> to clean up your next data sheet.
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}
