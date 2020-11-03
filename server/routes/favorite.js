const express = require("express");
const router = express.Router();
const { Favorite } = require("../models/Favorite");

router.post("/favoriteNumber", (req, res) => {
  //몽고디비에서 favorite 숫자를 가져오기
  Favorite.find({ movieId: req.body.movieId }).exec((err, info) => {
    if (err) return res.status(400).send(err);
    //그 다음 프론트에 다시 숫자 정보를 보내주기
    res.status(200).json({ success: true, favoriteNumber: info.length });
  });
});

router.post("/favorited", (req, res) => {
  //내가 favorite리스트에 넣었는지 db 에서 확인
  Favorite.find({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, info) => {
    let result = false;
    if (info.length !== 0) {
      result = true;
    }
    res.status(200).json({ success: true, favorited: result });
  });
});

router.post("/removeFromFavorite", (req, res) => {
  Favorite.findOneAndDelete({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, doc) => {
    if (err) res.status(400).return(err);
    res.status(200).json({ success: true, doc });
  });
});

router.post("/addToFavorite", (req, res) => {
  const favorite = new Favorite(req.body);
  console.log(favorite, req.body);
  favorite.save((err, doc) => {
    if (err) res.status(400).return(err);
    return res.status(200).json({ success: true });
  });
});

router.post("/getFavoredMovie", (req, res) => {
  Favorite.find({
    userFrom: req.body.userFrom,
  }).exec((err, movie) => {
    if (err) res.status(400).return(err);
    res.status(200).json({ success: true, favoritedMovie: movie });
  });
});

router.post("/removeFromFavorites", (req, res) => {
  Favorite.findOneAndDelete({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, doc) => {
    if (err) res.status(400).send(err);
    res.status(200).json({ success: true });
  });
});

module.exports = router;
