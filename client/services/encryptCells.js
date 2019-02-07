export default async (mine_count) => {
    const encryptCells = await import(/* webpackChunkName: 'EncryptCells' */ '../container/encryptCells');
    return encryptCells.default(mine_count);
};