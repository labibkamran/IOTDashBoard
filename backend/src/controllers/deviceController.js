const Device = require('../models/Device');

exports.createDeviceData = async (req, res) => {
    try {
        const { deviceId, temperature, humidity } = req.body;
        const deviceData = await Device.create({
            deviceId,
            temperature,
            humidity
        });
        res.status(201).json(deviceData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getLatestData = async (req, res) => {
    try {
        const latestData = await Device.find()
            .sort({ timestamp: -1 })
            .limit(10);
        res.status(200).json(latestData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getDeviceData = async (req, res) => {
    try {
        const { deviceId } = req.params;
        const deviceData = await Device.find({ deviceId })
            .sort({ timestamp: -1 })
            .limit(10);
        res.status(200).json(deviceData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}; 