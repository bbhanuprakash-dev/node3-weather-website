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

    const response = await fetch(`http://localhost:3000/weather?address=${location}`);
    
    const forecastJSON = await response.json();
    console.log(forecastJSON);

    message1.textContent = forecastJSON.Location;
    message2.textContent = forecastJSON.Weather;
    //res.send(forecastJSON['weather'][0]);
}