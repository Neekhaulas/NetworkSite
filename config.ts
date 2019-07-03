export const dev = `http://localhost:3000/`;
export const prod = `https://scaleway.neekhaulas.eu/`;
export const video = 'https://network-video.s3.amazonaws.com/';

export const endpoint = (process.env.NODE_ENV === 'development' ? dev : prod);
export const endpointGraphQL = (process.env.NODE_ENV === 'development' ? dev : prod) + 'graphql';
export const endpointUpload = (process.env.NODE_ENV === 'development' ? dev : prod) + 'upload';
export const videoEndpoit = (process.env.NODE_ENV === 'development' ? video : video);
