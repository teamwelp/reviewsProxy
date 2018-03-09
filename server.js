const express = require('express')
const path = require('path');
const morgan  = require('morgan');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 9000;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));

app.get('/biz/:businessId/', (req, res) => {
  const promises = [];
  let promise = axios.get(`http://localhost:9003/biz/${req.params.businessId}?API=true`);
  promises.push(promise);
  promise = axios.get(`http://localhost:9003/biz/${req.params.businessId}/reviews/count`);
  promises.push(promise);

  Promise.all(promises)
    .then((arr) => {
      res.render('index', { businessName: arr[0].data.businessName, reviewCount: arr[1].data.count});
    });
});

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`)
});
