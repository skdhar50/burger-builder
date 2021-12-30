const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = Schema({
	name: {
		type: String,
		required: [true, "You must provide a name!"],
		minLength: [3, "Name must be at least 3 characters!"],
	},
	email: {
		type: String,
		required: [true, "You must provide an email address"],
		unique: true,
		validate: {
			validator: (value) =>
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
					value.toLowerCase()
				),
			message: "Given email is not valid!",
		},
	},
	password: {
		type: String,
		required: [true, "Password is required!"],
		minLength: [6, "Password must be at least 6 characters"],
		maxLength: 1024,
	},
	role: {
		type: String,
		enum: ["admin", "user"],
		default: "user",
	},
});

userSchema.methods.generateJWT = function () {
	const token = jwt.sign(
		{ _id: this.id, email: this.email, role: this.role },
		process.env.JWT_SECRET_KEY,
		{ expiresIn: "1h" }
	);
	return token;
};

const User = model("users", userSchema);
module.exports.User = User;
