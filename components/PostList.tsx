import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import Post from "./Post";

export default function PostList() {
    return (
        <div>
            <Query
                query={gql`
                query {
                    posts {
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
                    }
                }
                `}
            >
                {({ loading, error, data }: any): any => {
                    if (loading) return <p>Loading...</p>
                    if (error) return <p>Error</p>

                    return data.posts.map(({ id, content, user, media, createdAt }: any) => (
                        <Post key={id} content={content} user={user} media={media} date={createdAt} />
                    ));
                }}
            </Query>
        </div>
    );
}
