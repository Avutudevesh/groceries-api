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
        _id: ID!
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
        favourites: [Product!]
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
        favourites:[Product!]
        basket: [Product!]
    }

    type RootMutation {
        createUser(userInput: UserInput): User
        addToFavourites(_id: ID!): Product
        addToBasket(_id:ID!): [Product!]
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
