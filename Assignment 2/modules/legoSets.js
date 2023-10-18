/********************************************************************************
* WEB322 – Assignment 02

* I declare that this assignment is my own work in accordance with Seneca'
* Academic Integrity Policy:

* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html

* Name: Aydin Ghorbani Student ID: 124170226 Date: Oct/1/23
********************************************************************************/

const setData = require("../data/setData");
const themeData = require("../data/themeData");

let sets = [];

function initialize() {
  sets = setData.map((set) => {
    const themeMatch = themeData.find((theme) => theme.id === set.theme_id);
    return {
      ...set,
      theme: themeMatch ? themeMatch.name : "Unknown",
    };
  });
  return Promise.resolve();
}

function getAllSets() {
  return Promise.resolve(sets);
}

function getSetByNum(setNum) {
  const set = sets.find((s) => s.set_num === setNum);
  if (set) {
    return Promise.resolve(set);
  } else {
    return Promise.reject({ error: "Unable to find the requested set." });
  }
}

function getSetsByTheme(theme) {
  const themeLower = theme.toLowerCase();
  const filteredSets = sets.filter((s) =>
    s.theme.toLowerCase().includes(themeLower)
  );
  return Promise.resolve(filteredSets);
}

module.exports = { initialize, getAllSets, getSetByNum, getSetsByTheme };



// initialize()
//   .then(() => {
//     console.log("Initialization complete.");
//     return getAllSets();
//   })
//   .then((allSets) => {
//     console.log("All sets:");
//     console.log(allSets);
//     return getSetByNum("001-1");
//   })
//   .then((set) => {
//     console.log("Set by number:");
//     console.log(set);
//     return getSetsByTheme("tech");
//   })
//   .then((setsByTheme) => {
//     console.log("Sets by theme:");
//     console.log(setsByTheme);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });
