const express = require('express')
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const assignments = require('./assignments.js')

// check
app.get('/v1/', (req, res) => {
    res.json({ msg: 'This is working' });
});

app.post('/v1/assignments', assignments.postAssignment);
app.get('/v1/assignments/:assignmentId', assignments.getAssignment);
app.put('/v1/assignments/:assignmentId', assignments.putAssignment);
app.delete('/v1/assignments/:assignmentId', assignments.deleteAssignment);

module.exports = app;