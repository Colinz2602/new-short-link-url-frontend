import { authService } from "./../../services/authService";

export async function handleGoogleLogin() {
    try {
        await authService.signInWithGoogle();
    } catch (err) {
        console.error(err);
        alert("Login failed. Please try again.");
    }
}
