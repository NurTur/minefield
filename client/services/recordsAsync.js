export default async () => {
    const code = await import(/* webpackChunkName: 'recordAsync' */ '../components/records');
    return code.default;
};