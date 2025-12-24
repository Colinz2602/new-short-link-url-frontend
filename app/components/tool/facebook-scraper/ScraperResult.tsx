interface ResultProps {
    result: {
        image?: string;
        title?: string;
        description?: string;
        type?: string;
        site_name?: string;
    };
}

export default function ScraperResult({ result }: ResultProps) {
    return (
        <div className="grid gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4 text-blue-300">Result</h3>
                <div className="flex flex-col md:flex-row gap-6">
                    {result.image && (
                        <div className="w-full md:w-1/3">
                            <img src={result.image} alt="OG Image" className="rounded-xl w-full object-cover shadow-lg" />
                        </div>
                    )}
                    <div className="flex-1 space-y-3">
                        <ResultField label="Poster" value={result.title} isTitle />
                        <ResultField label="Caption" value={result.description} />
                        <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-4">
                            <ResultField label="Type" value={result.type || 'N/A'} />
                            <ResultField label="Site Name" value={result.site_name || 'Facebook'} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ResultField({ label, value, isTitle = false }: { label: string; value?: string; isTitle?: boolean }) {
    return (
        <div>
            <span className="text-xs font-bold text-gray-500 uppercase">{label}</span>
            <p className={isTitle ? "text-lg font-medium" : "text-gray-300 text-sm leading-relaxed"}>
                {value}
            </p>
        </div>
    );
}