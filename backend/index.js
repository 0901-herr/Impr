import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import SectionsDAO from "./dao/sectionsDAO.js";
import ReviewsDAO from "./dao/reviewsDAO.js";

dotenv.config();
const MongoClient = mongodb.MongoClient;

// choose port 8000 if cannot access
const port = process.env.PORT || 8000;

MongoClient.connect(process.env.IMPR_DB_URI, {
  maxPoolSize: 50, // total people that can access
  wtimeoutMS: 2500, // after 2500ms request will timeout
  useNewUrlParser: true,
})
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await SectionsDAO.injectDB(client);
    await ReviewsDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
