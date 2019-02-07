export function OpenMines(cells, EncryptCells) {
    [...Array(10).keys()].forEach(x => {
        return ([...Array(10).keys()].forEach(y => {
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

