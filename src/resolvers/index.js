const Category = require("../models/category");
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
};
