export const Query = {
  imgProxyUrl: (_, { url, transformations }, { modules }) =>
    modules.ImgProxy.execute(url, transformations)
};

export default { Query };
