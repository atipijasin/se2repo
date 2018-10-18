const fetch = require("node-fetch");
const url = "localhost:3000/json?city="
 
const getLocation = async url => {
 
  try {
    const response = await fetch(url);
    const json = await response.json();
    console.log(json)
  } catch (error) {
    console.log(error);
  }
};
 
 
getLocation(url);
