import React, { Component } from "react";
import styled from "styled-components";
import Link from "next/link";
import TimeAgo from "react-timeago";
import Like from "./Like";
import {endpoint} from "../config";

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
    id: any,
    content: string,
    user: any,
    media: any,
    date: any,
    likes: number,
    like: boolean
}> {
    render() {
        return(
            <div>
                <PostHeader>
                    <Avatar src={this.props.user.avatar ? this.props.user.avatar : "https://ui-avatars.com/api/?name=" + this.props.user.username} />
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
                <video controls={true} src={endpoint + this.props.media.uri + "480p.mp4"} />
                <Like id={this.props.id} count={this.props.likes} liked={this.props.like} />
            </div>
        )
    }
} 