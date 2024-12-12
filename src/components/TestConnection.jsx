import React, { useEffect, useState } from 'react';
import api from '../services/api';

const TestConnection = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/routes');
                console.log('Data from backend:', response.data);
                setData(response.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to fetch data from backend');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Test Connection</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default TestConnection; 