// import user model
const { User, Order } = require('../models');
// import sign token function from auth
const { signToken, AuthenticationError } = require('../utils/auth');

// QUERIES: 
// get me(user),
// get single food item (displays on food item page)
// get all food items (displays on menu page)
// get all food items **user added to cart** (displays in user's cart)
const resolvers = {
    Query: {
        currentUser: async (parent, { email }) => User.findOne({ email }),
        crepes: async () => { 
            return Order.find(); 
        }
    },


// MUTATIONS:
// add item to cart (add button on food item page/menu page)
// delete item from cart (delete button in cart)
// register user (sign up page)
// login user (login page)
// add delivery info (delivery page)
Mutation: {
    register: async (parent, { email, name, password }) => {
      const user = await User.create({ email, name, password });
      const token = signToken(user);
      return { token, currentUser: user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, currentUser: user };
    },

    addToCart: async (parent, { userId, crepeId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: userId },
          {
            $addToSet: { myOrder: crepeId },
          },
          {
            new: true,
            runValidators: true,
          }
        );

        const token = signToken(updatedUser);
        return { token, currentUser: updatedUser };
      } else {
        throw new AuthenticationError("User not authenticated");
      }
    },

    deleteFromCart: async (parent, { crepeId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id }, // added exception in eslintrc
          { $pull: { myOrder: crepeId } },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
    addDeliveryInfo: async (parent, { userId, deliveryId }, context) => {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            {
              $addToSet: { deliveryInfo: deliveryId },
            },
            {
              new: true,
              runValidators: true,
            }
          );
  
          const token = signToken(updatedUser);
          return { token, currentUser: updatedUser };
        } else {
          throw new AuthenticationError("User not authenticated");
        }
      }
  }
};

module.exports = resolvers;

