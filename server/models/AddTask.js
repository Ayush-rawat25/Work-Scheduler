const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  summary: {
    type: String,
    required: true 
  },
  description: {
    type: String
  },
  start: {
    type: Date,
    required: true 
  },
  end: {
    type: Date,
    required: true 
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'], 
    default: 'medium'
  },
  googleEventId: {
    type: String 
  }
}, { timestamps: true });

module.exports = mongoose.model('AddTask', taskSchema);