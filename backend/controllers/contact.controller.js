const Contact = require("../models/Contact");
const Settings = require("../models/Settings");

const sendContactMessage = async (req, res) => {
  try {
    const { email, message } = req.body;

    const contact = new Contact({ email, message });
    await contact.save();

    console.log(`New contact message from ${email}: ${message}`);

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
};

const getContactMessages = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  sendContactMessage,
  getContactMessages,
};
