const { User, Thought } = require('../models');

// serve responses
const resolvers = {
  Query: {
    // get all users
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('friends')
        .populate('thoughts');
    },
    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('friends')
        .populate('thoughts');
    },
    // parent = placeholder parameter, enable use of username in second paramenter
    thoughts: async (parent, { username }) => {
      //if usename exits, set params to an object with username as key to that value, otherwise return empty object
      const params = username ? { username } : {};
      //pass object into find method, if no username, will return every thought
      return Thought.find(params).sort({ createdAt: -1 });
    },
    // place this inside of the `Query` nested object right after `thoughts` 
    thought: async (parent, { _id }) => {
      return Thought.findOne({ _id });
    }
  }
};

module.exports = resolvers;