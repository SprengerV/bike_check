
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const routes = require("./routes");
const app = express();
const sequelize = require('./config/connection');
const models = require('./models');

app.use([
    express.urlencoded({ extended: true }),
    express.json()
]);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


app.use(routes);

// Link API Routes here


sequelize
  .sync({ force: false, logging: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log("🚀  Server server now on port", PORT, "👻 React App on Port 3000");
    });
  })
  .catch(err => console.error(err));
