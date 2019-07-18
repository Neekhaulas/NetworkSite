export const dev = `http://localhost:3000/`;
export const local = `http://51.158.104.205:3000/`
export const prod = `https://scaleway.neekhaulas.eu/`;
export const video = 'https://network-video.s3.fr-par.scw.cloud/';
export const prodURI = `https://network.neekhaulas.eu/`;
export const devURI = `http://localhost:9090/`;

export const endpoint = (process.env.NODE_ENV === 'development' ? dev : prod);
export const endpointGraphQL = (process.env.NODE_ENV === 'development' ? dev : prod) + 'graphql';
export const endpointUpload = (process.env.NODE_ENV === 'development' ? dev : prod) + 'upload';
export const videoEndpoit = (process.env.NODE_ENV === 'development' ? video : video);
export const localEndpoint = (process.env.NODE_ENV === 'development' ? dev : local) + 'graphql';
export const siteURI = (process.env.NODE_ENV === 'development' ? devURI : prodURI);