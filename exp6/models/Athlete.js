import mongoose from 'mongoose';

const athleteSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Athlete name is mandatory"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    min: 16,
    max: 90,
    required: true
  },
  biometrics: {
    heightCm: { type: Number, required: true },
    weightKg: { type: Number, required: true },
    bmi: { type: Number, required: true }
  },
  tier: {
    type: String,
    enum: ["Foundation Strength", "Hypertrophy Elite", "Metabolic Conditioning", "Powerlifting Peaking"],
    default: "Foundation Strength"
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Athlete = mongoose.model('Athlete', athleteSchema);
export default Athlete;