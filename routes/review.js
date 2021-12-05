var express = require('express');
var router = express.Router();
var reviewService = require('../service/reviewService');

router.get('/', async function(req, res, next){
    reviewService.addReview(req.body);
})