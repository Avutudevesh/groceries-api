const Category = require("../models/category");
const Product = require("../models/product");
module.exports = {
	categories: async () => {
		try {
			const categories = await Category.find().populate({
				path: "subcategories",
				populate: { path: "subcategories" },
			});
			return categories;
		} catch (err) {
			console.log(err);
		}
	},
	categoryProducts: async (args, req) => {
		try {
			const products = await Product.find({ ...args });
			return products;
		} catch (err) {
			console.log(err);
		}
	},
	departments: async () => {
		try {
			const categories = await Category.find({ level: 1 });
			return categories;
		} catch (err) {
			console.log(err);
		}
	},
	subcategories: async (args) => {
		try {
			const categories = await Category.findById(args.id).populate(
				"subcategories"
			);
			return categories.subcategories;
		} catch (err) {
			console.log(err);
		}
	},
};
