import React, { Component } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import Post from "./Post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const VisibilitySensor = require('react-visibility-sensor').default;

export default class PostList extends Component<{
    user?: any
}> {
    render() {
        return (
            <div>
                <Query
                    query={gql`
                    query Posts($user: ID, $first: Int, $after: String) {
                        posts(user: $user, first: $first, after: $after) {
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
                        comments
                        }
                    }
                    `}
                    variables={{ user: this.props.user, first: 5 }}
                >
                    {({ loading, error, data, fetchMore }: any): any => {
                        if (loading) return <p>Loading...</p>
                        if (error) return <p>Error</p>

                        function loadMore(this: any, isVisible: boolean) {
                            if (!isVisible) return;
                            fetchMore({
                                variables: {
                                    after: data.posts[data.posts.length - 1].id,
                                    user: this.props.user,
                                    first: 5
                                },
                                updateQuery: (prev: any, { fetchMoreResult }: any) => {
                                    if (!fetchMoreResult) return prev;
                                    return Object.assign({}, prev, {
                                        posts: [...prev.posts, ...fetchMoreResult.posts]
                                    });
                                }
                            })
                        }

                        return (
                            <div>
                                {(data.posts.map(({ id, content, user, media, createdAt, likes, like, comments }: any) => (
                                    <Post key={id} id={id} content={content} user={user} media={media} date={createdAt} likes={likes} like={like} comments={comments} />
                                )))}
                                <VisibilitySensor onChange={loadMore.bind(this)}>
                                    <div>
                                        <FontAwesomeIcon icon={faSpinner} spin={true} />
                                    </div>
                                </VisibilitySensor>
                            </div>
                        );
                    }}
                </Query>
            </div>
        );
    }
}
