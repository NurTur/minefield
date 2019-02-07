export function WinTest(cells) {
    let count = 0;
    [...Array(10).keys()].forEach(x => {
        return ([...Array(10).keys()].forEach(y => {
            if (cells[x][y].status === "disabledButton") { count++; }
        }));
    });
    return count;
}

