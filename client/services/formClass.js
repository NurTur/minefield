export default async () => {
    const data = await import(/* webpackChunkName: 'FormClass' */ '../container/FormClass');
    return data.default;
};