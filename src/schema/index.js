const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type Category {
        _id: ID!
        id: Int!
        name: String!
        image: String!
        subcategories: [Category!]!
    }
    type RootQuery {
        categories: [Category]!
    }

    schema {
        query: RootQuery
    }
`);
