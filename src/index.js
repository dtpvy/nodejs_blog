const express = require('express');
const morgan = require('morgan');
const path = require('path');
const route = require('./routers');
var bodyParser = require('body-parser');
const db = require('./config/db');
// Connect DB
db.connect();

const app = express();
const port = 3000;
//--------------------------------------------//
//HTTP logger
app.use(morgan('combined'));

// STATIC
app.use(express.static(path.join(__dirname, 'public')));

// TEMPLATE ENGINE
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ extname: '.handlebars' });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources', 'views')); // cách mình tìm đến file, hệ điều hành window

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
