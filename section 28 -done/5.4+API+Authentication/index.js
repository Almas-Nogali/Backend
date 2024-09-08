import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "AlmasNogali";
const yourPassword = "Almas1418";
const yourAPIKey = "10efe8f2-80f4-402b-8278-f59a68d56910";
const yourBearerToken = "f975173d-ad53-4c35-b8f2-e5c6b3e04e0b";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    //TODO 2: Use axios to hit up the /random endpoint
    const result = await axios.get(API_URL + "/random");
      //The data you get back should be sent to the ejs file as "content"
        //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  };
});

app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  try {
     //Specify that you only want the secrets from page 2
    const result = await axios.get(API_URL + "/all?page=2", {
      //HINT: This is how you can use axios to do basic auth:
      // https://stackoverflow.com/a/74632908
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    });
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/apiKey", async (req, res) => {
  try {
  //TODO 4: Write your code here to hit up the /filter endpoint
    const result = await axios.get(API_URL + "/filter", {
  //Filter for all secrets with an embarassment score of 5 or greater
      params: {
        score: 5,
  //HINT: You need to provide a query parameter of apiKey in the request.
        apiKey: yourAPIKey,
      },
    });
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});


const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};


app.get("/bearerToken", async (req, res) => {
  try {
    //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
    const result = await axios.get(API_URL + "/secrets/2", config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
  
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
 
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
