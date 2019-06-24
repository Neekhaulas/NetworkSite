import { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components";

const LIKE_POST = gql`
    mutation LIKE_POST($post: ID!) {
        like(post: $post)
    }
`;

const HeartContainer = styled.div`
    display: flex;
`;

const Heart = styled.button`
    display: flex;
    transition: opacity 100ms, transform 100ms ease-in-out;

    background-color: transparent;
    background-repeat: no-repeat;
    border: none;
    cursor: pointer;
    overflow: hidden;
    outline: none;
    color: #ffffff;
    font-size: 15px;
    
    &:active {
        transform: rotate(-25deg) scale(1.2);
    }
`;

const HeartLiked = styled.button`
    display: flex;
    transition: opacity 100ms, transform 100ms ease-in-out;

    background-color: transparent;
    background-repeat: no-repeat;
    border: none;
    cursor: pointer;
    overflow: hidden;
    outline: none;
    color: red;
    font-size: 15px;
    
    &:active {
        transform: rotate(-25deg) scale(1.2);
    }
`;

class Like extends Component<{
    id: any,
    count: number,
    liked: boolean
}, {
    count: number,
    liked: boolean
}> {
    constructor(props: any) {
        super(props);
        
        this.state = {
            count: props.count,
            liked: props.liked
        }
    }

    render() {
        return(
            <Mutation
                mutation={LIKE_POST}
                variables={{post: this.props.id}}
            >
                {(like: any) => (
                    <HeartContainer>
                        {this.state.liked ? (
                            <HeartLiked onClick={async e => {
                                e.preventDefault();
                                like();
                                this.setState({
                                    count: this.state.count - 1,
                                    liked: false
                                })
                            }} className={like?"liked":""}>
                                <FontAwesomeIcon icon={faHeart} />&nbsp;{this.state.count}
                            </HeartLiked>
                        ) : (
                            <Heart onClick={async e => {
                                e.preventDefault();
                                like();
                                this.setState({
                                    count: this.state.count + 1,
                                    liked: true
                                })
                            }} className={like?"liked":""}>
                                <FontAwesomeIcon icon={faHeart} />&nbsp;{this.state.count}
                            </Heart>
                        )}
                        
                    </HeartContainer>
                )}
            </Mutation>
        )
    }
}

export default Like;