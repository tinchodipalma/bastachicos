import mongoose from 'mongoose';

const WaitlistUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  lastName: {
    type: String,
    required: [true, 'Please provide a last name'],
  },
  idNumber: {
    type: String,
    required: [true, 'Please provide an ID number'],
  },
  birthDate: {
    type: Date,
    required: [true, 'Please provide a birth date'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
  },
  phone: {
    type: String,
    required: [true, 'Please provide a phone number'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.WaitlistUser || mongoose.model('WaitlistUser', WaitlistUserSchema);
