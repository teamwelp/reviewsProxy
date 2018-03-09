const express = require('express')
const path = require('path');
const morgan  = require('morgan');
const app = express();
const port = process.env.PORT || 9000;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));

app.get('/biz/:businessId/', (req, res) => {
  res.render('index');
});

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`)
});
