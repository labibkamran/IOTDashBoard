import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface DeviceData {
    deviceId: string;
    temperature: number;
    humidity: number;
    timestamp: string;
}

interface DeviceContextType {
    deviceData: DeviceData[];
    loading: boolean;
    error: string | null;
    addDeviceData: (data: { deviceId: string; temperature: number; humidity: number }) => Promise<void>;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export const DeviceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [deviceData, setDeviceData] = useState<DeviceData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/data/latest');
            setDeviceData(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch device data');
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };

    const addDeviceData = async (data: { deviceId: string; temperature: number; humidity: number }) => {
        try {
            const response = await axios.post('http://localhost:5000/api/data', {
                ...data,
                timestamp: new Date().toISOString()
            });
            setDeviceData(prevData => [...prevData, response.data]);
            setError(null);
        } catch (err) {
            setError('Failed to add device data');
            console.error('Error adding data:', err);
            throw err;
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <DeviceContext.Provider value={{ deviceData, loading, error, addDeviceData }}>
            {children}
        </DeviceContext.Provider>
    );
};

export const useDevice = () => {
    const context = useContext(DeviceContext);
    if (context === undefined) {
        throw new Error('useDevice must be used within a DeviceProvider');
    }
    return context;
}; 