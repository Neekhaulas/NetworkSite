import React, { Component } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import PostList from "./PostList";
import Follow from "./Follow";

const GET_USER = gql`
    query User($id: ID!) {
        user(id: $id) {
            id
            username
            avatar
            name
            followers
        }
    }
`;

export default class UserInfo extends Component<{
    id: number
}> {
    render() {
        return (
            <div>
                <Query
                    query={GET_USER}
                    variables={{id: this.props.id}}
                >
                    {({ loading, error, data }: any): any => {
                        if (loading) return <p>Loading...</p>
                        if (error) return <p>Error</p>
                        if (!data.user) return <p>This user doesn't exists</p>
                        
                        return(
                            <div>
                                <div>{data.user.username}</div>
                                <div>{data.user.name}</div>
                                <Follow user={data.user.id} followers={data.user.followers} />
                                <PostList user={data.user.id} />
                            </div>
                        )
                    }}
                </Query>
            </div>
        );
    }
}
