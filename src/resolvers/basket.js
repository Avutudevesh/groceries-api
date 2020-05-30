const User = require("../models/user");
const Product = require("../models/product");
module.exports = {
	basket: async (args, req) => {
		if (!req.isAuth) {
			throw new Error("Unauthorized");
		}
		try {
			const user = await User.findById(req.userId).populate({
				path: "basket",
				populate: { path: "product" },
			});
			return user.basket;
		} catch (err) {
			console.log(err);
		}
	},
	updateBasket: async (args, req) => {
		console.log(args);
		if (!req.isAuth) {
			throw new Error("Unauthorized");
		}
		try {
			const user = await User.findById(req.userId).populate({
				path: "basket",
				populate: { path: "product" },
			});
			console.log(user);
			if (!user) {
				throw new Error("No user found");
			}
			const index = user.basket.findIndex(
				(productItem) => productItem.product._id == args.item._id
			);
			if (index != -1) {
				if (args.item.quantity <= 0) {
					user.basket.splice(index, 1);
				} else {
					user.basket[index].quantity = args.item.quantity;
				}
			} else {
				const product = await Product.findById(args.item._id);
				if (!product) {
					throw new Error("No product found");
				}
				user.basket.push({ quantity: args.item.quantity, product });
			}
			await user.save();
			console.log(user.basket);
			return user.basket;
		} catch (err) {
			console.log(err);
		}
	},
	emptyBasket: async (args, req) => {
		if (!req.isAuth) {
			throw new Error("Unauthorized");
		}
		try {
			const user = await User.findById(req.userId);
			console.log(user);
			if (!user) {
				throw new Error("No user found");
			}
			user.basket = [];
			await user.save();
			return { success: true };
		} catch (err) {
			console.log(err);
		}
	},
};
