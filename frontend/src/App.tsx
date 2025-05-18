import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { DeviceProvider } from './context/DeviceContext';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import DeviceManager from './pages/DeviceManager';

const App: React.FC = () => {
  return (
    <DeviceProvider>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              IoT Dashboard
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button color="inherit" component={Link} to="/">
                Dashboard
              </Button>
              <Button color="inherit" component={Link} to="/devices">
                Devices
              </Button>
              <Button color="inherit" component={Link} to="/admin">
                Admin
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Container>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/devices" element={<DeviceManager />} />
          </Routes>
        </Container>
      </Router>
    </DeviceProvider>
  );
};

export default App;
