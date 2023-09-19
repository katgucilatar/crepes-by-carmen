// MUTATIONS:
// add item to cart (add button on food item page/menu page)
// delete item from cart (delete button in cart)
// register user (sign up page)
// login user (login page)
// add delivery info (delivery page)

import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      currentUser {
        email
        name
        _id
      }
      token
    }
  }
`;

export const REGISTER_USER = gql`
  mutation register(
    $name: String!
    $email: String!
    $password: String!
  ) {
    register(
      name: $name
      email: $email
      password: $password
    ) {
      currentUser {
        name
      }
      token
    }
  }
`;

export const ADD_TO_CART = gql`
  mutation addToCart($newOrder: OrderInput!) {
    addToCart(newOrder: $newOrder) {
      currentUser {
        _id
        email
        myOrder {
            crepeId
            item
            price
            image
            addedToCart
          }
      }
      token
    }
  }
`;

export const DELETE_FROM_CART = gql`
  mutation deleteFromCart($crepeId: ID!) {
    deleteFromCart(crepeId: $crepeId) {
      _id
      email
      myOrder {
        crepeId
        item
        price
        image
        addedToCart
      }
    }
  }
`;

export const ADD_DELIVERY_INFO = gql`
  mutation addDeliveryInfo($newDelivery: DeliveryInput!) {
    addDeliveryInfo(newDelivery: $newDelivery) {
      currentUser {
        _id
        email
        deliveryInfo {
            deliveryId
            addressLineOne
            addressLineTwo
            city
            state
            zipCode
            deliveryInstructions
            deliveryTime
          }
      }
      token
    }
  }
`;