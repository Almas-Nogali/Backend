import express from "express";
// 1
import morgen from "morgan";

const app = express();
const port = 3000;

// 2
app.use(morgen("tiny"));
// install morgen " npm i morgan"

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
