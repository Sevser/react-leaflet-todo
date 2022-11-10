export const guidHelper = () => Math.floor(Math.random() * ( 2 << 16)).toString(16).padEnd(4, '0');

const createGuid = () => `${guidHelper()}${guidHelper()}-${guidHelper()}-${guidHelper()}-${guidHelper()}-${guidHelper()}${guidHelper()}${guidHelper()}`;

export default createGuid;