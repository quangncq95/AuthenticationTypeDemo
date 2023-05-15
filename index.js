const express = require("express");
const { create } = require("express-handlebars");
const { v4: uuidv4 } = require("uuid");

const bodyParser = require("body-parser");
const userAPI = require("./models/user");
const sessionAPI = require("./models/session");
const cookieParser = require("cookie-parser");

const app = express();
const port = 3000;
const handlebar = create({ defaultLayout: "main" });

//Configure public
app.use(express.static(__dirname + "/public"));
//Configure engine
app.engine("handlebars", handlebar.engine);
app.set("view engine", "handlebars");

//middleware
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());

//route

app.get("/login", (req, res) => {
  res.render("login", { layout: "loginLayout" });
});
app.get("/register", (req, res) => {
  res.render("register", { layout: "loginLayout" });
});

//APIs
app.post("/user", (req, res) => {
  const newUser = userAPI.addUser(req.body);
  res.redirect("/login");
});

app.post("/loginUser", (req, res) => {
  try {
    const user = userAPI.loginUser(req.body.email, req.body.password);
    console.log("user", user);
    const newSession = {
      id: uuidv4(),
      user: { ...user },
    };
    console.log("newSession", newSession);
    sessionAPI.addSession(newSession);
    res.cookie("sessionId", newSession.id);
    res.redirect("/");
  } catch (error) {
    res.redirect("/login");
  }
});

app.get("/user/:id", (req, res) => {
  const user = userAPI.getUser(req.params.id);
  if (user) res.json(user);
  else res.json("user not found");
});

app.use((req, res, next) => {
  try {
    const session = sessionAPI.getSession(req.cookies.sessionId);
    res.locals.user = session.user;
    next();
  } catch (error) {
    res.redirect("/login");
  }
});

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
