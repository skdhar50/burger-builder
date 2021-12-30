const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const auth = require("../middlewares/auth");

const addOrder = async (req, res) => {
	const order = new Order(req.body);

	try {
		const newOrder = await order.save();
		return res.status(200).send(newOrder);
	} catch (err) {
		return res.status(400).send("Order Failed");
	}
};

const orderList = async (req, res) => {
	const orders = await Order.find({ userId: req.user._id }).sort({
		orderTime: -1,
	});

	res.status(200).send(orders);
};

router.route("/").get(auth, orderList).post(auth, addOrder);

module.exports = router;
