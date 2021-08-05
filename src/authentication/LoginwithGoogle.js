import React from 'react';
import getFirebase, { provider } from "../firebase/firebase";


export default function LoginwithGoogle() {

    const firebase = getFirebase()


    // const auth = firebase.auth();
    // const googleProvider = new firebase.auth.GoogleAuthProvider()

    const signInWithGoogle = () => {
        firebase.auth().signInWithPopup(provider).then((res) => {
            console.log(res.user)
        }).catch((error) => {
            console.log(error.message)
        })
    };


    // const googleSignin = () => {
    //     getFirebase.auth()
    //         .signInWithPopup(provider).then(function (result) {
    //             var token = result.credential.accessToken;
    //             var user = result.user;

    //             console.log(token)
    //             console.log(user)
    //         }).catch(function (error) {
    //             var errorCode = error.code;
    //             var errorMessage = error.message;

    //             console.log(error.code)
    //             console.log(error.message)
    //         });
    // }
    return (
        <>
            <div className="btn btn-white"
                onClick={() => signInWithGoogle()}
            >
                <div class="iconify" data-icon="logos:google-icon"></div>
                <div className="text">Continue with Google</div>
            </div>
        </>
    );
}
