export function WinTest(cells) {
    let count = 0;
    [...Array(cells.length).keys()].forEach(x => {
        return ([...Array(cells[x].length).keys()].forEach(y => {
            if (cells[x][y].status === "disabledButton") { count++; }
        }));
    });
    return count;
}

