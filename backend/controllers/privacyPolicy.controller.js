const PrivacyPolicy = require('../models/PrivacyPolicy');

const getPrivacyPolicies = async (req, res) => {
  try {
    const policies = await PrivacyPolicy.find().sort({ createdAt: -1 });
    res.json(policies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPrivacyPolicy = async (req, res) => {
  try {
    const { title, content } = req.body;
    const policy = new PrivacyPolicy({ title, content });
    await policy.save();
    res.status(201).json(policy);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updatePrivacyPolicy = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPolicy = await PrivacyPolicy.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedPolicy);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getPrivacyPolicies,
  createPrivacyPolicy,
  updatePrivacyPolicy
};