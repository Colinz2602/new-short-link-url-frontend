'use client';

import { useGuestShortener } from '../../hooks/useGuestShortener';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Illustration from './components/Illustration';
import InputForm from './components/InputForm';
import LinkHistoryList from './components/LinkHistoryList';

export default function InputSection() {
    const { user } = useAuth();
    const router = useRouter();

    const {
        url, setUrl,
        loading,
        error,
        createdLinks,
        domains,
        selectedDomain, setSelectedDomain,
        handleShorten
    } = useGuestShortener();

    const handleShortenCheck = () => {
        if (user) {
            router.push('/create');
        } else {
            handleShorten();
        }
    };

    return (
        <section className="relative pt-10 pb-20 px-4 overflow-hidden min-h-[600px]">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                <div className="z-10 animate-in slide-in-from-left-10 duration-700">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
                        URL Shortener <br />
                    </h1>

                    <p className="text-gray-400 text-lg mb-8 max-w-lg leading-relaxed">
                        A smart short link platform designed to help you create, manage, and analyze shortened URLs.
                        The system is built to scale into an AI-powered toolkit for creators and marketers —
                        including downloaders, script generators, SEO tools, and more.
                    </p>

                    <InputForm
                        url={url}
                        setUrl={setUrl}
                        domains={domains}
                        selectedDomain={selectedDomain}
                        setSelectedDomain={setSelectedDomain}
                        loading={loading}
                        onSubmit={handleShortenCheck}
                    />

                    {error && (
                        <div className="max-w-xl mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-200 text-sm">
                            ⚠️ {error}
                        </div>
                    )}

                    <LinkHistoryList links={createdLinks} />
                </div>

                <Illustration />
            </div>

            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-teal-600/10 rounded-full blur-[100px]"></div>
            </div>
        </section>
    );
}
