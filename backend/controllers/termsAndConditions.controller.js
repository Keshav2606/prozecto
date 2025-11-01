const TermsAndConditions = require("../models/TermsAndConditions");

const getTermsAndConditions = async (req, res) => {
  try {
    const terms = await TermsAndConditions.find().sort({ createdAt: -1 });
    res.json(terms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTermsAndConditions = async (req, res) => {
  try {
    const { title, content } = req.body;
    const terms = new TermsAndConditions({ title, content });
    await terms.save();
    res.status(201).json(terms);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateTermsAndConditions = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTerms = await TermsAndConditions.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.json(updatedTerms);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getTermsAndConditions,
  createTermsAndConditions,
  updateTermsAndConditions,
};
