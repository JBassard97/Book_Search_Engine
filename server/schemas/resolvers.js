// ! Good to go

const { User } = require("../models");
const { signToken } = require("./utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      try {
        return await User.find();
      } catch (err) {
        throw new Error(err);
      }
    },

    user: async (_, { id, username }) => {
      try {
        if (id) {
          return await User.findById(id);
        } else if (username) {
          return await User.findOne({ username });
        } else {
          throw new Error("Must provide either id or username");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    addUser: async (_, args) => {
      try {
        const user = await User.create(args);
        const token = signToken(user);
        return { token, user };
      } catch (err) {
        throw new Error(err);
      }
    },

    login: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("Can't find this user");
        }
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
          throw new Error("Wrong password!");
        }
        const token = signToken(user);
        return { token, user };
      } catch (err) {
        throw new Error(err);
      }
    },

    saveBook: async (_, { bookData }, { user }) => {
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $addToSet: { savedBooks: bookData } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      } catch (err) {
        throw new Error(err);
      }
    },

    removeBook: async (_, { bookId }, { user }) => {
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        if (!updatedUser) {
          throw new Error("Couldn't find user with this id!");
        }
        return updatedUser;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

module.exports = resolvers;
