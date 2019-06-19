import { gql } from "apollo-boost";

export const FETCH_CURRENT_USER = gql`
  query {
    me {
      id
      username
      avatar
    }
  }
`;

export const LISTS_QUERY = gql`
  query {
    lists {
      id
      name
      order
      todos {
        id
        content
      }
    }
  }
`;
