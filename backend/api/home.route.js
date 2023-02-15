import express from "express";
import SectionsCtrl from "./sections.controller.js";
import ReviewsCtrl from "./reviews.controller.js";

const router = express.Router();

router.route("/").get(SectionsCtrl.apiGetSections);
router.route("/sections/id/:id").get(SectionsCtrl.apiGetSectionById);

/* FILE STORAGE */
router
  .route("/sections")
  .get(SectionsCtrl.apiGetSections)
  .post(SectionsCtrl.apiPostSection)
  .put(SectionsCtrl.apiUpdateSection)
  .delete(SectionsCtrl.apiDeleteSection);

router
  .route("/review")
  .get(ReviewsCtrl.apiGetReviews)
  .delete(ReviewsCtrl.apiDeleteReview);

export default router;
