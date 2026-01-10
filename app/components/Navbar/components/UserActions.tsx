'use client';

import { useAuth } from '../../../context/AuthContext';
import { useSubscription } from '../../../hooks/useSubscription';
import { authService } from '../../../services/authService';
import { handleGoogleLogin } from '../../../components/auth/Login';
import { useEffect, useState } from 'react';

export default function UserActions() {
    const { user } = useAuth();
    const { plan, startDate, endDate } = useSubscription();
    const [, forceUpdate] = useState(0);

    useEffect(() => {
        const i = setInterval(() => forceUpdate(v => v + 1), 60000);
        return () => clearInterval(i);
    }, []);

    const formatDate = (dateString: string | null) => {
        if (!dateString) return '';

        const date = new Date(dateString);
        if (isNaN(date.getTime())) return '';

        return date.toLocaleString('en-EN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getProgressWidth = (start: string, end: string) => {
        const startTime = new Date(start).getTime();
        const endTime = new Date(end).getTime();
        const now = Date.now();

        if (now <= startTime) return '0%';
        if (now >= endTime) return '100%';

        return `${((now - startTime) / (endTime - startTime)) * 100}%`;
    };
    if (user) {
        return (
            <>
                <div className="hidden md:flex flex-col items-end">
                    <span className="text-sm font-bold text-white">{user.displayName}</span>
                    <span className="text-xs font-medium text-teal-400 bg-teal-400/10 px-2 py-0.5 rounded-full border border-teal-400/20 mt-1">
                        {plan}
                    </span>
                    {startDate && endDate && plan !== 'Free Member' && (
                        <div className="mt-1 w-full max-w-[220px] space-y-1">
                            <span className="block text-[9px] text-gray-400 text-right">
                                {formatDate(startDate)} - {formatDate(endDate)}
                            </span>

                            <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-blue-500 transition-all duration-500"
                                    style={{
                                        width: getProgressWidth(startDate, endDate),
                                    }}
                                />
                            </div>
                        </div>
                    )}

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