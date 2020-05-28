const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema({
	productId: {
		type: String,
		required: false,
	},
	title: {
		type: String,
		required: true,
	},
	imageUrl: {
		type: String,
		required: true,
	},
	newPrice: {
		type: String,
		required: true,
	},
	oldPrice: {
		type: String,
	},
	quantity: {
		type: String,
	},
	departmentId: {
		type: Number,
	},
	departmentName: {
		type: String,
	},
	aisleId: {
		type: Number,
	},
	aisleName: {
		type: String,
	},
	shelfId: {
		type: Number,
	},
	shelfName: {
		type: String,
	},
});

module.exports = mongoose.model("Product", productSchema);
