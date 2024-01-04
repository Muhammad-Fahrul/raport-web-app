import path from "path";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mentorRoute from "./routes/mentorRoute.js";
import studentRoute from "./routes/studentRoute.js";
import userRoute from "./routes/userRoute.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const port = 5000;

connectDB();

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/mentors", mentorRoute);
app.use("/api/students", studentRoute);
app.use("/api/users", userRoute);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/staticsite")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "frontend", "staticsite", "index.html")
    );
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
