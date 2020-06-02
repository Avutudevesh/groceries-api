const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
	createUser: async ({
		userInput: { name, email, password, phone, address },
	}) => {
		try {
			const user = await User.findOne({ email });
			if (user) {
				throw new Error("User already exists");
			}
			const hashedPassword = await bcrypt.hash(password, 12);
			const newUser = new User({
				name,
				email,
				password: hashedPassword,
				phone,
				address,
			});
			const result = await newUser.save();
			const token = jwt.sign(
				{ userId: result._doc._id, email: result._doc.email },
				process.env.TOKEN_SECRET,
				{
					expiresIn: "1h",
				}
			);

			return {
				userId: result._doc._id,
				token,
				tokenExpiration: 1,
				account: result._doc,
			};
		} catch (err) {
			throw err;
		}
	},
	login: async ({ email, password }) => {
		const user = await User.findOne({ email });
		if (!user) {
			throw new Error("User doesn't exist");
		}
		const isEqual = await bcrypt.compare(password, user._doc.password);
		if (!isEqual) {
			throw new Error("Invalid Credentials");
		}
		const token = jwt.sign(
			{ userId: user._doc._id, email: user._doc.email },
			process.env.TOKEN_SECRET,
			{
				expiresIn: "1h",
			}
		);
		return { userId: user._doc._id, token, tokenExpiration: 1, account: user };
	},
	accountDetails: async (args, req) => {
		if (!req.isAuth) {
			throw new Error("Unauthorized");
		}
		try {
			const user = await User.findById(req.userId);
			if (!user) {
				throw new Error("No user found");
			}
			return user;
		} catch (err) {
			console.log(err);
		}
	},
	editAccountDetails: async (
		{ accountInput: { name, email, phone, address } },
		req
	) => {
		if (!req.isAuth) {
			throw new Error("Unauthorized");
		}
		try {
			const user = await User.findById(req.userId);
			if (!user) {
				throw new Error("No user found");
			}
			user.name = name;
			user.email = email;
			user.phone = phone;
			user.address = address;
			await user.save();
			return user;
		} catch (err) {
			console.log(err);
		}
	},
};
