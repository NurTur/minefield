export function CellsAdress(level) {
    let row, column;
    if (level === "first_level") {
        row = 9;
        column = 9;
    };

    const cells = [];
    [...Array(row).keys()].forEach(x => {
        return ([...Array(column).keys()].forEach(y => {
            cells.push({ adress: `row_${String(x)}column_${String(y)}`, value: "" });
        }));
    })
    return cells;
}


