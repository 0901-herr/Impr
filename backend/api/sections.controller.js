import SectionsDAO from "../dao/sectionsDAO.js";

export default class SectionsController {
  static async apiGetSections(req, res, next) {
    const sectionsPerPage = req.query.sectionsPerPage
      ? parseInt(req.query.sectionsPerPage, 10)
      : 10;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    const { sectionsList, totalNumSections } = await SectionsDAO.getSections({
      page,
      sectionsPerPage,
    });

    let response = {
      sections: sectionsList,
      page: page,
      entries_per_page: sectionsPerPage,
      total_results: totalNumSections,
    };
    res.json(response);
  }

  static async apiGetSectionById(req, res, next) {
    try {
      let id = req.params.id || {};
      let section = await SectionsDAO.getSectionByID(id);
      if (!section) {
        res.status(404).json({ error: "Not found" });
        return;
      }
      res.json(section);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiPostSection(req, res, next) {
    try {
      // const sectionId = req.body.section_id;
      const title = req.body.title;

      const userInfo = {
        name: req.body.name,
        _id: req.body.user_id,
      };

      const sectionResponse = await SectionsDAO.addSection(userInfo, title);
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateSection(req, res, next) {
    try {
      const sectionId = req.body.section_id;
      const userId = req.body.user_id;
      const title = req.body.title;

      const sectionResponse = await SectionsDAO.updateSection(
        sectionId,
        userId,
        title
      );

      var { error } = sectionResponse;
      if (error) {
        res.status(400).json({ error });
      }

      if (sectionResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update section - user may not be original poster"
        );
      }

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteSection(req, res, next) {
    try {
      const sectionId = req.query.id;
      const userId = req.body.user_id;
      console.log(sectionId);
      const sectionResponse = await SectionsDAO.deleteSection(
        sectionId,
        userId
      );
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
