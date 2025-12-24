import { Info } from 'lucide-react';

export default function BulkImportInstructions() {
    return (
        <div className="lg:col-span-1 space-y-6">
            <div className="bg-blue-500/10 border border-blue-500/20 p-5 rounded-2xl">
                <h3 className="flex items-center gap-2 text-blue-300 font-bold mb-3">
                    <Info className="w-5 h-5" /> File Guidelines
                </h3>
                <ul className="text-sm text-gray-300 space-y-3">
                    <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                        <span>Required file format: <b>.csv</b></span>
                    </li>
                    <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                        <span>Required column: <code>original_url</code></span>
                    </li>
                    <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                        <span>
                            Optional column: <code>domain</code>. If empty, the default domain(5ea) will be used.
                        </span>
                    </li>
                    <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                        <span>
                            Optional column: <code>custom_slug</code> (custom short URL)
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
