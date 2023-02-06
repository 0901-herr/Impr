import express from "express";
import SectionsCtrl from "./sections.controller.js";
import ReviewsCtrl from "./reviews.controller.js";
import multer from "multer";

const router = express.Router();

// router.route("/").get((req, res) => res.send("hello world"));

router.route("/").get(SectionsCtrl.apiGetSections);
router.route("/sections/id/:id").get(SectionsCtrl.apiGetSectionById);

/* FILE STORAGE */
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/assets");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage });

router
  .route("/sections")
  .get(SectionsCtrl.apiGetSections)
  .post(SectionsCtrl.apiPostSection)
  .put(SectionsCtrl.apiUpdateSection)
  .delete(SectionsCtrl.apiDeleteSection);

router
  .route("/review")
  .get(ReviewsCtrl.apiGetReviews)
  // .post(upload.single("picture"), ReviewsCtrl.apiPostReview)
  .put(ReviewsCtrl.apiUpdateReview)
  .delete(ReviewsCtrl.apiDeleteReview);

export default router;
