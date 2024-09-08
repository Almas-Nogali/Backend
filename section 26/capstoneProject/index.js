import fs from "fs";

import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const readFileLines = (filename) =>
    fs
      .readFileSync(filename)
      .toString("UTF8")
      .split(/Post Of: | Message: /);

  // Driver code
  const arr = readFileLines("info/Posts.txt");

  // Print the array
  console.log(arr);

  res.render("index.ejs", {
    myArray: arr,
  });
});

app.get("/submit", (req, res) => {
  res.render("index.ejs", {
    myArray: [], // Pass an empty array or some default value
  });
});

// Routing to post page
app.get("/post", (req, res) => {
  res.render("post.ejs");
});

// For my post page
// app.post("/myPost", (req, res) => {
//   const text = req.body["post"];
//   const name = req.body["name"];

//   fs.appendFile(
//     "info/Posts.txt",
//     "Post Of: " + name + " Message: " + text,
//     (err) => {
//       if (err) throw err;
//       console.log("The file has been saved!");
//     }
//   );

//   res.render("index.ejs", {
//     name: name,
//     yourText: text
//   });
// });

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.post("/myPost", (req, res) => {
  const text = req.body["post"];
  const name = req.body["name"];

  fs.appendFile(
    "info/Posts.txt",
    "Post Of: " + name + " Message: " + text,
    (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    }
  );

  res.render("index.ejs", {
    myArray: arr,
  });
});
