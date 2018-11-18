const { Router } = require("express");
const User = require("./model");
const bcrypt = require("bcrypt");

const router = new Router();

router.post("/users", (req, res) => {
  if (!(req.body.email.includes("email") || req.body.email === "")) {
    return res.status(400).send({
      message: "Please provide a valid email"
    });
  } else if (
    !req.body.includes("password") ||
    req.body.password !== req.body.password_confirmation
  ) {
    return res.status(400).send({
      message: `Please provide a valid password`
    });
  } else {
    const newUser = {
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10)
    };

    User.create(newUser)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: `Please provide valid credentials`
          });
        }
        return res.status(201).send(user);
      })
      .catch(error => next(error));
  }
});

module.exports = router;
