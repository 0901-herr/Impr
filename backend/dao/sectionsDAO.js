import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let sections;

export default class SectionsDAO {
  static async injectDB(conn) {
    if (sections) {
      return;
    }
    try {
      sections = await conn.db(process.env.IMPR_NS).collection("sections");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in SectionsDAO: ${e}`
      );
    }
  }

  static async getSections({ page = 0, sectionsPerPage = 10 } = {}) {
    let query;
    let cursor;

    try {
      cursor = await sections.find(query);
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { sectionsList: [], totalNumsections: 0 };
    }

    const displayCursor = cursor
      .limit(sectionsPerPage)
      .skip(sectionsPerPage * page);

    try {
      const sectionsList = await displayCursor.toArray();
      const totalNumsections = await sections.countDocuments(query);

      return { sectionsList, totalNumsections };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { sectionsList: [], totalNumsections: 0 };
    }
  }

  static async getSectionByID(id) {
    try {
      const pipeline = [
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "reviews",
            let: {
              id: "$_id",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$section_id", "$$id"],
                  },
                },
              },
              {
                $sort: {
                  date: -1,
                },
              },
            ],
            as: "reviews",
          },
        },
        {
          $addFields: {
            reviews: "$reviews",
          },
        },
      ];
      return await sections.aggregate(pipeline).next();
    } catch (e) {
      console.error(`Something went wrong in getSectionByID: ${e}`);
      throw e;
    }
  }

  static async addSection(user, title) {
    try {
      const reviewDoc = {
        name: user.name,
        user_id: user._id,
        title: title,
      };

      return await sections.insertOne(reviewDoc);
    } catch (e) {
      console.error(`Unable to post section: ${e}`);
      return { error: e };
    }
  }

  static async updateSection(sectionId, userId, title) {
    try {
      const updateResponse = await sections.updateOne(
        { user_id: userId, _id: ObjectId(sectionId) },
        { $set: { title: title } }
      );

      return updateResponse;
    } catch (e) {
      console.error(`Unable to update section: ${e}`);
      return { error: e };
    }
  }

  static async deleteSection(sectionId, userId) {
    try {
      const deleteResponse = await sections.deleteOne({
        _id: ObjectId(sectionId),
        user_id: userId,
      });

      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete section: ${e}`);
      return { error: e };
    }
  }
}
