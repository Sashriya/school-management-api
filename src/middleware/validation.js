import Joi from 'joi';

const validateSchool = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(255).required().messages({
            'string.empty': 'School name is required',
            'string.min': 'School name must be at least 2 characters long'
        }),
        address: Joi.string().min(5).max(500).required().messages({
            'string.empty': 'Address is required',
            'string.min': 'Address must be at least 5 characters long'
        }),
        latitude: Joi.number().min(-90).max(90).required().messages({
            'number.base': 'Latitude must be a number',
            'number.min': 'Latitude must be between -90 and 90',
            'number.max': 'Latitude must be between -90 and 90'
        }),
        longitude: Joi.number().min(-180).max(180).required().messages({
            'number.base': 'Longitude must be a number',
            'number.min': 'Longitude must be between -180 and 180',
            'number.max': 'Longitude must be between -180 and 180'
        })
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }
    next();
};

const validateCoordinates = (req, res, next) => {
    const { latitude, longitude } = req.query;
    
    if (!latitude || !longitude) {
        return res.status(400).json({
            success: false,
            message: 'Latitude and longitude are required query parameters'
        });
    }

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (isNaN(lat) || lat < -90 || lat > 90) {
        return res.status(400).json({
            success: false,
            message: 'Invalid latitude. Must be between -90 and 90'
        });
    }

    if (isNaN(lng) || lng < -180 || lng > 180) {
        return res.status(400).json({
            success: false,
            message: 'Invalid longitude. Must be between -180 and 180'
        });
    }

    req.userLat = lat;
    req.userLng = lng;
    next();
};

export { validateSchool, validateCoordinates };