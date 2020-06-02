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
			const user = await User.findById(req.userId).populate("favourites");
			if (!user) {
				throw new Error("No user found");
			}
			const index = user.favourites.findIndex((item) => item._id == args._id);
			if (index != -1) {
				return user.favourites;
			}
			const product = await Product.findById(args._id);
			if (!product) {
				throw new Error("No product found");
			}
			user.favourites.push(product);
			await user.save();
			return user.favourites;
		} catch (err) {
			console.log(err);
		}
	},
	removeFromFavourites: async (args, req) => {
		if (!req.isAuth) {
			throw new Error("Unauthorized");
		}
		try {
			const user = await User.findById(req.userId).populate("favourites");
			if (!user) {
				throw new Error("No user found");
			}
			const index = user.favourites.findIndex(
				(productItem) => productItem._id == args._id
			);
			if (index != -1) {
				user.favourites.splice(index, 1);
				await user.save();
			}
			return user.favourites;
		} catch (err) {
			console.log(err);
		}
	},
};
