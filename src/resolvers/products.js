const Product = require("../models/product");
module.exports = {
	specialOfferProducts: async () => {
		try {
			const products = await Product.find({ departmentId: 16, aisleId: 1160 });
			return products;
		} catch (err) {
			console.log(err);
		}
	},
	search: async (args) => {
		try {
			const products = await Product.find({ $text: { $search: args.query } });
			return products;
		} catch (err) {
			console.log(err);
		}
	},
};
