import express from 'express';
import Athlete from '../models/Athlete.js';

const router = express.Router();

// 1. CREATE: Register a new athlete (POST /api/athletes)
router.post('/', async (req, res) => {
  try {
    const { fullName, email, phone, age, heightCm, weightKg, tier } = req.body;

    // Server-side BMI calculation
    const heightInM = heightCm / 100;
    const bmi = parseFloat((weightKg / (heightInM * heightInM)).toFixed(1));

    const newAthlete = new Athlete({
      fullName,
      email,
      phone,
      age,
      biometrics: { heightCm, weightKg, bmi },
      tier
    });

    const savedAthlete = await newAthlete.save();
    res.status(201).json({ success: true, data: savedAthlete });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// 2. READ: Fetch all active athletes (GET /api/athletes)
router.get('/', async (req, res) => {
  try {
    const athletes = await Athlete.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: athletes.length, data: athletes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 3. READ: Fetch a single athlete by ID (GET /api/athletes/:id)
router.get('/:id', async (req, res) => {
  try {
    const athlete = await Athlete.findById(req.params.id);
    if (!athlete) {
      return res.status(404).json({ success: false, message: "Athlete not found" });
    }
    res.status(200).json({ success: true, data: athlete });
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid ID format" });
  }
});

// 4. UPDATE: Update biometrics or track (PUT /api/athletes/:id)
router.put('/:id', async (req, res) => {
  try {
    const { weightKg, heightCm, tier, isActive } = req.body;
    const updateData = {};

    if (tier) updateData.tier = tier;
    if (isActive !== undefined) updateData.isActive = isActive;
    
    if (weightKg && heightCm) {
      const heightInM = heightCm / 100;
      updateData["biometrics.weightKg"] = weightKg;
      updateData["biometrics.heightCm"] = heightCm;
      updateData["biometrics.bmi"] = parseFloat((weightKg / (heightInM * heightInM)).toFixed(1));
    }

    const updatedAthlete = await Athlete.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedAthlete) {
      return res.status(404).json({ success: false, message: "Athlete not found" });
    }

    res.status(200).json({ success: true, data: updatedAthlete });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// 5. DELETE: Remove athlete profile (DELETE /api/athletes/:id)
router.delete('/:id', async (req, res) => {
  try {
    const deletedAthlete = await Athlete.findByIdAndDelete(req.params.id);
    if (!deletedAthlete) {
      return res.status(404).json({ success: false, message: "Athlete not found" });
    }
    res.status(200).json({ success: true, message: `Athlete ${deletedAthlete.fullName} deleted successfully.` });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;