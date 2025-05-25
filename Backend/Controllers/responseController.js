const Response = require('../models/Response');

exports.submitResponse = async (req, res) => {
  try {
    const { answers } = req.body;

    const newResponse = new Response({ answers });
    await newResponse.save();

    res.status(201).json({ message: 'Response saved successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save response', error: error.message });
  }
};

exports.getAllResponses = async (req, res) => {
  try {
    const responses = await Response.find().sort({ createdAt: -1 });
    res.json(responses);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch responses', error: error.message });
  }
};
