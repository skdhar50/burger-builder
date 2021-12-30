const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const app = require("./app");

mongoose
	.connect(process.env.MONGODB_SERVER)
	.then(() => console.log("Connected to MongoDB!"))
	.catch((err) => console.log("Error connecting to MongoDB!"));

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Connected to port ${port}`));
