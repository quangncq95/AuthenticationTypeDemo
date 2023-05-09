const express = require("express");
const { create } = require("express-handlebars");
const bodyParser = require("body-parser");
const userAPI = require("./models/user");
const app = express();
const port = 3000;
const handlebar = create();

//Configure public
app.use(express.static(__dirname + "/public"));
//Configure engine
app.engine("handlebars", handlebar.engine);
app.set("view engine", "handlebars");

//middleware
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

//route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/register", (req, res) => {
  res.render("register");
});

//APIs
app.post("/user", (req, res) => {
  const newUser = userAPI.addUser(req.body);
  res.json(newUser);
});

app.post("/loginUser", (req, res) => {
  const isLogin = userAPI.loginUser(req.body.email, req.body.password);
  res.json(isLogin);
});

app.get("/user/:id", (req, res) => {
  const user = userAPI.getUser(req.params.id);
  if (user) res.json(user);
  else res.json("user not found");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
