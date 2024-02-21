// ! Good to go

const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    savedBooks: [Book]!
    bookCount: Int
  }

  type Book {
    bookId: ID! # Change to ID type
    authors: [String!]!
    description: String!
    title: String!
    image: String
    link: String
  }

  input BookInput {
    authors: [String!]!
    description: String!
    bookId: String!
    title: String!
    image: String
    link: String
  }

  type Query {
    users: [User]!
    user(username: String!): User
    me: User # Add me query
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(bookData: BookInput!): User
    removeBook(bookId: String!): User
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
