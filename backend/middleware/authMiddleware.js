import jwt from "jsonwebtoken";
import Student from "../models/studentModel.js";

const verifyToken = (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(403);
      throw new Error("you are not allowed to do this");
    }
  } else {
    res.status(401);
    throw new Error("You are not authenticated");
  }
};

const mentorProtect = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isMentor) {
      next();
    }
  });
};

const studentProtect = (req, res, next) => {
  verifyToken(req, res, () => {
    if (!req.user.isMentor) {
      next();
    }
  });
};

const mentorStudentProtect = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user) {
      next();
    }
  });
};

export { mentorProtect, studentProtect, mentorStudentProtect };
