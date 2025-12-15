import { authService } from "./../../services/authService";

export async function handleGoogleLogin() {
    try {
        await authService.signInWithGoogle();
    } catch (err) {
        console.error(err);
        alert("Đăng nhập thất bại. Vui lòng thử lại.");
    }
}
