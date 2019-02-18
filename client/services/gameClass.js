export default async () => {
    const data = await import(/* webpackChunkName: 'GameClass' */ '../components/GameClass');
    return data.default;
};