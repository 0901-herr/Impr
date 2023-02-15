import ReviewsDAO from "../dao/reviewsDAO.js";

export default class ReviewsController {
  static async apiGetReviews(req, res, next) {
    const reviewsPerPage = req.query.reviewsPerPage
      ? parseInt(req.query.reviewsPerPage, 10)
      : 10;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};

    if (req.query.title) {
      filters.title = req.query.title;
    }

    const { reviewsList, totalNumReviews } = await ReviewsDAO.getReviews({
      filters,
      page,
      reviewsPerPage,
    });

    let response = {
      reviews: reviewsList,
      page: page,
      filters: filters,
      entries_per_page: reviewsPerPage,
      total_results: totalNumReviews,
    };
    res.json(response);
  }

  static async apiPostReview(req, res, next) {
    try {
      const sectionId = req.body.section_id;
      const title = req.body.title;
      const picture_path = req.body.picture_path;
      const summary = req.body.summary;
      const rating = req.body.rating;
      const description = req.body.description;

      const userInfo = {
        name: req.body.name,
        _id: req.body.user_id,
      };

      const date = new Date();

      const ReviewResponse = await ReviewsDAO.addReview(
        sectionId,
        userInfo,
        title,
        picture_path,
        summary,
        rating,
        description,
        date
      );
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateReview(req, res, next) {
    try {
      const reviewId = req.body.review_id;
      const userId = req.body.user_id;
      const title = req.body.title;
      const picture_path = req.body.picture_path;
      const summary = req.body.summary;
      const rating = req.body.rating;
      const description = req.body.description;
      const date = new Date();

      const reviewResponse = await ReviewsDAO.updateReview(
        reviewId,
        userId,
        title,
        picture_path,
        summary,
        rating,
        description,
        date
      );

      var { error } = reviewResponse;
      if (error) {
        res.status(400).json({ error });
      }

      if (reviewResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update review - user may not be original poster"
        );
      }

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteReview(req, res, next) {
    try {
      const reviewId = req.query.id;
      const userId = req.body.user_id;
      // console.log(reviewId);
      const reviewResponse = await ReviewsDAO.deleteReview(reviewId, userId);
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
