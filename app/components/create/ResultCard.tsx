interface ResultCardProps {
    error: string | null;
    successResult: string | null;
    geoRulesCount: number;
}

export default function ResultCard({ error, successResult, geoRulesCount }: ResultCardProps) {
    if (error) {
        return <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-xl text-center">{error}</div>;
    }

    if (successResult) {
        return (
            <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-xl text-center animate-in fade-in slide-in-from-bottom-4">
                <h3 className="text-green-800 font-bold text-xl mb-2">Link của bạn đã sẵn sàng!</h3>
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <a href={successResult} target="_blank" rel="noreferrer" className="text-blue-600 font-bold text-xl break-all hover:underline">
                        {successResult}
                    </a>
                </div>
            </div>
        );
    }

    return null;
}