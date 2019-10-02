let { users, cars } = require("../data");

const resolvers = {
  Query: {
    cars: (parent, args, { models }) => models.Car.cars,
    car: (_, { id }, { models }) => {
      const filteredCars = models.Car.cars.filter(car => car.id === id);
      if (filteredCars.length === 0) {
        return null;
      }

      return filteredCars[0];
    }
  },
  Mutation: {
    makeCar: (_, { id, make, model, color }, { models }) => {
      const car = { id, make, model, color, ownedBy: "1" };
      models.Car.cars.push(car);
      return car;
    },
    removeCar: (_, { id }, { models }) => {
      const oldCars = models.Car.cars;
      models.Car.cars = oldCars.filter(car => car.id !== id);

      return models.Car.cars.length < oldCars.length;
    }
  },
  Car: {
    owner: (parent, _, { models }) => {
      const filteredUsers = models.User.users.filter(
        user => user.id === parent.ownedBy
      );
      if (!filteredUsers) {
        return null;
      }
      return filteredUsers[0];
    }
  }
};

module.exports = resolvers;
