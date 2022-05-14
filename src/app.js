const path = require('path');
const express = require('express');
const hbs = require('hbs');
const fetch = require('node-fetch');

const app = express();

const publicFolder = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.use(express.static(publicFolder));

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Bhanuprakash'
    });
});


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'MSR'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Help about the weather app',
        title: 'Help',
        name: 'Prakash'
    });
});

app.get('/weather', (req, res) => {
    if ( !req.query.address ) {
        return res.send({error: 'You must provide address query string'});
    }

    const address = req.query.address;

    (async () =>  {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${address}&limit=1&appid=5279b863eebfcf5655b440e3b7d8a314`);
        const locations = await response.json();
    
        const {lat, lon} = locations[0];
        console.log(lat, lon);
    
        const forecastURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5279b863eebfcf5655b440e3b7d8a314`;
                                                                                                               // '5279b863eebfcf5655b440e3b7d8a314'
        console.log(forecastURL);
        const forecastResult = await fetch( forecastURL );
        const forecastJSON = await forecastResult.json();
        console.log(forecastJSON['weather'][0]['main']);
        res.send(forecastJSON['weather'][0]);
    })();


});

app.get('/products/', (req, res) => {
    if ( !req.query.search ) {
       return res.send({error: 'You must provide a search term'});
    }

    console.log(req.query);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {name: '404', title: 'Prakash', errorMessage: 'Help article not found'});
});

app.get('*', (req, res) => {
    res.render('404', {name: '404', title: 'Prakash', errorMessage:'Page not found'});
})
// app.com
// app.com/help
// app.com/about

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});