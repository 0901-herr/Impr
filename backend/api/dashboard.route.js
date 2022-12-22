import express from "express";
import SectionsCtrl from "./sections.controller.js";
import ReviewsCtrl from "./reviews.controller.js";

const router = express.Router();

// router.route("/").get((req, res) => res.send("hello world"));

router.route("/").get(SectionsCtrl.apiGetSections);
router.route("/id/:id").get(SectionsCtrl.apiGetSectionById);

router
  .route("/section")
  .post(SectionsCtrl.apiPostSection)
  .put(SectionsCtrl.apiUpdateSection)
  .delete(SectionsCtrl.apiDeleteSection);

router
  .route("/review")
  .get(ReviewsCtrl.apiGetReviews)
  .post(ReviewsCtrl.apiPostReview)
  .put(ReviewsCtrl.apiUpdateReview)
  .delete(ReviewsCtrl.apiDeleteReview);

export default router;
