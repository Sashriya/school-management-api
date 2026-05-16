import SchoolModel from '../models/schoolModel.js';
import { calculateDistance } from '../utils/distanceCalculator.js';

const addSchool = async (req, res) => {
    try {
        const { name, address, latitude, longitude } = req.body;
        
        // Validation
        if (!name || !address || !latitude || !longitude) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required: name, address, latitude, longitude'
            });
        }
        
        const newSchool = await SchoolModel.create({
            name: name.trim(),
            address: address.trim(),
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude)
        });
        
        res.status(201).json({
            success: true,
            message: 'School added successfully',
            data: newSchool
        });
    } catch (error) {
        console.error('Error adding school:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const listSchools = async (req, res) => {
    try {
        const { userLat, userLng } = req;
        
        const schools = await SchoolModel.getAll();
        
        if (schools.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'No schools found',
                data: []
            });
        }
        
        // Calculate distance for each school and sort
        const schoolsWithDistance = schools.map(school => ({
            ...school,
            distance: calculateDistance(
                userLat,
                userLng,
                school.latitude,
                school.longitude
            )
        }));
        
        // Sort by distance (ascending)
        schoolsWithDistance.sort((a, b) => a.distance - b.distance);
        
        res.status(200).json({
            success: true,
            count: schoolsWithDistance.length,
            message: 'Schools retrieved successfully',
            data: schoolsWithDistance,
            user_location: {
                latitude: userLat,
                longitude: userLng
            }
        });
    } catch (error) {
        console.error('Error listing schools:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

export { addSchool, listSchools };