import React, { useContext, useEffect } from "react";
import getFirebase from "../firebase/firebase";
import { topFunctions } from "../providers/TopProvider";
const SignOutButton = () => {
    const {
        setMessage,
        setCurrentUser,
        setUserDetails,
        setOriginalData,
        setOriginalTitle,
        setPageColor
    } = useContext(topFunctions);


    const firebaseInstance = getFirebase();
    const signOut = async () => {
        try {
            if (firebaseInstance) {
                await firebaseInstance.auth().signOut();

                setCurrentUser("");
                setUserDetails({});
                var msg = {
                    text: "Successfully signed out.",
                    type: "success"
                };
                setMessage(msg);

            }
        } catch (error) {
            console.log("error", error);
            // var msg = {
            //     text:"Error Signing out.",
            //     type:"error"
            // };
            // setMessage(msg);
        }
    };


    return <span className="text"
        onClick={() => signOut()}
    >
        Sign out</span>;
};

export default SignOutButton;