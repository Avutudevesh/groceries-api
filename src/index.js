const express = require("express");
const bodyParser = require("body-parser");
const graphQLHttp = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./schema");
const resolvers = require("./resolvers");
const auth = require("./middlewares/auth");

const app = express();
app.use(bodyParser.json());
app.use(auth);
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
	if (req.method === "OPTIONS") {
		return res.sendStatus(200);
	}
	next();
});

app.use(
	"/graphql",
	graphQLHttp({
		schema,
		rootValue: resolvers,
		graphiql: true,
	})
);

app.get("/", (req, res) => {
	res.send("Server running, visit /graphql route for graphql interface");
});
const MONGOOSE_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@groceries-cluster-omlgs.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
mongoose
	.connect(MONGOOSE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.catch((err) => console.log(err));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log("Server running");
});
