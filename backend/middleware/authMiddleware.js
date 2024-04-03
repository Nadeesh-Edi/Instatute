import jwt from "jsonwebtoken";

const roles = {
  staff: 1,
  student: 2,
};

function verifyToken(req, res, next) {
  const token = req.header("Authorization");
  const jwtSecretKey = process.env.JWT_SECRET_KEY;

  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, jwtSecretKey);
    req.user_type = decoded.user_type;
    next();
  } catch (error) {
    res.status(401).json({ error: "Access denied" });
  }
}

// Verify token for staff members
function verifyTokenForStaff(req, res, next) {
  const token = req.header("Authorization");
  const jwtSecretKey = process.env.JWT_SECRET_KEY;

  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, jwtSecretKey);
    req.user_type = decoded.user_type;
    req.user_id = decoded._id;

    decoded.user_type == roles.staff
      ? next()
      : res.status(401).json({ error: "Access denied" });
    //   next();
  } catch (error) {
    res.status(401).json({ error: "Access denied" });
  }
}

// Verify token for staff members
function verifyTokenForStudent(req, res, next) {
    const token = req.header("Authorization");
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
  
    if (!token) return res.status(401).json({ error: "Access denied" });
    try {
      const decoded = jwt.verify(token, jwtSecretKey);
      req.user_type = decoded.user_type;
      req.user_id = decoded._id;
  
      decoded.user_type == roles.student
        ? next()
        : res.status(401).json({ error: "Access denied" });
      //   next();
    } catch (error) {
      res.status(401).json({ error: "Access denied" });
    }
  }

export { verifyToken, verifyTokenForStaff, verifyTokenForStudent };
