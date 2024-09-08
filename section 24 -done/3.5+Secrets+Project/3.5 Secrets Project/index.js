//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".

import bodyParser from "body-parser";
import express from "express";
// I can egnore that line and make this line like that (app.use(express.urlencoded({ extended: true }));)
// import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var userIsAuthorised = false;
var password = "IloveProgramming";

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

function passChecking(req, res, next) {
  console.log(req.body);
  password = req.body["password"];
  if (password === "ILoveProgramming") {
    userIsAuthorised = true;
  }
  next();
}
app.use(passChecking);

// To get the home page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

//The password is ILoveProgramming
app.post("/check", (req, res) => {
  if (userIsAuthorised) {
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    res.send(`<h1>The Password not correct ! </h1>`);
    // res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
