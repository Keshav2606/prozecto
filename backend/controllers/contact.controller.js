const Contact = require("../models/Contact");
const Settings = require("../models/Settings");
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendContactMessage = async (req, res) => {
  try {
    const { email, message } = req.body;

    // Save to database
    const contact = new Contact({ email, message });
    await contact.save();

    // Send email
    const mailOptions = {
      from: email,
      to: process.env.RECEIVER_EMAIL || 'prozecto90@gmail.com',
      subject: 'New Contact Form Message - Prozecto',
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>From:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><em>This message was sent from the Prozecto contact form.</em></p>
      `
    };
    
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to prozecto90@gmail.com from ${email}`);

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
