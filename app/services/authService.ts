import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../firebaseConfig";
import axiosClient from "./axiosClient";

export const authService = {
    signInWithGoogle: async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const idToken = await user.getIdToken();

            const res = await axiosClient.post('/api/auth/google', { idToken });

            if (res.data.jwt) {
                console.log('Got Strapi JWT:', res.data.jwt);
                localStorage.setItem('strapi_token', res.data.jwt);
            }

            return { user: res.data.user, token: res.data.jwt };
        } catch (error: any) {
            console.error("Login error:", error.message || error);
            throw error;
        }
    },

    logout: async () => {
        try {
            await signOut(auth);
            localStorage.removeItem('strapi_token');
            window.location.href = '/';
        } catch (error: any) {
            console.error("Logout error:", error.message);
        }
    }
};