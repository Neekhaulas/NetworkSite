import { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import styled from "styled-components";

const FOLLOW_USER = gql`
    mutation FOLLOW_USER($user: ID!) {
        follow(user: $user)
    }
`;

const FollowButton = styled.button`

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
                    <FollowButton onClick={async e => {
                        e.preventDefault();
                        follow();
                    }}>Follow {this.props.followers}</FollowButton>
                )}
            </Mutation>
        )
    }
}