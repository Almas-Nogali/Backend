import express from "express";
// 1-install body-parser then import it
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

// 2- what kined of data we want to pass
app.use(bodyParser.urlencoded({ extended: true }));

// not for what the user want to send
app.get("/", (req, res) => {
  // console.log(__dirname + "/public/index.html");
  res.sendFile(__dirname + "/public/index.html");
});

// 3- what to used to wrout the form
app.post("/submit", (req, res) => {
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
