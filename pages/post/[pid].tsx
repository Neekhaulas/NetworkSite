import Post from '../../components/Post';
import Report from '../../components/Report';
import { Component } from 'react';
import gql from 'graphql-tag';
import Comments from '../../components/Comments';
import Head from 'next/head';
import { videoEndpoit, siteURI } from '../../config';
import { ApolloClient, NormalizedCacheObject } from 'apollo-boost';

const GET_POST = gql`
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
`;

class PostPage extends Component<{
    id: string,
    post: any
}> {
    static async getInitialProps({ query, apolloClient } : {query: any, apolloClient: ApolloClient<NormalizedCacheObject>}) {
        let postQuery = await apolloClient.query({
            query: GET_POST,
            variables: {
                id: query.pid
            },
        });
        return {
            post: postQuery.data.post,
            id: query.pid
        };
    }

    render() {
        return (
            <div>
                <Head>
                    <meta property={"og:title"} content={this.props.post.content} />
                    <meta property={"og:site_name"} content={"N Joy"} />
                    <meta property={"og:image"} content={videoEndpoit + this.props.post.media.uri + ".png"} />
                    <meta property={"og:url"} content={siteURI + "post/" + this.props.post.id } />
                    <meta property={"og:type"} content={"video.other"} />
                    <meta property={"og:video"} content={videoEndpoit + this.props.post.media.uri + "480p.mp4"} />
                </Head>
                <Post id={this.props.post.id} content={this.props.post.content} user={this.props.post.user} media={this.props.post.media} date={this.props.post.createdAt} likes={this.props.post.likes} like={this.props.post.like} comments={this.props.post.comments} />
                <Report />
                <Comments id={this.props.id} />
            </div>
        )
    }
}

export default PostPage;