const User = require("../models/user");
const Product = require("../models/product");
module.exports = {
	basket: async (args, req) => {
		if (!req.isAuth) {
			throw new Error("Unauthorized");
		}
		try {
			const user = await User.findById(req.userId).populate("basket");
			return user.basket;
		} catch (err) {
			console.log(err);
		}
	},
	addToBasket: async (args, req) => {
		if (!req.isAuth) {
			throw new Error("Unauthorized");
		}
		try {
			const user = await User.findById(req.userId).populate("basket");
			if (!user) {
				throw new Error("No user found");
			}
			const product = await Product.findById(args._id);
			if (!product) {
				throw new Error("No product found");
			}
			user.basket.push(product);
			user.save();
			return user.basket;
		} catch (err) {
			console.log(err);
		}
	},
};
