const resolvers = {
  Query: {
    helloworld: async () => {
      return 'hello world';
    }
    //me
  },
  // Mutations: {
  //login
  //addUser
  //saveBook
  //removeBook
  // },
  // User: {
  //_id
  // username
  // email
  // bookCount
  // savedBooks
  // },
  // Book: {
  //bookId
  //authors
  //description
  //title
  //image
  //link
  // },
  // Auth: {
  //token
  //user
  // }
}

module.exports = resolvers;