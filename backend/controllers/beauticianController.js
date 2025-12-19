const Beautician = require('../models/Beautician');

// CREATE
exports.createBeautician = async (req, res) => {
  try {
    const beautician = await Beautician.create(req.body);
    res.status(201).json({ success: true, data: beautician });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// READ ALL
exports.getAllBeauticians = async (req, res) => {
  try {
    const beauticians = await Beautician.find();
    res.status(200).json({ success: true, data: beauticians });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// READ ONE
exports.getBeauticianById = async (req, res) => {
  try {
    const beautician = await Beautician.findById(req.params.id);
    if (!beautician) {
      return res.status(404).json({ success: false, message: 'Beautician not found' });
    }
    res.status(200).json({ success: true, data: beautician });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// UPDATE
exports.updateBeautician = async (req, res) => {
  try {
    const updated = await Beautician.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Beautician not found' });
    }
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE
exports.deleteBeautician = async (req, res) => {
  try {
    const deleted = await Beautician.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Beautician not found' });
    }
    res.status(200).json({ success: true, message: 'Beautician deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
