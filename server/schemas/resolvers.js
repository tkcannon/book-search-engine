const { AuthenticationError } = require("apollo-server-express");
const { User } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
  Query: {
    //me
    me: async (parent, args, context) => {
      console.log('called query me: ', args, context);
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password');

        return userData;
      }
      throw new AuthenticationError('Not logged in')
    },
    u: async () => {
      const users = await User.find()
        .select('-__v');
      if (users) {
        console.log(users);
        return users;
      }
      throw new console.error('Failed to find Users');
    },
  },
  Mutations: {
    //addUser
    addUser: async (parent, args) => {
      console.log('called adduser: ', args);
      const user = await User.create({ args });

      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email: email });
      console.log('Called Login', user);
      if (!user) {
        throw new AuthenticationError('Incorrect Login Info');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect Login Info');
      }

      const token = signToken(user);
      return { token, user };
    },
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
  }
}

module.exports = resolvers;

// {
//   [0]   username: 'testuser',
//   [0]   email: 'testuser@test.com',
//   [0]   _id: '623a1faf08c496037c0015fc'
//   [0] 
// }
