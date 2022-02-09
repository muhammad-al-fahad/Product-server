const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dish = require('./routes/dish(v 1.1.0)');
const promo = require('./routes/promo(v 1.0.0)');
const leader = require('./routes/leader(v 1.0.0)');


const hostname = 'localhost';
const port = 3000;

const app = express();

app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

app.use('/dishes', dish);
app.use('/promos', promo);
app.use('/leaders', leader);

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});