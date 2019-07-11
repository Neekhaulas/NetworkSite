import React, { Component, createRef, RefObject } from "react";
import styled from "styled-components";
import Link from "next/link";
import TimeAgo from "react-timeago";
import Like from "./Like";
import { videoEndpoit } from "../config";
import { Block } from "./Style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faComment } from "@fortawesome/free-solid-svg-icons";

const VisibilitySensor = require('react-visibility-sensor').default;

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

const Comments = styled.div`
    display: inline-block;
`;

const PostFooter = styled.div`
    display: flex;
`;

export default class Post extends Component<{
    id: any,
    content: string,
    user: any,
    media: any,
    date: any,
    likes: number,
    like: boolean,
    comments: number
}> {
    public videoPlayer: RefObject<HTMLVideoElement>;

    constructor(props: any) {
        super(props);
        this.videoPlayer = createRef();
    }

    onChange = (isVisible: boolean) => {
        if(isVisible) {
            this.videoPlayer.current!.play().then(_ => {
                
            }).catch(_ => {
            });
        } else {
            this.videoPlayer.current!.pause();
        }
    }

    render() {
        return (
            <Block>
                <PostHeader>
                    <LeftHeader>
                        <Link href={"/user/" + this.props.user.id} prefetch={false}>
                            <a><Avatar alt={this.props.user.username} src={this.props.user.avatar ? this.props.user.avatar : "https://ui-avatars.com/api/?name=" + this.props.user.username} /></a>
                        </Link>
                        <PostInfo>
                            <Title>{this.props.content}</Title>
                            <Username>
                                <Link href={"/user/" + this.props.user.id} prefetch={false}>
                                    <a>{this.props.user.username}</a>
                                </Link>
                                -
                            <Link href={"/post/" + this.props.id}>
                                <a><TimeAgo date={this.props.date} live={false} /></a>
                            </Link>
                            </Username>
                        </PostInfo>
                    </LeftHeader>
                    <RightHeader>
                        <FontAwesomeIcon icon={faEllipsisH} />
                    </RightHeader>
                </PostHeader>
                <VisibilitySensor onChange={this.onChange}>
                    <Video muted={true} ref={this.videoPlayer} loop={true} poster={videoEndpoit + this.props.media.uri + ".png"} controls={true} src={videoEndpoit + this.props.media.uri + "480p.mp4"} playsinline={true} />
                </VisibilitySensor>
                <PostFooter>
                    <Like id={this.props.id} count={this.props.likes} liked={this.props.like} />
                    <Comments>
                        <FontAwesomeIcon icon={faComment} /> {this.props.comments}
                    </Comments>
                </PostFooter>
            </Block>
        )
    }
} 
