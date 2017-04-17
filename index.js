const express = require('express');
const bodyparser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(`${__dirname}/client`));

app.use(bodyparser.json());

app.get('/', (req, res) => {
  res.render('index');
});

const port = process.env.PORT || 3000;

app.listen(port);
