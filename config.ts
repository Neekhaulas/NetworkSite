export const dev = `http://localhost:3000/`;
export const prod = `https://35.180.116.195:3000/`;

export const endpoint = (process.env.NODE_ENV === 'development' ? dev : prod);
export const endpointGraphQL = (process.env.NODE_ENV === 'development' ? dev : prod) + 'graphql';
export const endpointUpload = (process.env.NODE_ENV === 'development' ? dev : prod) + 'upload';