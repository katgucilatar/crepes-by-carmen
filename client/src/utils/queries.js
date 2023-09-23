// QUERIES: 
// use currentUser query on homepage to show user's name
// use currentUser query in checkout to save order
// use currentUser query in checkout to save delivery info

// use crepe query on product page to show ALL crepes
// use crepe query on each ITEM page to show crepe by id

import { gql } from "@apollo/client";

export const QUERY_CURRENT_USER = gql`
  query getCurrentUser($email: String!) {
    currentUser(email: $email): {
      _id
      email
      name
      myOrder {
        crepeId
        item
        price
        image
        addedToCart
      }
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
  }
`;

export const QUERY_CREPES = gql`
  query getCrepes {
    crepes {
      crepeId
      item
      description
      price
      image
      }
    }
`;