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
	specialOfferProducts: async () => {
		try {
			const products = await Product.find({ departmentId: 16, aisleId: 1160 });
			return products;
		} catch (err) {
			console.log(err);
		}
	},
};
