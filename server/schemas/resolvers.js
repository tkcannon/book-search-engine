const { AuthenticationError } = require("apollo-server-express");
const { User } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
  Query: {
    //me
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password');

        return userData;
      }
      throw new AuthenticationError('Not logged in')
    }
  },
  Mutation: {
    //addUser
    addUser: async (parent, { username, email, password }) => {
      console.log('adduser');
      const user = await User.create({ username, email, password });

      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      console.log('login')
      const user = await User.findOne({ email });
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
    saveBook: async (parent, args, context) => {
      console.log('savebook called');
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: args } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: bookId } } },
          { new: true }
        );
        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    }
  }
}

module.exports = resolvers;

// {
//   [0]   username: 'testuser',
//   [0]   email: 'testuser@test.com',
//   [0]   _id: '623a1faf08c496037c0015fc'
//   [0] 
// }
