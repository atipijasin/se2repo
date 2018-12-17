const express = require('express')
const fetch = require("node-fetch");
var bodyParser = require('body-parser')

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


const mapquest_url = "http://www.mapquestapi.com/geocoding/v1/address?key=C3UNnftATS3OclId4DwyXJYOzLKsXq61&location="
const sun_url = "https://api.sunrise-sunset.org/json"

var supported_locations = [];


app.get("/locations/:id", async (req, res) => {
    const index = supported_locations.findIndex((item) => { return item.id === req.params.id });
    if (index === -1) {
        res.sendstatus(404)
        return
    }
    try {
        const mapquest_response = await fetch(mapquest_url + encodeURIComponent(supported_locations[id].name), {
            headers: {
                'Accept': 'application/json',
            }
        })
        const mapquest_json = await mapquest_response.json()
        latlng = mapquest_json.results[0].locations[0].latLng

        const sun_response = await fetch(sun_url + '?lat=' + latlng.lat + '&lng=' + latlng.lng, {
            headers: {
                'Accept': 'application/json',
            }
        })
        const sun_json = await sun_response.json()

        res.status(200)
        res.send(sun_json.results)
    } catch (error) {
        res.sendstatus(500)
        console.log('\n\nerror', error)

    }
});

app.get('/locations', async (req, res) => {
    try {

        const mapquest_results = await Promise.all(supported_locations.map(location => {
            const url = mapquest_url + encodeURIComponent(location.name)
            return fetch(url, {
                headers: {
                    'Accept': 'application/json',
                }
            })
                .then((response) => response.json())
                .then((json) => {
                    return json.results[0].locations[0].latLng
                })
        })
        )

        const sun_results = await Promise.all(mapquest_results.map(latlng => {
            return fetch(sun_url + '?lat=' + latlng.lat + '&lng=' + latlng.lng, {
                headers: {
                    'Accept': 'application/json',
                }
            }).then((response) => response.json())
        }))



        console.log('\n\nsending', sun_results)

        res.status(200)
        res.send(sun_results)
    } catch (error) {
        console.log('\n\nerror', error)
        res.sendstatus(500)

    }
})

app.post('/locations', (req, res) => {
    const location_name = req.body.name
    const location_state = req.body.state

    const location_id = location_name.replace(/\s/g, '') + '---' + location_state
    const location = { id: location_id, name: location_name, state: location_state }
    supported_locations.push(location)

    res.status(201)
    res.json(location)
    console.log(supported_locations)
})


app.get("/", async (req, res) => {
    try {
        res.send("SunsetSunrise API by location");
    } catch (error) {
        console.log(error);
    }
});

app.listen(PORT, () => console.log('Sunrise-Sunset app listening on port ' + PORT))