export default (count_mine) => {
    let countMines = parseInt(count_mine);

    let arr = [];
    [...Array(10).keys()].forEach(x => {
        arr.push(Array(10).fill(""));
    });

    let x, y, i = 0;
    while (i < countMines) {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
        if (arr[x][y] === "") {
            arr[x][y] = "mine";
            i++;
        } else { }
    };

    [...Array(10).keys()].forEach(x => {
        return ([...Array(10).keys()].forEach(y => {
            let count = 0;
            [x - 1, x, x + 1].forEach(i => {
                return ([y - 1, y, y + 1].forEach(j => {
                    if (i >= 0 && i < 10 && j >= 0 && j < 10 && arr[i][j] === "mine") {
                        ++count;
                    }
                }))
            });
            if (count > 0 && arr[x][y] !== "mine") { arr[x][y] = count; }
        }));
    })

    return arr;
};
