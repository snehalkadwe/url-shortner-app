const express = require('express');
const path = require('path'); // built in module
const { connectToMongoDB } = require('./connection');
const URL = require('./models/url');
const app = express();

const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');

const PORT = 8000;

connectToMongoDB('mongodb://127.0.0.1:27017/shorturl')
	.then(() => console.log('database connected'))
	.catch((err) => console.log('db connection error', err));

// let app know which view engine we are going to use for server side rendering by setting the view engine type
app.set('view engine', 'ejs');

// let app know in which redirect our views are
app.set('views', path.resolve('./views'));

app.use(express.json()); // middleware supoorts json data from postman
app.use(express.urlencoded({ extended: false })); // middleware we have accept external data coming from webpage

// the url starting with /url will have to use urlRoute
app.use('/url', urlRoute);
app.use('/', staticRoute);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
