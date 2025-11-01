const QuoteRequest = require("../models/QuoteRequest");

const getQuoteRequests = async (req, res) => {
  try {
    const requests = await QuoteRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createQuoteRequest = async (req, res) => {
  try {
    const { fullName, email, phone, service, projectDetails } = req.body;
    const request = new QuoteRequest({
      fullName,
      email,
      phone,
      service,
      projectDetails,
    });
    await request.save();
    res.status(201).json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getQuoteRequests,
  createQuoteRequest,
};
