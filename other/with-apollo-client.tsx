import React from "react";
import initApollo from "./init-apollo";
import { NextAppContext } from "next/app";
import { ApolloClient, NormalizedCacheObject } from "apollo-boost";

interface ApolloProps {
  apolloState: NormalizedCacheObject;
}

// TODO: type 'App' below
export default (App: any) => {
  return class Apollo extends React.Component<ApolloProps> {
    private apolloClient: ApolloClient<NormalizedCacheObject>;

    static displayName = "withApollo(App)";

    static async getInitialProps(appCtx: NextAppContext) {
      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(appCtx);
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      let apollo: ApolloClient<NormalizedCacheObject> | undefined;

      // Extract query data from the Apollo store
      // On the client side, initApollo() below will return the SAME Apollo
      // Client object over repeated calls, to preserve state.
      if (!apollo) apollo = initApollo();
      const apolloState = apollo.cache.extract();

      return {
        ...appProps,
        apolloState
      };
    }

    constructor(props: ApolloProps) {
      super(props);
      this.apolloClient = initApollo(props.apolloState);
    }

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  };
};
