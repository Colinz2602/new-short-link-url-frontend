'use client';

import { useParams } from 'next/navigation';
import { useRedirect } from '../../hooks/useRedirect';

export default function RedirectPage() {
    const params = useParams();
    const slug = params?.slug as string;

    const { message, error } = useRedirect(slug);

    if (error) {
        return (
            <main className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
                <h1 className="text-3xl font-bold text-red-600">Error</h1>
                <p className="mt-3 text-xl">{error}</p>
                <a href="/" className="mt-6 text-blue-600 underline">
                    Back to homepage
                </a>
            </main>
        );
    }

    return (
        <main className="flex flex-col items-center justify-center min-h-screen text-center">
            <h1 className="text-3xl font-bold animate-pulse">
                {message}
            </h1>
            <p className="text-gray-500 mt-4">
                Please wait a moment...
            </p>
        </main>
    );
}
