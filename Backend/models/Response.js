const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['NGOs', 'Scientific & activist groups', 'Funding & grants', 'Educational tools & learning resources']
  },
  description: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('resource', ResourceSchema);
