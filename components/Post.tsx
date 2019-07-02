import React, { Component } from "react";
import styled from "styled-components";
import Link from "next/link";
import TimeAgo from "react-timeago";
import Like from "./Like";
import { videoEndpoit } from "../config";
import { Block } from "./Style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

const PostHeader = styled.div`
    display: flex;
    flex-direction: row;
    margin: 10px;
    justify-content: space-between;
`;

const Avatar = styled.img`
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin-right: 10px;
`;

const Title = styled.div`
    flex: 1;
`;

const Video = styled.video`
    max-width: 100%;
    max-height: 480px;
`;

const Username = styled.div`
    color: white;

    a {
        color: white;
        text-decoration: none;
    }
`;

const RightHeader = styled.div`
    display: flex;
    align-items: flex-start;
`;

const LeftHeader = styled.div`
    display: flex;
    align-items: center;
`;

const PostInfo = styled.div`
    
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
        return (
            <Block>
                <PostHeader>
                    <LeftHeader>
                        <Link href={"/user?id=" + this.props.user.id}>
                            <a><Avatar src={this.props.user.avatar ? this.props.user.avatar : "https://ui-avatars.com/api/?name=" + this.props.user.username} /></a>
                        </Link>
                        <PostInfo>
                            <Title>{this.props.content}</Title>
                            <Username>
                                <Link href={"/user?id=" + this.props.user.id}>
                                    <a>{this.props.user.username}</a>
                                </Link>
                                -
                            <TimeAgo date={this.props.date} live={false} />
                            </Username>
                        </PostInfo>
                    </LeftHeader>
                    <RightHeader>
                        <FontAwesomeIcon icon={faEllipsisH} />
                    </RightHeader>
                </PostHeader>
                <Video loop={true} controls={true} src={videoEndpoit + this.props.media.uri + "480p.mp4"} />
                <Like id={this.props.id} count={this.props.likes} liked={this.props.like} />
            </Block>
        )
    }
} 
