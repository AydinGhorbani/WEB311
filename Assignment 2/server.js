/********************************************************************************
* WEB322 – Assignment 02

* I declare that this assignment is my own work in accordance with Seneca'
* Academic Integrity Policy:

* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html

* Name: Aydin Ghorbani Student ID: 124170226 Date: Oct/1/23
********************************************************************************/

const express = require("express");
const app = express();
const legoData = require("./modules/legoSets");

app.get("/", (req, res) => {
  res.send("Assignment 2: Aydin Ghorbani - 124170226");
});

app.get("/lego/sets", (req, res) => {
  legoData
    .getAllSets()
    .then((sets) => {
      res.json(sets);
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal server error" });
    });
});

app.get("/lego/sets/num-demo", (req, res) => {
  const setNum = "055-1"; 
  legoData
    .getSetByNum(setNum)
    .then((set) => {
      res.json(set);
    })
    .catch((error) => {
      res.status(404).json({ error: "Unable to find the requested set." });
    });
});

app.get("/lego/sets/theme-demo", (req, res) => {
  const theme = "./data/themeData.json"; 
  legoData
    .getSetsByTheme(theme)
    .then((sets) => {
      res.json(sets);
    })
    .catch((error) => {
      res.status(404).json({ error: "Unable to find the requested sets." });
    });
});

// Starting the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
