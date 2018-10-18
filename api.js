const express = require('express')
const bodyParser = require("body-parser");

const app = express()
const PORT = process.env.PORT || 3000
 


/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

app.get("/", function (req, res)){
    res.sendFile('views/index.html', {root: __dirname })
}

app.post("/sunset", function (req, res) {
    console.log(req.body.city)
});
app.post("/sunrise", function (req, res) {
    console.log(req.body.city)
});
app.listen(PORT, () => console.log('Example app listening on port'+ PORT))