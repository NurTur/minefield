import axios from "axios";

export default async () => {
    const result = await axios.get("http://localhost:5000/records");
    let arr = [];
    [...Array(14).keys()].forEach(x => {
        arr.push({ name: "", answer: 0 });
    });

    result.data.forEach((e, i) => {
        [...Array(14).keys()].forEach(i => {
            if (e.myrecord[i] !== 0 && e.myrecord[i] < arr[i].answer) { arr[i].answer = e.myrecord[i]; arr[i].name = e.username; }
            if (arr[i].answer === 0 && e.myrecord[i] > arr[i].answer) { arr[i].answer = e.myrecord[i]; arr[i].name = e.username; }
        });
    });
    return arr;
};
