import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    Chip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

interface Device {
    id: string;
    name: string;
    description: string;
    status: 'active' | 'inactive';
    lastSeen?: string;
}

const DeviceManager: React.FC = () => {
    const [devices, setDevices] = useState<Device[]>(() => {
        const savedDevices = localStorage.getItem('devices');
        return savedDevices ? JSON.parse(savedDevices) : [];
    });
    const [newDevice, setNewDevice] = useState<Omit<Device, 'id'>>({
        name: '',
        description: '',
        status: 'active'
    });
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        localStorage.setItem('devices', JSON.stringify(devices));
    }, [devices]);

    const handleAddDevice = () => {
        const device: Device = {
            ...newDevice,
            id: `DEVICE${Date.now()}`,
            lastSeen: new Date().toISOString()
        };
        setDevices([...devices, device]);
        setNewDevice({ name: '', description: '', status: 'active' });
        setOpenDialog(false);
    };

    const handleDeleteDevice = (id: string) => {
        setDevices(devices.filter(device => device.id !== id));
    };

    const handleStatusChange = (id: string) => {
        setDevices(devices.map(device => 
            device.id === id 
                ? { ...device, status: device.status === 'active' ? 'inactive' : 'active' }
                : device
        ));
    };

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Device Management
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => setOpenDialog(true)}
                >
                    Add New Device
                </Button>
            </Box>
            <Card>
                <CardContent>
                    <List>
                        {devices.map((device) => (
                            <ListItem key={device.id}>
                                <ListItemText
                                    primary={device.name}
                                    secondary={
                                        <>
                                            <Typography component="span" variant="body2">
                                                ID: {device.id}
                                            </Typography>
                                            <br />
                                            <Typography component="span" variant="body2">
                                                {device.description}
                                            </Typography>
                                        </>
                                    }
                                />
                                <ListItemSecondaryAction>
                                    <Chip
                                        label={device.status}
                                        color={device.status === 'active' ? 'success' : 'error'}
                                        onClick={() => handleStatusChange(device.id)}
                                        sx={{ mr: 1 }}
                                    />
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() => handleDeleteDevice(device.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </CardContent>
            </Card>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Add New Device</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
                        <TextField
                            label="Device Name"
                            value={newDevice.name}
                            onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Description"
                            value={newDevice.description}
                            onChange={(e) => setNewDevice({ ...newDevice, description: e.target.value })}
                            fullWidth
                            multiline
                            rows={3}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handleAddDevice} variant="contained" color="primary">
                        Add Device
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DeviceManager; 