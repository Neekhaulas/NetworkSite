import { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Button } from "./Style";

const FOLLOW_USER = gql`
    mutation FOLLOW_USER($user: ID!) {
        follow(user: $user)
    }
`;

export default class Follow extends Component<{
    user: any,
    followers: number
}> {
    render() {
        return (
            <Mutation
                mutation={FOLLOW_USER}
                variables={{user: this.props.user}}
            >
                {(follow: any) => (
                    <Button onClick={async e => {
                        e.preventDefault();
                        follow();
                    }}>Follow {this.props.followers}</Button>
                )}
            </Mutation>
        )
    }
}