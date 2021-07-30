import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import getFirebase from "../firebase/firebase";
import useInput from "../hooks/useInputs"
import { topFunctions } from "../providers/TopProvider";


export default function Signup() {

    const {
        setMessage,
        setPageColor,
        setCurrentUser
    } = useContext(topFunctions);

    useEffect(() => {
        setPageColor("greybg")
    }, [])


    const email = useInput("")
    const password = useInput("")

    const firebaseInstance = getFirebase();

    const signUp = async (event) => {
        event.preventDefault();

        try {
            if (firebaseInstance) {
                await firebaseInstance.auth().createUserWithEmailAndPassword(email.value, password.value)
                    .then(async () => {
                        await firebaseInstance
                            .auth()
                            .signInWithEmailAndPassword(email.value, password.value)
                            .then(() => {
                                setCurrentUser(email.value);
                                const msg = {
                                    text: `Welcome ${email.value}!`,
                                    type: "success"
                                };
                                setMessage(msg);
                            })

                    })
            }
        } catch (error) {
            var msg = {
                text: "Error Signing up",
                type: "error"
            };
            setMessage(msg);
        }
    };

    return (
        <div className="row fullscreen white">
            <div className="col-4 blue"></div>
            <div className="col-8 white">
                <div className="form1 col-6 mx-auto">
                    <div className="text-left title">Register</div>
                    <p className="subtitle">Map and validate data efficiently</p>
                    <p className="subtitle2">We take privacy issues seriously. You can be sure that your personal data is securely protected.</p>

                    <form onSubmit={signUp}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1" className="label">Email address</label>
                            <input type="email" name="userEmail" className="form-control form-control-sm input" id="exampleInputEmail1" aria-describedby="emailHelp"
                                {...email}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1 label">Password</label>
                            <input type="password" name="userPassword" className="form-control form-control-sm input" id="exampleInputPassword1"
                                {...password}
                            />
                        </div>
                        <button type="submit" className="btn btn-blue mb-3"
                        >Sign Up</button>

                        <div className="form1-footnote">
                            Already using our ETL platform? <Link to="/login">Sign in</Link> to clean up your next data sheet
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}
