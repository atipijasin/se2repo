const express = require('express')
const fetch = require("node-fetch");

const mapquest_url = "http://www.mapquestapi.com/geocoding/v1/address?key=C3UNnftATS3OclId4DwyXJYOzLKsXq61&location="
const sun_url = "https://api.sunrise-sunset.org/json?"

const app = express()
const PORT = process.env.PORT || 3000

async function getLocation(url) {
    try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
        return json;
    } catch (error) {
        console.log(error);
    }
};

async function getSunriseSunsetByLatLng(url) {
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
};

app.get("/json", async function (req, res) {
    try {
        const mapquest_json = await getLocation(mapquest_url + req.query.city);

        const lat = mapquest_json.results[0].locations[0].latLng.lat;
        const lng = mapquest_json.results[0].locations[0].latLng.lng;

        const sun_json = await getSunriseSunsetByLatLng(sun_url + "lat=" + lat + "&lng=" + lng);
        res.send(sun_json);

    } catch (error) {
        console.log(error);
    }
});

app.get("/", async function (req, res) {
    try {
        res.send("Usage: localhost:3000/json?city=CITY");
    } catch (error) {
        console.log(error);
    }
});

app.listen(PORT, () => console.log('Sunrise-Sunset app listening on port' + PORT))