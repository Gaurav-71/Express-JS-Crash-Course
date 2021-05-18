const { request } = require("express");
const express = require("express");
const path = require("path");
const hbs = require("express-handlebars");

const logger = require("./middleware/logger");
const members = require("./Members");

const app = express();

// init middleware
//app.use(logger);

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// handlebars middleware
app.engine("handlebars", hbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// homepage route for server side rendering, just an example. The static pages with same names get overridden by rendered pages
app.get("/", (req, resp) =>
  resp.render("index", { title: "Members Index Page", members })
);

// set static folder, handles all routing by default
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server active on port : ", PORT));
