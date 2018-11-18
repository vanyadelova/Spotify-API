const { Router } = require("express");
const Song = require("./model");
const auth = require("../auth/auth");

const router = new Router();

router.post("/playlists/:id/songs", auth, (req, res, next) => {
  const { artist, album, title } = req.body;

  if (!artist) {
    return res.status(400).send({
      message: `Please provde a valid artist`
    });
  } else if (!album) {
    return res.status(400).send({
      message: `Please provide a valid album`
    });
  } else if (!title)
    return res.status(400).send({
      message: `Please provide a valid song`
    });

  Song.create({
    artist: artist,
    album: album,
    title: title,
    playlistId: req.params.id
  })
    .then(song => {
      if (!song) {
        return res.status(404).send({
          message: `Couldn't create song`
        });
      }
      return res.status(201).send(song);
    })
    .catch(error => next(error));
});

module.exports = router;
