export const apiKeyAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const VALID_KEY = "Bearer apexfit-secret-key-2026";

  if (!authHeader || authHeader !== VALID_KEY) {
    return res.status(401).json({
      success: false,
      error: "Unauthorized: Invalid or missing Bearer token in Authorization header."
    });
  }
  next();
};
