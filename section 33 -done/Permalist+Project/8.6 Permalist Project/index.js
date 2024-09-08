import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "almas1418",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [];

app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM items ORDER BY id ASC");
    items = result.rows;

    res.render("index.ejs", {
      listTitle: "Today",
      listItems: items,
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/add", async (req, res) => {
  const newItem = req.body.newItem;
  try {
    await db.query("insert into items (title) values ($1)", [newItem]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});


app.post("/edit", async (req, res) => {
  const updatedItemId1 = req.body.updatedItemId;
  const updatedItemTitle1 = req.body.updatedItemTitle;
  try {
    await db.query("update items set title = ($1) where item.id = $2", [updatedItemTitle1 ,updatedItemId1]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/delete", async (req, res) => {
const deletItem = req.body.deleteItemId;
try {
  await db.query("delete from items where items.id = $1", [deletItem]);
  res.redirect("/");
} catch (err) {
  console.log(err);
}
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
