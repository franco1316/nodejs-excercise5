const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const compression = require("compression");
const path = require("path");
const morgan = require("morgan");

const { globalErrorHandler } = require("./controllers/errors");

const { users } = require("./routes/users");
const { repairs } = require("./routes/repairs");
const { views } = require("./routes/views");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));

app.use(helmet());

app.use(compression());

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
else app.use(morgan("combined"));

const limiter = rateLimit({
  max: 10000,
  windowMs: 1 * 60 * 60 * 1000,
  message: "Too many request from this Ip",
});

app.use(limiter);

app.use("/api/v1/users", users);
app.use("/api/v1/repairs", repairs);
app.use("/views", views);

app.use("*", globalErrorHandler);

module.exports = { app };
