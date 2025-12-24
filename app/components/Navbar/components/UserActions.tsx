'use client';

import { useAuth } from '../../../context/AuthContext';
import { useSubscription } from '../../../hooks/useSubscription';
import { authService } from '../../../services/authService';
import { handleGoogleLogin } from '../../../components/auth/Login';

export default function UserActions() {
    const { user } = useAuth();
    const { plan } = useSubscription();

    if (user) {
        return (
            <>
                <div className="hidden md:flex flex-col items-end">
                    <span className="text-sm font-bold text-white">{user.displayName}</span>
                    <span className="text-xs font-medium text-teal-400 bg-teal-400/10 px-2 py-0.5 rounded-full border border-teal-400/20 mt-1">
                        {plan}
                    </span>
                </div>
                {user.photoURL && (
                    <img src={user.photoURL} alt="Avatar" className="w-9 h-9 rounded-full border-2 border-blue-500" />
                )}
                <button onClick={authService.logout} className="text-gray-300 hover:text-white text-sm">
                    Log out
                </button>
            </>
        );
    }

    return (
        <div className="flex items-center gap-4">
            <button
                onClick={handleGoogleLogin}
                className="text-white font-semibold hover:text-blue-300 transition"
            >
                Log in
            </button>

            <button
                onClick={handleGoogleLogin}
                className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-full font-bold shadow-lg shadow-blue-900/50 hover:shadow-blue-600/50 transition transform hover:-translate-y-0.5"
            >
                Sign up
            </button>
        </div>
    );
}