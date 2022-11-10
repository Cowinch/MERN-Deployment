const User = require("../models/user.model");

module.exports.findAllUsers = (req, res) => {
  User.find().collation({ locale: 'en', strength: 2 }).sort({ name: 1 })
    .then(allDaUsers => res.json({ users: allDaUsers }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.findOneSingleUser = (req, res) => {
  User.findOne({ _id: req.params.id })
    .then(oneSingleUser => res.json({ user: oneSingleUser }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.createNewUser = (req, res) => {
  if (req.body.position == "Captain") {
    User.exists({ position: req.body.position })
      .then(userExists => {
        if (userExists) {
          // Promise.reject() will activate the .catch() below.
          return Promise.reject({errors: { position: { message: 'There can only be one captain!!'}}});
        }
        return User.create(req.body)

      })
      .then(newlyCreatedUser => res.json({ user: newlyCreatedUser }))
      .catch(err => res.status(400).json(err));
  } else {
    User.create(req.body)
      .then(newlyCreatedUser => res.json({ user: newlyCreatedUser }))
      .catch(err => res.status(400).json(err));
  }
};

module.exports.updateExistingUser = (req, res) => {
  User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(updatedUser => res.json({ user: updatedUser }))
    .catch(err => res.status(400).json(err));
};

module.exports.deleteAnExistingUser = (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then(result => res.json({ result: result }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};
