import { ApolloConsumer } from 'react-apollo'
import React from 'react';
import gql from 'graphql-tag'
import axios from 'axios';
import { endpointUpload } from '../config';
import styled from 'styled-components';
import { Button, TextInput } from './Style';

const Video = styled.video`
    width: 100%;
`;

axios.defaults.withCredentials = true;

const BYTES_PER_CHUNK = 1024 * 1024 * 1;

export default class Upload extends React.Component<{},
    {
        file: any,
        localFile: any,
        uuid: any,
        mediaId: any,
        isUploading: boolean,
        size: number,
        current: number,
        name: string
    }> {
    constructor(props: any) {
        super(props);
        this.state = {
            file: null,
            localFile: null,
            uuid: null,
            mediaId: null,
            isUploading: false,
            size: 0,
            current: 0,
            name: ''
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
    }
    async onFormSubmit(client: any) {
        this.fileUpload(this.state.file).then((res: any) => {
            client.mutate({
                mutation: gql`
          mutation post($content: String!, $media: ID!) {
            post(content: $content, media: $media) {
              post {
                id
              }
            }
          }
        `,
                variables: {
                    content: this.state.name,
                    media: res.id
                }
            });
        });
    }
    onChange(e: any) {
        this.setState({ file: e.target.files[0] });
        const reader = new FileReader();

        reader.onload = (f: any) => {
            this.setState({ localFile: f.target.result });
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    fileUpload(file: any) {
        return new Promise((resolve) => {
            var blob = file;
            var size = blob.size;
            let maxChunks: any = Math.max(Math.ceil(size / BYTES_PER_CHUNK), 1);
            var start = 0;
            var end = BYTES_PER_CHUNK;
            let index: any = 0;
            var mediaId = 0;

            this.setState({ isUploading: true, size: maxChunks, current: index });

            var request = new FormData();
            request.append('method', 'INIT');
            request.append('file', file.name);
            axios.post(endpointUpload, request, {
                withCredentials: true,
            }).then(async (res: any) => {
                this.setState({ uuid: res.data.uuid, mediaId: res.data.id });
                mediaId = res.data.id;
                while (start < size) {
                    var data = new FormData();
                    data.append('method', 'SEND');
                    data.append('qqpartindex', index);
                    data.append('qqtotalparts', maxChunks);
                    data.append('qquuid', res.data.uuid);
                    data.append('qqfile', blob.slice(start, end));
                    data.append('qqfilename', file.name);
                    data.append('mediaId', res.data.id.id);
                    await axios.post(endpointUpload, data, {
                        withCredentials: true,
                    });
                    start = end;
                    end = start + BYTES_PER_CHUNK;
                    index++;
                    this.setState({ current: index });
                }
                this.setState({ isUploading: false });
                resolve(mediaId);
            });
        });
    }

    render() {
        if (this.state.isUploading) {
            let percent: number = this.state.current * 100 / this.state.size;
            return (
                <p>Uploaded at {percent}%</p>
            )
        }
        let LocalVideo: any;
        if (this.state.localFile != null) {
            LocalVideo = (
                <Video src={this.state.localFile} controls={true} loop={true} />
            )
        }
        return (
            <ApolloConsumer>
                {client => (
                    <div>
                        <form onSubmit={(e) => { e.preventDefault(); this.onFormSubmit(client) }}>
                            <TextInput name="title" placeholder="Video title" onChange={(e: any) => {this.setState({name: e.target.value});}} required={true} />
                            <input type="file" onChange={this.onChange} />
                            {LocalVideo}
                            <Button type="submit">Upload</Button>
                        </form>
                    </div>
                )}
            </ApolloConsumer>
        )
    }
}