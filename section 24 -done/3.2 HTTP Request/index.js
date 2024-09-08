import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  // can also display the info by req.rawHeaders
  // console.log(req);

  //  res.send("Hello I'm Almas ! ")
  res.send("<h1> Hi Man I'm Almas </h1>");
});

app.get("/about", (req, res) => {
  res.send("<h1> Hi it is about page... </h1><br><p> I'm Almas Nogali</p> <p> Email: Almas.nogali@gmail.com</p>");
});

app.get("/contact", (req, res) => {
  res.send("<h1> Hi it is about contact... </h1>");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
