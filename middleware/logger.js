const moment = require("moment");

// middleware function, gets called whenever route is loaded
const logger = (req, resp, next) => {
  console.log(
    req.protocol,
    "://",
    req.get("host"),
    req.originalUrl,
    " : ",
    moment().format()
  );
  next();
};

module.exports = logger;
