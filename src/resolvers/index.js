const authResolvers = require("./auth");
const productResolvers = require("./products");
const categoryResolvers = require("./categories");
module.exports = {
	...authResolvers,
	...productResolvers,
	...categoryResolvers,
};
