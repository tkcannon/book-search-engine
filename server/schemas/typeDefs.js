const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type HelloWorld {
    message: String
  }
  type Query {
    helloworld: HelloWorld
  }
  `;
// Query: {
//   me
// },
// Mutations: {
//   //login
//   //addUser
//   //saveBook
//   //removeBook
// },
// User: {
//   //_id
//   // username
//   // email
//   // bookCount
//   // savedBooks
// },
// Book: {
//   //bookId
//   //authors
//   //description
//   //title
//   //image
//   //link
// },
// Auth: {
//   //token
//   //user
// }
// }



module.exports = typeDefs;