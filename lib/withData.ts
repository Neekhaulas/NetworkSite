import withApollo from 'next-with-apollo';
import {ApolloClient} from 'apollo-client';
import { endpointGraphQL } from '../config';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-boost';

function createClient({ headers } : any) {
  return new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: endpointGraphQL,
      credentials: 'include',
      headers,
    }),
    cache: new InMemoryCache(),
    // local data
    /*clientState: {
      resolvers: {
        Mutation: {
          toggleCart(_, variables, { cache }) {
            // read the cartOpen value from the cache
            const { cartOpen } = cache.readQuery({
              query: LOCAL_STATE_QUERY,
            });
            // Write the cart State to the opposite
            const data = {
              data: { cartOpen: !cartOpen },
            };
            cache.writeData(data);
            return data;
          },
        },
      },
      defaults: {
        cartOpen: false,
      },
    },*/
  });
}

export default withApollo(createClient);
