import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "almas1418",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const name = req.body.username;
  const pass = req.body.password;

  const result1 = await db.query("select *  from users  where email = ($1)", [
    name,
  ]);

  try {
    if (result1.rows.length > 0) {
      res.send("This Email already exist, Sing in please !");
    } else {
      const result = await db.query(
        "INSERT INTO users (email, password) values ($1 , $2)",
        [name, pass]
      );

      console.log(name);
      console.log(pass);
      res.render("secrets.ejs");
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  const name = req.body.username;
  const pass = req.body.password;
  const result1 = await db.query("select *  from users  where email = ($1)", [
    name,
  ]);

  try {
    if (result1.rows.length > 0) {
      const user1 = result1.rows[0];
      const storedPass = user1.password;

      if (storedPass === pass) {
        console.log(name);
        console.log(pass);
        res.render("secrets.ejs");
      } else {
        console.log(name);
        console.log(pass);
        res.send("Wrong Sing in information!");
      }
    } else {
      console.log(name);
      console.log(pass);
      res.send("User not found, log in please !");
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
