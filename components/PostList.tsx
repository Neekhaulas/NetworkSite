import React, { Component } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import Post from "./Post";

export default class PostList extends Component<{
    user?: any
}> {
    shouldComponentUpdate(nextProps: any) {
        console.log(nextProps);
        return false;
    }

    render() {
        return (
            <div>
                <Query
                    query={gql`
                    query Posts($user: ID) {
                        posts(user: $user) {
                        id
                        content
                        createdAt
                        user {
                            id
                            username
                            avatar
                        }
                        media {
                            id
                            uri
                        }
                        likes
                        like
                        }
                    }
                    `}
                    variables={{user: this.props.user}}
                >
                    {({ loading, error, data }: any): any => {
                        if (loading) return <p>Loading...</p>
                        if (error) return <p>Error</p>

                        return data.posts.map(({ id, content, user, media, createdAt, likes, like }: any) => (
                            <Post key={id} id={id} content={content} user={user} media={media} date={createdAt} likes={likes} like={like} />
                        ));
                    }}
                </Query>
            </div>
        );
    }
}
