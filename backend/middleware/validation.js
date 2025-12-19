const Joi = require('joi');

// Booking validation schema
const bookingSchema = Joi.object({
  customerName: Joi.string().min(2).max(100).required(),
  phone: Joi.string().pattern(/^[0-9+]+$/).min(10).max(15).required(),
  email: Joi.string().email().required(),
  date: Joi.date().iso().greater('now').required(),
  time: Joi.string().pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9] [ap]m$/).required(),
  service: Joi.string().hex().length(24).required(),
  serviceName: Joi.string().min(2).max(100).required(),        // ✅ added
  price: Joi.number().positive().required(),                  // ✅ added
  beautician: Joi.string().hex().length(24).required(),
  beauticianName: Joi.string().min(2).max(100).required(),    // ✅ added
  address: Joi.string().min(10).max(200).required(),
  specialRequests: Joi.string().max(500).optional(),
  homeServiceFee: Joi.number().positive().default(200),       // ✅ added
  totalPrice: Joi.number().positive().required(),             // ✅ added
  status: Joi.string().valid('pending','confirmed','cancelled','completed').default('pending'), // ✅ added
  paymentStatus: Joi.string().valid('pending','paid','failed').default('pending'),              // ✅ added
});

// Service validation schema
const serviceSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  category: Joi.string().valid('MASSAGE', 'NAILS', 'WAXING', 'THREADING').required(),
  description: Joi.string().min(10).max(500).required(),
  price: Joi.number().positive().required(),
  duration: Joi.string().min(2).max(50).required(),
});

const validateBooking = (req, res, next) => {
  const { error } = bookingSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.details.map(detail => detail.message),
    });
  }
  next();
};

const validateService = (req, res, next) => {
  const { error } = serviceSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.details.map(detail => detail.message),
    });
  }
  next();
};

module.exports = { validateBooking, validateService };
