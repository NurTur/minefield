export default async (level) => {
    const encryptCells = await import(/* webpackChunkName: 'EncryptCells' */ '../container/encryptCells');
    return encryptCells.default(level);
};