let { users, cars } = require("../data");

const resolvers = {
  Query: {
    users: () => users,
    user: (_, { id }) => {
      const filteredUsers = users.filter(u => u.id === id);
      if (filteredUsers.length === 0) {
        return null;
      }

      return filteredUsers[0];
    }
  },
  Mutation: {
    makeUser: (parent, { id, name }) => {
      const user = { id, name };
      users.push(user);
      return user;
    },
    removeUser: (parent, { id }) => {
      const oldUsers = users;
      users = oldUsers.filter(user => user.id !== id);

      return users.length < oldUsers.length;
    }
  },
  User: {
    cars: ({ id }) => {
      return cars.filter(car => car.ownedBy === id);
    }
  }
};

module.exports = resolvers;
