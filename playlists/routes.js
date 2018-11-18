const { Router } = require('express')
const Playlist = require('./model')
const Song =require('../songs/model')
const auth = require('../auth/auth') 

const router = new Router()

router.post('/playlists', auth, (req, res, next) => {
    Playlist
    .create({
        name: req.body.name,
        userId: req.user.id,
      })
      .then(playlist => {
        if (!playlist) {
            return res.status(404).send({
                message: `Playlist couln't be created`
            });
        }
        return res.status(200).send(playlist)
    })
    .catch(error => next(error))
})

router.get('/playlists', auth, (req, res, next) => {
    Playlist
    .findAll({
      where: { userId: req.user.id }
    })
    .then((playlists) => {
        return res.status(200).send({playlists})
    })
    .catch(error => next(error))
})

router.get('/playlists/:id', auth, (req, res, next) => {
    Playlist
    .findOne({
        where: {
          id: req.params.id,
          userId: req.user.id
        }
    })
    .then(playlist => {
        if (!playlist) {
          return res.status(404).send({
            message: `Please provide a valid playlist`
          })
        }
        return res.status(200).send(playlist)
    })
    .catch(error => next(error))
})

router.delete('/playlists/:id', auth, (req, res, next) => {
    
  Playlist
      .findById({
        where: {
          id: req.params.id,
        }
      })
      .then(playlist => {
        if (!playlist) {
          return res.status(404).send({
            message: `Please provide a valid playlist`
          })
        }
  
        Song.destroy({
            where: {
              playlistId: req.params.id
            }
          })
          .then(() => {
            playlist.destroy().then(() => {
              return res.status(200).send({
                message: `Playlist and songs were deleted`
              })
            })
            .catch(error => next(error))
          })
          .catch(error => next(error))
      })
      })
  
  module.exports = router