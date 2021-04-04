const express = require('express');
const Review = require('../models/reviews');

const router = express.Router();

//creating a new review
router.post('', (req, res, next) => {
  const review = new Review({
    rating: req.body.rating,
    review: req.body.review,
    hotelName: req.body.hotelName,
    username: req.body.username
  });
  review.save().then(result => {
    res.status(201).json({
      message: 'Review added successfully.',
      reviewId: result._id
    });
  });
});

//fetching all reviews in database
router.get('', (req, res, next) => {
  Review.find().then(documents => {
    console.log(documents);
    res.status(200).json({
      message: 'Review fetched successfully!',
      reviews: documents
    });
  });
});

module.exports = router;
