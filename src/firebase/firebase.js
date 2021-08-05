import firebase from "firebase";
import "firebase/auth";
import config from "./config";

// initialize firebase

let instance
export default function getFirebase() {
    if (typeof window !== "undefined") {
        if (instance) return instance
        instance = firebase.initializeApp(config);
        return instance
    }
    return null
}


export const provider = new firebase.auth.GoogleAuthProvider();