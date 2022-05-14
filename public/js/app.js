console.log('Client side js file loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');

// message1.textContent = '';
// message2.textContent = '';

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const location = search.value;
    if ( !location || !location.length) {
        console.log('You must provide a location');
        return;
    }
    console.log('testing', location);
    getWeather(location);
});


//const address = req.query.add`ress;

async function getWeather(location) {
    message1.textContent = 'Loading...';
    message2.textContent = '';

    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=5279b863eebfcf5655b440e3b7d8a314`);
    //console.log(response);
    const locations = await response.json();

    if ( locations.length === 0 ) {
        //console.log('Location not found!');
        message1.textContent = 'Location not found!';
        message2.textContent = '';
        return;
    }
    //console.log(locations);
    const {lat, lon} = locations[0];
    //console.log(lat, lon);

    const forecastURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5279b863eebfcf5655b440e3b7d8a314`;
                                                                                                           // '5279b863eebfcf5655b440e3b7d8a314'
    //console.log(forecastURL);
    const forecastResult = await fetch( forecastURL );
    const forecastJSON = await forecastResult.json();
    console.log(forecastJSON);

    message1.textContent = forecastJSON.name;
    message2.textContent = forecastJSON.weather[0].description;
    //res.send(forecastJSON['weather'][0]);
}