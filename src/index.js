const express = require('express');
const morgan = require('morgan');
const path = require('path');
const route = require('./routers');
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
app.set("views", path.join(__dirname, 'resources\\views')); // cách mình tìm đến file, hệ điều hành window


route(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
