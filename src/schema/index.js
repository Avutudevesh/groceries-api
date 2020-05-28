const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type Category {
        _id: ID!
        id: Int!
        name: String!
        image: String!
        subcategories: [Category!]!
    }
    type Product {
        productId: String!
        title: String!
        imageUrl: String!
        newPrice: String!
        quantity: String!
    }
    type RootQuery {
        categories: [Category]!
        categoryProducts(departmentId:Int!, aisleId:Int!, shelfId:Int): [Product!]!
    }

    schema {
        query: RootQuery
    }
`);
