'use client';

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { aiService, ScriptGeneratorPayload, ScriptResponse } from '../../services/aiService';
import Navbar from '../../components/Navbar/Navbar';

import Header from '../../components/tool/script-generator/Header';
import GeneratorForm from '../../components/tool/script-generator/GeneratorForm';
import ResultSection from '../../components/tool/script-generator/ResultSection';

export default function ScriptGeneratorPage() {
    const { user } = useAuth();

    // State quản lý form
    const [url, setUrl] = useState('');
    const [platform, setPlatform] = useState<ScriptGeneratorPayload['platform']>('tiktok');
    const [tone, setTone] = useState<ScriptGeneratorPayload['tone']>('casual');

    // State quản lý kết quả
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<ScriptResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            alert("Please log in to use this feature.");
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const res: any = await aiService.generateScript({ url, platform, tone });
            setResult(res.data || res);
        } catch (err: any) {
            setError(err.message || 'Unable to create a script. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-brand-dark text-white pb-20">
            <Navbar />

            <div className="max-w-4xl mx-auto px-4 pt-10">
                <Header />

                <GeneratorForm
                    url={url} setUrl={setUrl}
                    platform={platform} setPlatform={setPlatform}
                    tone={tone} setTone={setTone}
                    loading={loading}
                    onSubmit={handleGenerate}
                />
                {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-200 rounded-xl mb-8 text-center animate-in fade-in">
                        {error}
                    </div>
                )}
                {result && <ResultSection result={result} />}
            </div>
        </main>
    );
}