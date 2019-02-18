export default async () => {
    const data = await import(/* webpackChunkName: 'RecordClass' */ '../components/RecordClass');
    return data.default;
};