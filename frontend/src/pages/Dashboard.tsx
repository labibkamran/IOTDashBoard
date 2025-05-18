import React, { useState } from 'react';
import { useDevice } from '../context/DeviceContext';
import { Card, CardContent, Typography, CircularProgress, Box, TextField, MenuItem } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Dashboard: React.FC = () => {
    const { deviceData, loading, error } = useDevice();
    const [selectedDevice, setSelectedDevice] = useState<string>('all');

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography color="error">{error}</Typography>
            </div>
        );
    }

    const uniqueDevices = Array.from(new Set(deviceData.map(device => device.deviceId)));
    const filteredData = selectedDevice === 'all' 
        ? deviceData 
        : deviceData.filter(device => device.deviceId === selectedDevice);

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                IoT Device Dashboard
            </Typography>
            <Box sx={{ mb: 3 }}>
                <TextField
                    select
                    label="Select Device"
                    value={selectedDevice}
                    onChange={(e) => setSelectedDevice(e.target.value)}
                    fullWidth
                    sx={{ maxWidth: 300 }}
                >
                    <MenuItem value="all">All Devices</MenuItem>
                    {uniqueDevices.map((deviceId) => (
                        <MenuItem key={deviceId} value={deviceId}>
                            {deviceId}
                        </MenuItem>
                    ))}
                </TextField>
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 3 }}>
                {filteredData.map((device) => (
                    <Card key={device.deviceId}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Device ID: {device.deviceId}
                            </Typography>
                            <Typography variant="body1">
                                Temperature: {device.temperature}°C
                            </Typography>
                            <Typography variant="body1">
                                Humidity: {device.humidity}%
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Last Updated: {new Date(device.timestamp).toLocaleString()}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
            <Card style={{ marginTop: '20px' }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Temperature & Humidity Trends
                    </Typography>
                    <LineChart
                        width={800}
                        height={400}
                        data={filteredData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="timestamp" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="temperature"
                            stroke="#8884d8"
                            name="Temperature (°C)"
                        />
                        <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="humidity"
                            stroke="#82ca9d"
                            name="Humidity (%)"
                        />
                    </LineChart>
                </CardContent>
            </Card>
        </div>
    );
};

export default Dashboard; 