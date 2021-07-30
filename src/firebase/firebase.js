import firebase from "firebase";

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

