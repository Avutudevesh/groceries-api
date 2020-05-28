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

    type User {
        _id:ID!
        email:String!
        password:String
    }

    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }

    input UserInput {
        email: String!
        password: String!
    }

    type RootQuery {
        categories: [Category]!
        categoryProducts(departmentId:Int!, aisleId:Int!, shelfId:Int): [Product!]!
        specialOfferProducts:[Product!]!
        search(query:String!):[Product!]!
        login(email:String!, password:String!): AuthData!
    }

    type RootMutation {
        createUser(userInput: UserInput): User
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
