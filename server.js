const express = require('express')
const path = require('path');
const morgan  = require('morgan');
const axios = require('axios');
const app = express();

const reviewsURL = process.env.REVIEWS_URL;
const photoGalleryURL = process.env.PHOTO_GALLERY_URL;
const businessInfoURL = process.env.BUSINESS_INFO_URL;
const relatedURL = process.env.RELATED_URL;

const port = process.env.PORT || 9000;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));

app.get('/biz/:businessId/', (req, res) => {
  const promises = [];
  let promise = axios.get(`${reviewsURL}/biz/${req.params.businessId}?API=true`);
  promises.push(promise);
  promise = axios.get(`${reviewsURL}/biz/${req.params.businessId}/reviews/count`);
  promises.push(promise);

  Promise.all(promises)
    .then((arr) => {
      res.render('index', { businessName: arr[0].data.businessName, reviewCount: arr[1].data.count, reviewsURL, photoGalleryURL, businessInfoURL, relatedURL});
    });
});

app.get('/', (req, res) => { res.redirect('/biz/201') });

app.listen(port, () => {
  console.log(`server running at port ${port}`)
});
