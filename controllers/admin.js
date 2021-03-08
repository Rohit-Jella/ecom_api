const Admin = require("../models/admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { signup, login } = require("../middlewares/validation")

exports.register = async (req, res) => {

  const { error } = signup(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const emailExists = await Admin.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email already exists..");

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const admin = new Admin({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });
  try {
    await admin.save();
    res.status(200).send("Signup success");
  } catch (error) {
    res.send(error);
  }
};

exports.login = async (req, res) => {
  
  const { error } = login(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const admin = await Admin.findOne({ email: req.body.email });
  if (!admin) return res.status(400).send("Email does't exists");

  const validPassword = await bcrypt.compare(req.body.password, admin.password);
  if (!validPassword) return res.status(400).send("Invalid password");

  const token = jwt.sign({ _id: admin._id }, process.env.ADMIN_TOKEN_SECRET, {expiresIn:"1h"} );
  res.cookie("token", token, { expiresIn: "1d" });
  res.status(200).send("login success");

};

exports.logout = (req, res) => {
    req.session.destroy();
    res.send('loggedout')
}
