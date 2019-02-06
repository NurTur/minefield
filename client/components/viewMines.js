import React from 'react';

function ViewMines(props) {
    const { value, mine, item } = props;
    const key = `${mine[2]}_${mine[3]}`;
    if (value === "mine") {

        if (mine[0] === mine[2] && mine[1] === mine[3]) {
            return <button className={item.status} key={key} disabled><img
                alt="mine1"
                src="/dist/images/mine1.jpg"
                className="picture"
            /></button>
        }
        else if (item.flag === false) {
            return <button className={item.status} key={key} disabled><img
                alt="mine2"
                src="/dist/images/mine2.jpg"
                className="picture"
            /></button>
        }
        else if (item.flag) {
            return <button className={item.status} key={key} disabled>< img
                alt="mine3"
                src="/dist/images/mine3.jpg"
                className="picture"
            /></button>
        }
    }
    else if (value > 0) {
        let color;
        switch (value) {
            case 1: color = "green"; break;
            case 2: color = "blue"; break;
            case 3: color = "red"; break;
            case 4: color = "brown"; break;
            default: color = "grey"; break;
        };

        return <button className={item.status} style={{ color }} key={key} disabled><h1 className="picture">{value}</h1></button>
    }
    else {
        return <button className={item.status} key={key} disabled></button>
    }
};

export default ViewMines;