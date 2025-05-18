import React, { useState, useEffect } from 'react';
import { useDevice } from '../context/DeviceContext';
import {
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    Snackbar,
    Alert,
    Box,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    SelectChangeEvent
} from '@mui/material';

interface FormData {
    deviceId: string;
    temperature: string;
    humidity: string;
}

interface Device {
    id: string;
    name: string;
    description: string;
    status: 'active' | 'inactive';
    lastSeen?: string;
}

const Admin: React.FC = () => {
    const { addDeviceData } = useDevice();
    const [formData, setFormData] = useState<FormData>(() => {
        const savedData = localStorage.getItem('adminFormData');
        return savedData ? JSON.parse(savedData) : {
            deviceId: '',
            temperature: '',
            humidity: '',
        };
    });
    const [devices, setDevices] = useState<Device[]>([]);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error',
    });

    useEffect(() => {
        const savedDevices = localStorage.getItem('devices');
        if (savedDevices) {
            setDevices(JSON.parse(savedDevices));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('adminFormData', JSON.stringify(formData));
    }, [formData]);

    const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev: FormData) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSelectChange = (e: SelectChangeEvent) => {
        const { name, value } = e.target;
        setFormData((prev: FormData) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addDeviceData({
                deviceId: formData.deviceId,
                temperature: parseFloat(formData.temperature),
                humidity: parseFloat(formData.humidity)
            });
            setFormData({
                deviceId: '',
                temperature: '',
                humidity: '',
            });
            setSnackbar({
                open: true,
                message: 'Device data added successfully!',
                severity: 'success',
            });
        } catch (error) {
            setSnackbar({
                open: true,
                message: 'Error adding device data',
                severity: 'error',
            });
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Admin Panel
            </Typography>
            <Card>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel>Device</InputLabel>
                                <Select
                                    value={formData.deviceId}
                                    label="Device"
                                    name="deviceId"
                                    onChange={handleSelectChange}
                                    required
                                >
                                    {devices.map((device) => (
                                        <MenuItem key={device.id} value={device.id}>
                                            {device.name} ({device.id})
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
                                <TextField
                                    fullWidth
                                    label="Temperature (°C)"
                                    name="temperature"
                                    type="number"
                                    value={formData.temperature}
                                    onChange={handleTextFieldChange}
                                    required
                                />
                                <TextField
                                    fullWidth
                                    label="Humidity (%)"
                                    name="humidity"
                                    type="number"
                                    value={formData.humidity}
                                    onChange={handleTextFieldChange}
                                    required
                                />
                            </Box>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                            >
                                Add Device Data
                            </Button>
                        </Box>
                    </form>
                </CardContent>
            </Card>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Admin;