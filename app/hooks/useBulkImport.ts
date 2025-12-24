import { useState } from 'react';
import { linkService } from '../services/linkService';

export function useBulkImport() {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setError(null);
            setResult(null);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);
        setError(null);
        setResult(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response: any = await linkService.bulkImport(formData);
            const realResult = response.data || response;
            setResult(realResult);
        } catch (err: any) {
            setError(err.message || 'Lỗi upload file.');
        } finally {
            setUploading(false);
        }
    };
    const reset = () => {
        setFile(null);
        setResult(null);
        setError(null);
    };
    return {
        file,
        uploading,
        result,
        error,
        handleFileChange,
        handleUpload,
        reset
    };
}