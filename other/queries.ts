import { gql } from "apollo-boost";

export const FETCH_CURRENT_USER = gql`
  query {
    users {
      id
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
