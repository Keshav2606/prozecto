const RefundPolicy = require('../models/RefundPolicy');

const getRefundPolicies = async (req, res) => {
  try {
    const policies = await RefundPolicy.find().sort({ createdAt: -1 });
    res.json(policies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createRefundPolicy = async (req, res) => {
  try {
    const { title, content } = req.body;
    const policy = new RefundPolicy({ title, content });
    await policy.save();
    res.status(201).json(policy);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateRefundPolicy = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPolicy = await RefundPolicy.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedPolicy);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getRefundPolicies,
  createRefundPolicy,
  updateRefundPolicy
};