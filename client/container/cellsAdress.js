export function CellsAdress(mineCount) {
    const cells = [];
    [...Array(10).keys()].forEach(x => {
        cells.push(Array(10).fill({ status: "activeButton", flag: false }));
    });

    return cells;
}


