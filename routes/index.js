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

router.get('/landing', function(req, res, next) {
  res.render('landing', { title: 'landing' });
});

router.post('/videos', function(req, res,next) {
  collection.insert({
  title: req.body.title,
  genre: req.body.genre,
  description: req.body.desc,
  image: req.body.image
  
  
  },function(err,video){
  
  if(err) throw err;
  res.redirect('/');
  });
  });



module.exports = router;
