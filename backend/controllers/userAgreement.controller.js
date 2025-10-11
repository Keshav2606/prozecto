const UserAgreement = require('../models/UserAgreement');

const getUserAgreements = async (req, res) => {
  try {
    const agreements = await UserAgreement.find().sort({ createdAt: -1 });
    res.json(agreements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUserAgreement = async (req, res) => {
  try {
    const { title, content } = req.body;
    const agreement = new UserAgreement({ title, content });
    await agreement.save();
    res.status(201).json(agreement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUserAgreement = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAgreement = await UserAgreement.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedAgreement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getUserAgreements,
  createUserAgreement,
  updateUserAgreement
};