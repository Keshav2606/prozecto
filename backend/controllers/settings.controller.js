const Settings = require('../models/Settings');

const getSettings = async (req, res) => {
  try {
    const settings = await Settings.find();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSettings = async (req, res) => {
  try {
    const { email, phone, phoneVisible, socialMedia } = req.body;
    
    let settings = await Settings.findOne();
    
    if (!settings) {
      settings = new Settings({ 
        email: email || '', 
        phone: phone || '', 
        phoneVisible: phoneVisible || false, 
        socialMedia: socialMedia || [] 
      });
    } else {
      if (email !== undefined) settings.email = email;
      if (phone !== undefined) settings.phone = phone;
      if (phoneVisible !== undefined) settings.phoneVisible = phoneVisible;
      if (socialMedia !== undefined) settings.socialMedia = socialMedia;
    }
    
    const savedSettings = await settings.save();
    res.json(savedSettings);
  } catch (error) {
    console.error('Settings update error:', error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getSettings,
  updateSettings
};