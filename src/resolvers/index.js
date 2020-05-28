const authResolvers = require("./auth");
const productResolvers = require("./products");
const categoryResolvers = require("./categories");
const favouritesResolvers = require("./favourites");
module.exports = {
	...authResolvers,
	...productResolvers,
	...categoryResolvers,
	...favouritesResolvers,
};
