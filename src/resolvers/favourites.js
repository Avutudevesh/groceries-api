const User = require("../models/user");
const Product = require("../models/product");
module.exports = {
	favourites: async (args, req) => {
		if (!req.isAuth) {
			throw new Error("Unauthorized");
		}
		try {
			const user = await User.findById(req.userId).populate("favourites");
			return user.favourites;
		} catch (err) {
			console.log(err);
		}
	},
	addToFavourites: async (args, req) => {
		if (!req.isAuth) {
			throw new Error("Unauthorized");
		}
		try {
			const user = await User.findById(req.userId);
			if (!user) {
				throw new Error("No user found");
			}
			const product = await Product.findById(args._id);
			if (!product) {
				throw new Error("No product found");
			}
			user.favourites.push(product);
			user.save();
			return product;
		} catch (err) {
			console.log(err);
		}
	},
};
