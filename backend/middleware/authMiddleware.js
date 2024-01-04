import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

const verifyToken = (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) res.status(401).json("Token is not valid");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated");
  }
};

const mentorProtect = asyncHandler(async (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isMentor) {
      next();
    } else {
      res.status(403);
      throw new Error("You are not allow to do this");
    }
  });
});

const studentProtect = asyncHandler(async (req, res, next) => {
  verifyToken(req, res, () => {
    if (!req.user.isMentor) {
      next();
    } else {
      res.status(403);
      throw new Error("You are not allow to do this");
    }
  });
});

const mentorStudentProtect = asyncHandler(async (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user) {
      next();
    } else {
      res.status(404);
      throw new Error("Please log in first");
    }
  });
});

export { mentorProtect, studentProtect, mentorStudentProtect };
