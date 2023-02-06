import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import home from "./api/home.route.js";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import ReviewsCtrl from "./api/reviews.controller.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "public/assets"));
  },
  filename: function (req, file, cb) {
    // console.log(file.originalname);
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

app.post(
  "/api/v1/home/review",
  upload.single("picture"),
  ReviewsCtrl.apiPostReview
);

// handle the routes
app.use("/api/v1/home", home);

app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

export default app;
