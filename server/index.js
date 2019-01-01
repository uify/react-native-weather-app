const express = require('express')
const app = express()
const request = require('request')
const port = 3000

const credentials = {
    base: 'https://api.apixu.com/v1',
    api: 'api-key',
    options: {
        current: 'current.json',
        forecast: 'forecast.json',
        search: 'search.json',
        history: 'history.json'
    }
}

app.get('/search/:query', (req, res) => {
    request(`${credentials.base}/${credentials.options.search}?key=${credentials.api}&q=${req.params.query}`, 
        (error, response, body) => {
            res.send(response.body)
    })
})

app.get('/place/:lat/:lon', (req, res) => {
    request(`${credentials.base}/${credentials.options.current}?key=${credentials.api}&q=${req.params.lat},${req.params.lon}`, 
    (error, response, body) => {
        res.send(response.body)
    })
})

app.get('/forecast/:lat/:lon', (req, res) => {
    request(`${credentials.base}/${credentials.options.forecast}?key=${credentials.api}&q=${req.params.lat},${req.params.lon}&days=7`, 
    (error, response, body) => {
        res.send(response.body)
    })
})



app.listen(port, () => console.log(`Listening on port ${port}!`))