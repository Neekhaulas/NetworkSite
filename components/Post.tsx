import React, { Component } from "react";
import styled from "styled-components";
import Link from "next/link";
import TimeAgo from "react-timeago";

const PostHeader = styled.div`
    display: flex;
    flex-direction: row;
`;

const Avatar = styled.img`
    border-radius: 50%;
    width: 50px;
    height: 50px;
`;

const Title = styled.div`
    flex: 1;
`;

const Username = styled.div`

`;

const RightHeader = styled.div`

`;

export default class Post extends Component<{
    content: string,
    user: any,
    media: any,
    date: any
}> {
    render() {
        return(
            <div>
                <PostHeader>
                    <Avatar src={this.props.user.avatar} />
                    <RightHeader>
                        <Title>{this.props.content}</Title>
                        <Username>
                            <Link href={"/user?id=" + this.props.user.id}>
                                <a>{this.props.user.username}</a>
                            </Link>
                            -
                            <TimeAgo date={this.props.date} live={false} />
                        </Username>
                    </RightHeader>
                </PostHeader>
                <video src={this.props.media.uri} />
            </div>
        )
    }
} 