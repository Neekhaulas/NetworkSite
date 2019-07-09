import { Component } from "react";
import { Query, Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import styled from "styled-components";
import { Button } from "./Style";

const ADD_COMMENT = gql`
    mutation AddComment($content: String!, $post: ID!) {
        addComment(content: $content, post: $post) {
            id
            content
            user {
                id
                username
            }
            createdAt
        }
    }
`;

const GET_COMMENTS = gql`
    query Comments($id: ID) {
        comments(id: $id) {
            id
            content
            user {
                id
                username
            }
        }
    }
`;

const Bold = styled.span`
    font-weight: 900;
`;

export default class Comments extends Component<{
    id: string
},
    {
        content: string
    }> {
    constructor(props: any) {
        super(props);

        this.state = {
            content: ''
        }
    }

    render() {
        return (
            <div>
                <Mutation
                    mutation={ADD_COMMENT}
                    variables={{ post: this.props.id, content: this.state.content }}
                    update={(cache: any, { data: { addComment } } : any) => {
                        const { comments } = cache.readQuery({ query: GET_COMMENTS, variables:{ id: this.props.id } });
                        cache.writeQuery({
                            query: GET_COMMENTS,
                            variables: { id: this.props.id },
                            data: { comments: [addComment].concat(comments) },
                        });
                    }}
                >
                    {(comment: any) => (
                        <div>
                            <form>
                                <textarea required={true} onChange={(e: any) => { this.setState({ content: e.target.value }) }} placeholder={"Add a comment..."}></textarea>
                                <Button type={"submit"} onClick={async e => {
                                    e.preventDefault();
                                    comment();
                                }}>
                                    Post
                                </Button>
                            </form>
                        </div>
                    )}
                </Mutation>
                <Query
                    query={GET_COMMENTS}
                    variables={{ id: this.props.id }}
                >
                    {({ loading, error, data }: any): any => {
                        if (loading) return <p>Loading...</p>
                        if (error) return <p>Error</p>

                        return data.comments.map(({ id, content, user }: any) => {
                            return (
                                <div key={id}>
                                    <Bold>{user.username}</Bold> {content}
                                </div>
                            );
                        });
                    }}
                </Query>
            </div>
        );
    }
}
