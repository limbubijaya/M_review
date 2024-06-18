require("dotenv").config();
const express = require("express");
const app = express();
const handlebarRoutes = require("./routes/handlebars");
const userRoutes = require("./routes/users");
const { engine } = require("express-handlebars");
var session = require("express-session");
const cookieParser = require("cookie-parser");

app.use(express.static("public"));
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(cookieParser());

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/", handlebarRoutes);

app.listen(8080, () => {
  console.log(`Application is running on port http://localhost:8080`);
});
