import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  const fname1 = req.body["fName"];
  const lname1 = req.body["lName"];
  const total = count(fname1, lname1);
  res.render("index.ejs", { numberOfLetters: total });
});

function count(fname, lname) {
  let countFN = fname.length;
  let countLN = lname.length;
  return countFN + countLN;
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
