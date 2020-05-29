const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type Category {
        _id: ID!
        id: Int!
        name: String!
        image: String!
        filterImage: String!
        iconImage: String!
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
        name:String!
        email:String!
        password:String
        favourites: [Product!]
        basket: [Product!]
        phone: String!
        address: Address!
    }

    type Address {
        line1: String!
        line2: String
        city: String!
        state: String!
        pincode:String!
    }

    input AddressInput {
        line1: String!
        line2: String
        city: String!
        state: String!
        pincode:String!
    }

    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }

    input UserInput {
        name: String!
        email: String!
        password: String!
        phone:String!
        address: AddressInput!
    }

    type RootQuery {
        departments: [Category!]!
        subcategories(id:ID!): [Category!]!
        categories: [Category]!
        categoryProducts(departmentId:Int, aisleId:Int, shelfId:Int): [Product!]!
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
