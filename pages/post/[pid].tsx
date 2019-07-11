import Post from '../../components/Post';
import { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Comments from '../../components/Comments';
import Head from 'next/head';
import { videoEndpoit } from '../../config';

class PostPage extends Component<{
    id: string
}> {
    static async getInitialProps({ query } : any) {
        return {
            id: query.pid
        };
    }

    render() {
        return (
            <div>
                <Query
                    query={gql`
                    query Post($id: ID) {
                        post(id: $id) {
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
                    variables={{id: this.props.id}}
                >
                    {({ loading, error, data }: any): any => {
                        if (loading) return <p>Loading...</p>
                        if (error) return <p>Error</p>

                        return (
                            <>
                                <Head>
                                    <meta content={data.post.content} property={"og:title"} />
                                    <meta content={"N Joy"} property={"og:site_name"} />
                                    <meta content={videoEndpoit + data.post.media.uri + ".png"} property={"og:image"} />
                                </Head>
                                <Post id={data.post.id} content={data.post.content} user={data.post.user} media={data.post.media} date={data.post.createdAt} likes={data.post.likes} like={data.post.like} comments={data.post.comments} />
                            </>
                        );
                    }}
                </Query>
                <Comments id={this.props.id} />
            </div>
        )
    }
}

export default PostPage;