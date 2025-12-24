'use client';

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar/Navbar';
import { toolService } from '../../services/toolService';
import ScraperHeader from '../../components/tool/facebook-scraper/ScraperHeader';
import ScraperForm from '../../components/tool/facebook-scraper/ScraperForm';
import ScraperResult from '../../components/tool/facebook-scraper/ScraperResult';

export default function FacebookScraperPage() {
    const { user } = useAuth();
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleScrape = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return alert("Please login first");

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const res: any = await toolService.scrapeFacebook(url);
            setResult(res.data);
        } catch (err: any) {
            setError(err.message || "Failed to scrape data");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-brand-dark text-white pb-20">
            <Navbar />

            <div className="max-w-4xl mx-auto px-4 pt-10">
                <ScraperHeader />

                <ScraperForm
                    url={url}
                    setUrl={setUrl}
                    handleScrape={handleScrape}
                    loading={loading}
                />

                {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-200 rounded-xl mb-8 text-center">
                        {error}
                    </div>
                )}

                {result && <ScraperResult result={result} />}
            </div>
        </main>
    );
}