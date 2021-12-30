const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User } = require("../models/user");

const addUser = async (req, res) => {
	let user = await User.findOne({ email: req.body.email });

	if (user) return res.status(401).send("User already exists!");

	user = new User(_.pick(req.body, ["name", "email", "password"]));
	user.password = await bcrypt.hash(req.body.password, 10);

	try {
		const newUser = await user.save();
		if (!newUser) return res.status(401).send("User not created!");
		const token = user.generateJWT();

		return res.status(200).send({
			token: token,
			user: _.pick(newUser, ["_id", "email"]),
		});
	} catch (err) {
		const errMsg = [];
		for (field in err.errors) {
			errMsg.push(err.errors[field].message);
		}
		return res.send(errMsg);
	}
};

const signIn = async (req, res) => {
	const user = await User.findOne({ email: req.body.email });

	if (!user) return res.status(401).send("Authantication Failed!");

	const validUser = await bcrypt.compare(req.body.password, user.password);

	if (!validUser) return res.status(401).send("Authantication Failed!");

	const token = user.generateJWT();
	res.status(200).send({ token: token });
};

router.route("/").post(addUser);
router.route("/auth").post(signIn);

module.exports = router;
