import React from "react";
import getFirebase from "../firebase/firebase";

const SignOutButton = () => {
    const firebaseInstance = getFirebase();
    const signOut = async () => {
        try {
            if (firebaseInstance) {
            await firebaseInstance.auth().signOut();
            alert("Successfully signed out!");
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    const signOut = () => {

    }
    return <button className="btn btn-primary"
    onClick={() => signOut()}
    >Sign out</button>;
};

export default SignOutButton;