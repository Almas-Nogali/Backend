// for Express e-1
import express from "express";

//e-2
const app = express();

//e-3
const port = 3000;

// e-5
app.get("/", (req, res) => {
  //   const today = new Date();
  const today = new Date("July 21, 1983 01:15:00");
  // From 0-4 weekday, from 5,6 weekend
  const day = today.getDay();
  console.log(day);

  let type = "a weekday";
  let adv = "it's time to work hard !";

  if (day === 6 || day === 5) {
    type = "a weekend";
    adv = "it's time to have fun !";
  }

  res.render("index.ejs", {
    dayType: type,
    advice: adv,
  });
});

//e-4
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
