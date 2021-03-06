import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

const LOGOUT_MUTATION = gql`
  mutation LOGOUT_MUTATION {
    logout
  }
`;

const Logout = () => (
  <Mutation mutation={LOGOUT_MUTATION} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
    {(signout: any) => <button onClick={signout}>Log Out</button>}
  </Mutation>
);
export default Logout;
