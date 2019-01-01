const URL = 'http://localhost:3000';

const search = (query, callback) => {
    fetch(`${URL}/search/${query}`)
        .then(data => data.json())
        .then((d) => {
            callback(d)
        })
}

const place = (lat, lon, callback) => {
    fetch(`${URL}/place/${lat}/${lon}`)
        .then(data => data.json())
        .then((d) => {
            callback(d)
        })
}

const forecast = (lat, lon, callback) => {
    fetch(`${URL}/forecast/${lat}/${lon}`)
        .then(data => data.json())
        .then((d) => {
            callback(d)
        })
}

module.exports = {
    search,
    place,
    forecast
}