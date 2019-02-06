export function OpenMines(cells, EncryptCells) {
    [...Array(cells.length).keys()].forEach(x => {
        return ([...Array(cells[x].length).keys()].forEach(y => {
            if (EncryptCells[x][y] === "mine") {
                cells[x][y] = { status: "disabledButton", flag: false }
            }
            else if (EncryptCells[x][y] !== "mine" && cells[x][y].flag === true) {
                cells[x][y] = { status: "disabledButton", flag: true }
                EncryptCells[x][y] = "mine";
            }
        }));
    })
    return cells;
}

