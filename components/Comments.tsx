import { Component } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import TimeAgo from "react-timeago";

const GET_COMMENTS = gql`
    query Comments($id: ID) {
        comments(id: $id) {
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

export default class Comments extends Component<{
    id: string
}> {
    render() {
        return (
            <div>
                <Query
                    query={GET_COMMENTS}
                    variables={{id: this.props.id}}
                >
                    {({ loading, error, data }: any): any => {
                        if (loading) return <p>Loading...</p>
                        if (error) return <p>Error</p>
                        
                        return data.comments.map(({id, content, createdAt, user}: any) => {
                            return (
                                <div key={id}>
                                    {content} - <TimeAgo date={createdAt} live={false} /> - {user.username}
                                </div>
                            );
                        });
                    }}
                </Query>
            </div>
        );
    }
}
