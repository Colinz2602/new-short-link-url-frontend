import { FileText, Upload, Loader2, AlertCircle, Trash2 } from 'lucide-react';

interface BulkImportUploadProps {
    file: File | null;
    uploading: boolean;
    error: string | null;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleUpload: () => void;
    handleRemoveFile: (e: React.MouseEvent) => void;
}

export default function BulkImportUpload({
    file,
    uploading,
    error,
    handleFileChange,
    handleUpload,
    handleRemoveFile
}: BulkImportUploadProps) {
    return (
        <div className="lg:col-span-2 flex flex-col justify-center">
            {/* File Area */}
            <div className={`
                relative border-2 border-dashed rounded-2xl p-10 transition-all text-center
                ${file ? 'border-teal-500/50 bg-teal-500/5' : 'border-gray-700 hover:border-blue-500/50 bg-gray-900/30'}
            `}>
                {file && !uploading && (
                    <button
                        onClick={handleRemoveFile}
                        className="absolute top-3 right-3 z-30 p-2 bg-gray-800/80 hover:bg-red-500/20 text-gray-400 hover:text-red-400 rounded-full transition-all border border-white/5 backdrop-blur-sm"
                        title="Remove file and select another"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                )}

                <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    onClick={(e) => (e.currentTarget.value = '')}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                    disabled={uploading}
                />

                <div className="space-y-4">
                    <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${file ? 'bg-teal-500 text-white' : 'bg-gray-800 text-gray-400'}`}>
                        {file ? <FileText className="w-8 h-8" /> : <Upload className="w-8 h-8" />}
                    </div>
                    <div>
                        <p className="text-lg font-bold">
                            {file ? file.name : 'Click or drag a CSV file here'}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                            {file ? `${(file.size / 1024).toFixed(2)} KB` : 'Maximum file size: 5MB'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Import Button */}
            <button
                onClick={handleUpload}
                disabled={uploading || !file}
                className={`
                    mt-6 w-full py-4 rounded-xl font-bold text-xl text-white shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-3
                    ${uploading || !file
                        ? 'bg-gray-700 cursor-not-allowed opacity-50'
                        : 'bg-linear-to-r from-blue-600 via-teal-500 to-emerald-500 hover:shadow-teal-500/30'
                    }
                `}
            >
                {uploading ? (
                    <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        Uploading...
                    </>
                ) : (
                    'Start Import'
                )}
            </button>

            {/* Error Message */}
            {error && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 text-red-200 rounded-xl flex items-center justify-center gap-2 animate-in fade-in">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
}
