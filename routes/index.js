var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/signup', function(req, res, next) {
  res.render('signUpForm', { title: 'signup' });
});

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'login' });
});



module.exports = router;
