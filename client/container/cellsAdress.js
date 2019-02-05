export function CellsAdress(level) {
    let row, column;
    if (level === "first_level") {
        row = 9;
        column = 9;
    };

    const cells = [];
    [...Array(row).keys()].forEach(x => {
        cells.push(Array(column).fill({ status: "activeButton", flag: false }));
    });

    return cells;
}


