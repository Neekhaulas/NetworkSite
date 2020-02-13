export const dev = ``;
export const local = ``
export const prod = ``;
export const video = '';
export const prodURI = ``;
export const devURI = ``;

export const endpoint = (process.env.NODE_ENV === 'development' ? dev : prod);
export const endpointGraphQL = (process.env.NODE_ENV === 'development' ? dev : prod) + 'graphql';
export const endpointUpload = (process.env.NODE_ENV === 'development' ? dev : prod) + 'upload';
export const videoEndpoit = (process.env.NODE_ENV === 'development' ? video : video);
export const localEndpoint = (process.env.NODE_ENV === 'development' ? dev : local) + 'graphql';
export const siteURI = (process.env.NODE_ENV === 'development' ? devURI : prodURI);
