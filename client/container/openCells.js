export function OpenCells(cells, EncryptCells) {
    let test;
    do {
        test = true;
        [...Array(10).keys()].forEach(x => {
            return ([...Array(10).keys()].forEach(y => {
                if (EncryptCells[x][y] === "" && cells[x][y].status === "disabledButton") {
                    [x - 1, x, x + 1].forEach(i => {
                        return ([y - 1, y, y + 1].forEach(j => {
                            if (i >= 0 && i < cells.length && j >= 0 && j < cells[x].length && cells[i][j].status === "activeButton" && cells[i][j].flag === false) {
                                cells[i][j] = { status: "disabledButton", flag: false }
                                test = false;
                            }
                        }))
                    });
                }
            }));
        })
    }
    while (test !== true)
    return cells;
}

