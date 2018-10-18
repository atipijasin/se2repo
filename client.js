const fetch = require("node-fetch");
const url = "https://se2trento.herokuapp.com/courses"
 
const getLocation = async url => {
 
  try {
    const response = await fetch(url);
    const json = await response.json();
    app.get('/', (req, res) => {
      res.send("-- Received following courses --")
      json.forEach(function(course) {
          res.send("Course id: " + course.id);
          res.send("Course name: " + course.name );
          res.send("------------------------------" );
      }, this);
    }
  } catch (error) {
    console.log(error);
  }
};
 
 
getLocation(url);
