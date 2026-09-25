let equipmentInventory = [
  { id: 1, name: "Olympic Power Rack #1", category: "Free Weights", condition: "Excellent", maxCapacityKg: 450, isAvailable: true },
  { id: 2, name: "Commercial Leg Press 45°", category: "Machines", condition: "Good", maxCapacityKg: 600, isAvailable: true },
  { id: 3, name: "AirBike Pro Cardio", category: "Cardio", condition: "Needs Service", maxCapacityKg: 150, isAvailable: false },
  { id: 4, name: "Competition Bench Press", category: "Free Weights", condition: "Excellent", maxCapacityKg: 350, isAvailable: true }
];

// GET: All equipment (with optional ?category= filter)
export const getAllEquipment = (req, res) => {
  const { category } = req.query;
  let results = equipmentInventory;

  if (category) {
    results = results.filter(item => item.category.toLowerCase() === category.toLowerCase());
  }

  res.status(200).json({
    success: true,
    count: results.length,
    data: results
  });
};

// GET: Single equipment by ID
export const getEquipmentById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = equipmentInventory.find(e => e.id === id);

  if (!item) {
    return res.status(404).json({ success: false, error: `Equipment with ID ${id} not found.` });
  }

  res.status(200).json({ success: true, data: item });
};

// POST: Add new equipment
export const createEquipment = (req, res) => {
  const { name, category, condition, maxCapacityKg, isAvailable } = req.body;

  if (!name || !category || !maxCapacityKg) {
    return res.status(400).json({
      success: false,
      error: "Missing required fields: 'name', 'category', and 'maxCapacityKg' are mandatory."
    });
  }

  const newId = equipmentInventory.length > 0 ? Math.max(...equipmentInventory.map(e => e.id)) + 1 : 1;
  const newItem = {
    id: newId,
    name,
    category,
    condition: condition || "Excellent",
    maxCapacityKg: Number(maxCapacityKg),
    isAvailable: isAvailable !== undefined ? Boolean(isAvailable) : true
  };

  equipmentInventory.push(newItem);
  res.status(201).json({ success: true, message: "Equipment registered successfully.", data: newItem });
};

// PUT: Update equipment by ID
export const updateEquipment = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = equipmentInventory.findIndex(e => e.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, error: `Equipment with ID ${id} not found.` });
  }

  const { name, category, condition, maxCapacityKg, isAvailable } = req.body;

  equipmentInventory[index] = {
    ...equipmentInventory[index],
    ...(name && { name }),
    ...(category && { category }),
    ...(condition && { condition }),
    ...(maxCapacityKg && { maxCapacityKg: Number(maxCapacityKg) }),
    ...(isAvailable !== undefined && { isAvailable: Boolean(isAvailable) })
  };

  res.status(200).json({
    success: true,
    message: `Equipment ID ${id} updated successfully.`,
    data: equipmentInventory[index]
  });
};

// DELETE: Remove equipment by ID
export const deleteEquipment = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = equipmentInventory.find(e => e.id === id);

  if (!item) {
    return res.status(404).json({ success: false, error: `Equipment with ID ${id} not found.` });
  }

  equipmentInventory = equipmentInventory.filter(e => e.id !== id);

  res.status(200).json({
    success: true,
    message: `Equipment '${item.name}' (ID: ${id}) decommissioned and removed.`
  });
};
