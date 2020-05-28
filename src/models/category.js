const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categorySchema = new Schema({
	id: {
		type: Number,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	filterImage: {
		type: String,
	},
	iconImage: {
		type: String,
	},
	level: {
		type: Number,
		required: true,
	},
	subcategories: [
		{
			type: Schema.Types.ObjectId,
			ref: "Category",
		},
	],
});

module.exports = mongoose.model("Category", categorySchema);
