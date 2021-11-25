var express = require('express');
var router = express.Router();
var userService = require('../service/userService');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  res.json(await userService.fetchAllUsers());
});

/*
  POST request to validate User 
  Required request body format
    {
      email : '',
      password : ''
    }
  Returns True if user exists and false otherwise. 
*/
router.post('/isValid', function(req, res, next){
  res.json(userService.isUserExisting(req.body.email, req.body.password));
});

/*
  POST request to add new User 
  Required request body format
    {
      first_name : '',
      middle_name : '',
      last_name : '',
      email_id : '',
      password : ''
    }
  Returns True if new user added otherwise false. 
*/
router.post('/add', async function(req, res, next){
  let user = req.body;
  res.json(await userService.addUser(user));
});

module.exports = router;
