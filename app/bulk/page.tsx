'use client';

import { useBulkImport } from '../hooks/useBulkImport';
import Navbar from '../components/Navbar/Navbar';
import BulkImportHeader from '../components/bulk/BulkImportHeader';
import BulkImportInstructions from '../components/bulk/BulkImportInstructions';
import BulkImportUpload from '../components/bulk/BulkImportUpload';
import BulkImportResult from '../components/bulk/BulkImportResult';

export default function BulkImportPage() {
    const {
        file, uploading, result, error,
        handleFileChange, handleUpload, reset
    } = useBulkImport();

    const handleRemoveFile = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (reset) reset();
    };

    return (
        <main className="min-h-screen bg-brand-dark text-white relative overflow-hidden pb-20">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-teal-600/10 rounded-full blur-[100px]"></div>
            </div>

            <Navbar />

            <div className="relative z-10 max-w-5xl mx-auto px-4 pt-10">
                <BulkImportHeader />
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <BulkImportInstructions />
                        <BulkImportUpload
                            file={file}
                            uploading={uploading}
                            error={error}
                            handleFileChange={handleFileChange}
                            handleUpload={handleUpload}
                            handleRemoveFile={handleRemoveFile}
                        />
                    </div>
                    {result && (
                        <div className="mt-10 pt-10 border-t border-white/10">
                            <BulkImportResult result={result} />
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}