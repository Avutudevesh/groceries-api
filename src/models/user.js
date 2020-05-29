const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	favourites: [
		{
			type: Schema.Types.ObjectId,
			ref: "Product",
		},
	],
	basket: [
		{
			type: Schema.Types.ObjectId,
			ref: "Product",
		},
	],
	address: {
		line1: {
			type: String,
			required: true,
		},
		line2: {
			type: String,
		},
		pincode: {
			type: String,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
		state: {
			type: String,
			required: true,
		},
	},
});

module.exports = mongoose.model("User", userSchema);
