import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let reviews;

export default class ReviewsDAO {
  static async injectDB(conn) {
    if (reviews) {
      return;
    }
    try {
      reviews = await conn.db(process.env.IMPR_NS).collection("reviews");
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`);
    }
  }

  static async getReviews({
    filters = null,
    page = 0,
    reviewsPerPage = 10,
  } = {}) {
    let query;
    if (filters) {
      if ("title" in filters) {
        query = { $text: { $search: filters["title"] } };
      }
    }

    let cursor;

    try {
      cursor = await reviews.find(query);
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { reviewsList: [], totalNumreviews: 0 };
    }

    const displayCursor = cursor
      .limit(reviewsPerPage)
      .skip(reviewsPerPage * page);

    try {
      const reviewsList = await displayCursor.toArray();
      const totalNumreviews = await reviews.countDocuments(query);

      return { reviewsList, totalNumreviews };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { reviewsList: [], totalNumreviews: 0 };
    }
  }

  static async addReview(
    sectionId,
    user,
    title,
    picture_path,
    summary,
    rating,
    description,
    date
  ) {
    try {
      const reviewDoc = {
        name: user.name,
        section_id: ObjectId(sectionId),
        user_id: user._id,
        title: title,
        picture_path: picture_path,
        summary: summary,
        rating: rating,
        description: description,
        date: date,
      };

      return await reviews.insertOne(reviewDoc);
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      return { error: e };
    }
  }

  static async updateReview(
    reviewId,
    userId,
    title,
    picture_path,
    summary,
    rating,
    description,
    date
  ) {
    try {
      const updateResponse = await reviews.updateOne(
        { user_id: userId, _id: ObjectId(reviewId) },
        {
          $set: {
            title: title,
            picture_path: picture_path,
            summary: summary,
            rating: rating,
            description: description,
            date: date,
          },
        }
      );

      return updateResponse;
    } catch (e) {
      console.error(`Unable to update review: ${e}`);
      return { error: e };
    }
  }

  static async deleteReview(reviewId, userId) {
    try {
      const deleteResponse = await reviews.deleteOne({
        _id: ObjectId(reviewId),
        user_id: userId,
      });

      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete review: ${e}`);
      return { error: e };
    }
  }
}
