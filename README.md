# IoT Dashboard with MERN Stack

A real-time IoT dashboard application built using the MERN stack (MongoDB, Express.js, React, Node.js) that allows monitoring and managing IoT devices and their sensor data.

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/labibkamran/IOTDashBoard.git)

## Features

- **Real-time Device Monitoring**
  - Live temperature and humidity data visualization
  - Individual device cards with current readings
  - Historical data trends with charts
  - Auto-refresh every 5 seconds

- **Device Management**
  - Add, edit, and delete IoT devices
  - Device status tracking (active/inactive)
  - Device descriptions and metadata
  - Last seen timestamps

- **Admin Panel**
  - Submit sensor data for devices
  - Select from registered devices
  - Input temperature and humidity readings
  - Form validation and error handling

- **Responsive Design**
  - Material-UI components
  - Mobile-friendly interface
  - Clean and modern UI

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn package manager

## Project Structure

```
project/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js         # MongoDB connection configuration
│   │   ├── models/
│   │   │   └── deviceData.js # Device data schema
│   │   ├── routes/
│   │   │   └── deviceRoutes.js # API routes
│   │   └── server.js         # Express server setup
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   │   └── DeviceContext.tsx
    │   ├── pages/
    │   │   ├── Admin.tsx
    │   │   ├── Dashboard.tsx
    │   │   └── DeviceManager.tsx
    │   └── App.tsx
    └── package.json
```

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/labibkamran/IOTDashBoard.git
   cd IOTDashBoard
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

   The backend is configured to use MongoDB Atlas. The connection string is already set up in `backend/src/config/db.js`. If you need to use a different MongoDB instance:
   - Open `backend/src/config/db.js`
   - Replace the connection string with your MongoDB URI
   - Make sure to whitelist your IP address in MongoDB Atlas

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

## Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm start
   ```
   The backend server will run on http://localhost:5000

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm start
   ```
   The frontend application will run on http://localhost:3000

## Using the Application

1. **Device Management**
   - Navigate to the Devices page
   - Add new devices with names and descriptions
   - Monitor device status
   - Edit or delete devices as needed

2. **Data Submission**
   - Go to the Admin page
   - Select a device from the dropdown
   - Enter temperature and humidity readings
   - Submit the data

3. **Dashboard View**
   - View real-time data on the main dashboard
   - Monitor individual device readings
   - Track historical trends
   - Filter devices by status

## API Endpoints

- `GET /api/devices` - Get all device data
- `POST /api/devices` - Add new device data
- `GET /api/devices/:deviceId` - Get data for a specific device

## Technologies Used

- **Frontend**
  - React with TypeScript
  - Material-UI for components
  - Chart.js for data visualization
  - React Router for navigation

- **Backend**
  - Node.js with Express
  - MongoDB with Mongoose
  - RESTful API architecture

## Database Configuration

The project uses MongoDB Atlas for the database. The connection is configured in `backend/src/config/db.js`. The current setup includes:
- MongoDB Atlas connection string
- Connection options for optimal performance
- Error handling for connection issues

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the [GitHub repository](https://github.com/labibkamran/IOTDashBoard.git) or contact the maintainers. 