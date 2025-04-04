// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCZdpLXcL1H05twIU5MkHkRgXk4t1uQArg",
    authDomain: "femcartel-1fbb9.firebaseapp.com",
    projectId: "femcartel-1fbb9",
    storageBucket: "femcartel-1fbb9.appspot.com",
    messagingSenderId: "934284665838",
    appId: "1:934284665838:web:647ee6882a4f8792a8e4ff",
    measurementId: "G-HGYCGHPPD8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Function to sign in with Google
export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const token = await result.user.getIdToken(); // Get Firebase ID token
        console.log("✅ Google Auth Token:", token);
        return { token, user: result.user };
    } catch (error) {
        console.error("❌ Google Login Error:", error.message);
        throw error;
    }
};
