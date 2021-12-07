var express = require('express');
var router = express.Router();
var userService = require('../service/userService');

/* GET home page. */
router.get('/signup', function(req, res, next) {
  res.render('signUpForm', { title: 'signup' });
});

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'login' });
});

router.post('/login', async function(req, res, next) {
  let session = req.session;
  if(req.body.emailAddress === 'admin@boatrentals.com' && req.body.password === 'admin2021'){
    session.emailId = 'admin@boatrentals.com';
    session.password = 'admin2021'
    return res.json({
      isValidUser : true,
      redirectUrl : '/boats/admin'
    });
  }
  if(!(await userService.isUserExisting(req.body.emailAddress, req.body.password))){
    return res.json({
      isValidUser : false,
      redirectUrl : ''
    });
  }
  session.emailId = req.body.emailAddress;
  session.password = req.body.password;
  res.json({
      isValidUser : true,
      redirectUrl : '/boats'
    });
})

module.exports = router;
