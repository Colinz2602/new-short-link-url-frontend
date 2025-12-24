import { useState, useEffect } from 'react';
import { toolService, Tool } from '../services/toolService';
import { useAuth } from '../context/AuthContext';

export function useTools() {
    const [tools, setTools] = useState<Tool[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();

    useEffect(() => {
        const fetchTools = async () => {
            try {
                setLoading(true);
                const res: any = await toolService.getTools();
                const toolData = res.data || res;
                const allTools = Array.isArray(toolData) ? toolData : [];

                setTools(allTools);
            } catch (err: any) {
                setError(err.message || 'The list of tools could not be loaded.');
            } finally {
                setLoading(false);
            }
        };

        fetchTools();
    }, [user]);

    return { tools, loading, error };
}