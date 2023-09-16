const { gql } = require("apollo-server");

const typeDefs = gql`
type User {
  _id: ID!
  email: String!
  name String!
  myOrder: [Order]
  deliveryInfo: [Delivery]
}

type Auth {
  token: ID!
  currentUser: User
}

type Order {
  crepeId: ID!
  item: String!
  description: String
  price: Int!
  image: String
  addedToCart: Boolean = true
}

input OrderInput {
    crepeId: ID!
    item: String!
    description: String
    price: Int!
    image: String
    addedToCart: Boolean = true
  }

type Delivery {
    deliveryId: ID!
    addressLineOne: String!
    addressLineTwo: String
    city: String!
    state: String!
    zipCode: Int!
    deliveryInstructions: String
    deliveryTime: String
  }
  
input DeliveryInput {
    deliveryId: ID!
    addressLineOne: String!
    addressLineTwo: String
    city: String!
    state: String!
    zipCode: Int!
    deliveryInstructions: String
    deliveryTime: String
  }

type Query {
  currentUser(email: String!): User
  userOrder: [Order!]!
  allCrepes: [Order]!
  singleCrepe(crepeId: ID!): Order!
}

type Mutation {
register(
  email: String!
  name: String!
  password: String!
): Auth
login(email: String!, password: String!): Auth
addToCart(newOrder: OrderInput!): User
deleteFromCart(crepeId: ID!): User
addDeliveryInfo(newDelivery: DeliveryInput!): User
}
`;