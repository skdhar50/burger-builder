const { Schema, model } = require("mongoose");

const orderSchema = Schema({
	user_id: Schema.Types.ObjectId,
	ingredients: [{ type: { type: String }, amount: Number }],
	customer: {
		deliveryAddress: String,
		phone: String,
		paymentMethod: String,
	},
	price: Number,
	orderTime: { type: Date, default: Date.now },
});

const Order = model('orders', orderSchema);

module.exports = Order;
