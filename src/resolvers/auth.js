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

			return { userId: result._doc._id, token, tokenExpiration: 1 };
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
		return { userId: user._doc._id, token, tokenExpiration: 1 };
	},
};
