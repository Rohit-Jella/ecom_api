const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { signup, login } = require("../middlewares/validation");

exports.register = async (req, res) => {

  const { error } = signup(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email already exists..");

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });
  try {
    await user.save();
    res.status(200).send("Signup sucess");
  } catch (error) {
    res.send(error);
  }
};

exports.login = async (req, res) => {

  const { error } = login(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email does't exists");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid password");

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {expiresIn:"1h"} );
  const { _id, email, role } = user;
  res.status(200).send("login success");

};

exports.logout = (req, res) => {
    req.session.destroy();
    res.send('loggedout')
}
