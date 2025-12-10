import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAZvkdhq6r4cZSgI8b8pgImPzxBq3EwLHs",
    authDomain: "my-app-auth-6144c.firebaseapp.com",
    projectId: "my-app-auth-6144c",
    storageBucket: "my-app-auth-6144c.firebasestorage.app",
    messagingSenderId: "758535600889",
    appId: "1:758535600889:web:3f8f16fe25c67154b58028",
    measurementId: "G-GJVPS1FRGL"
};

// ✅ Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// ✅ Khởi tạo Auth và Provider
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
