const { Router } = require('express')
const { toJWT } = require('./jwt')
const User = require('../users/model')
const bcrypt = require('bcrypt')

const router = new Router()

router.post('/tokens', (req, res, next) => {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({
        message: `Please provide a valid email and password`
      })
    }
  
    User.findOne({
        where: {email: req.body.email}
      })
      .then(newUser => {
        if (!newUser) {
          res.status(404).send({
            message: 'Please provide a valid email'
          })
        }
  
        else if (bcrypt.compareSync(req.body.password, newUser.password)) {
          res.send({
            token: toJWT({ userId: newUser.id })
          })
        }
        else {
          res.status(400).send({
            message: 'PLease provide a valid password'
          })
        }
      })
      .catch(err => {
        console.error(err)
        res.status(500).send({
          message: 'Something went wrong'
        })
      })
  })
  
  module.exports = router
