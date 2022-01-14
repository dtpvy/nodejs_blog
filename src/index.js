const express = require('express');
const morgan = require('morgan');
const path = require('path');
const route = require('./routers');
const db = require('./config/db');
var methodOverride = require('method-override');
const SortMiddleware = require('./app/middlewares/SortMiddleware');
// Connect DB
db.connect();

const app = express();
const port = 3000;
//--------------------------------------------//
//HTTP logger
app.use(morgan('combined'));

app.use(methodOverride('_method'));

// STATIC
app.use(express.static(path.join(__dirname, 'public')));

// TEMPLATE ENGINE
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ extname: '.' });
app.engine('handlebars', hbs.engine);
app.engine(
  '.handlebars',
  exphbs.engine({
    extname: '.handlebars',
    helpers: require('./helpers/handlebars'),
  }),
);

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources', 'views')); // cách mình tìm đến file, hệ điều hành window

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(SortMiddleware);

route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
