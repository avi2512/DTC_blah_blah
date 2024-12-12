import { useState, useCallback } from 'react';

export const useApi = (apiFunc) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const execute = useCallback(async (...args) => {
        try {
            setLoading(true);
            setError(null);
            const response = await apiFunc(...args);
            setData(response.data);
            return response.data;
        } catch (error) {
            setError(error.message || 'An error occurred');
            throw error;
        } finally {
            setLoading(false);
        }
    }, [apiFunc]);

    return {
        data,
        error,
        loading,
        execute
    };
}; 