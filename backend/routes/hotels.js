const express = require('express');
const Hotel = require('../models/hotels');
const auth = require('../parsereqs/check-auth');

const router = express.Router();

//creating a new hotel
router.post('', auth, (req, res, next) => {
  const hotel = new Hotel({
    title: req.body.title,
    artist: req.body.artist,
    header: req.body.header,
    album: req.body.album,
    year: req.body.year,
    zeroByte: req.body.zeroByte,
    comment: req.body.comment,
    track: req.body.track,
    genre: req.body.genre
  });
  hotel.save().then(result => {
    res.status(201).json({
      message: 'Hotel added successfully.',
      hotelId: result._id
    });
  });
});

// fetching all hotels in the database
router.get('', (req, res, next) => {
  Hotel.find().then(documents => {
    console.log(documents);
    res.status(200).json({
      message: 'Hotel fetched successfully!',
      hotels: documents
    });
  });
});

//deleting a single hotel, specified by its id
router.delete('/:id', auth, (req, res, next) => {
  Hotel.deleteOne({
    _id: req.params.id
  }).then(result => {
    console.log(result);
    res.status(200).json({
      message: 'Hotel successfully deleted.'
    });
  });
});

module.exports = router;
