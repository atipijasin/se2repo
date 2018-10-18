const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
 
var courses_offered = [{id: 21, name: 'HCI'},
{id: 28, name:'sweng'}]
 
 
app.get('/', (req, res) => res.send('<h1>It works!</h1>This is the default web page for this server. <br><br> The web server software is running but no content has been added, yet.'))
// app.get('/', (req, res) => res.redirect('https://trentose2.herokuapp.com'))
 
app.get('/courses', (req, res) => {
   res.json(courses_offered)
})


app.listen(PORT, () => console.log('Example app listening on port'+ PORT))