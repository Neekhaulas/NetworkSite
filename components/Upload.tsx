import { ApolloConsumer } from 'react-apollo'
import React from 'react';
import gql from 'graphql-tag'
import axios from 'axios';
import { endpointUpload } from '../config';

axios.defaults.withCredentials = true;

const BYTES_PER_CHUNK = 1024 * 1024 * 1;

export default class Upload extends React.Component<{},
    {
        file: any,
        uuid: any,
        mediaId: any,
        isUploading: boolean,
        size: number,
        current: number
    }> {
    constructor(props: any) {
        super(props);
        this.state = {
            file: null,
            uuid: null,
            mediaId: null,
            isUploading: false,
            size: 0,
            current: 0
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
    }
    async onFormSubmit(client: any) {
        this.fileUpload(this.state.file).then((res : any) => {
            console.log(res);
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
                    content: "Hello world",
                    media: res.id
                }
            });
        });
    }
    onChange(e: any) {
        this.setState({ file: e.target.files[0] })
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
        return (
            <ApolloConsumer>
                {client => (
                    <form onSubmit={(e) => { e.preventDefault(); this.onFormSubmit(client) }}>
                        <div><textarea name="content"></textarea></div>
                        <input type="file" onChange={this.onChange} />
                        <button type="submit">Upload</button>
                    </form>
                )}
            </ApolloConsumer>
        )
    }
}