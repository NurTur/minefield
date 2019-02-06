export default (level) => {
    let row, column, countMines;
    if (level === "first_level") {
        row = 9;
        column = 9;
        countMines = 10;
    };

    let arr = [];
    [...Array(row).keys()].forEach(x => {
        arr.push(Array(column).fill(""));
    });

    let x, y, i = 0;
    while (i < countMines) {
        x = Math.floor(Math.random() * row);
        y = Math.floor(Math.random() * column);
        if (arr[x][y] === "") {
            arr[x][y] = "mine";
            i++;
        } else { }
    };

    [...Array(row).keys()].forEach(x => {
        return ([...Array(column).keys()].forEach(y => {
            let count = 0;
            [x - 1, x, x + 1].forEach(i => {
                return ([y - 1, y, y + 1].forEach(j => {
                    if (i >= 0 && i < row && j >= 0 && j < column && arr[i][j] === "mine") {
                        ++count;
                    }
                }))
            });
            if (count > 0 && arr[x][y] !== "mine") { arr[x][y] = count; }
        }));
    })

    return arr;
};
