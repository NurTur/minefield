import axios from "axios";

export default async () => {
    const res = await axios.get("http://localhost:5000/api/mineGame/records");
    let arr = [];
    if (res.data === "") {
        [...Array(14).keys()].forEach(x => {
            arr.push({ name: "", answer: 0 });
        });
        return arr;
    } else { return res.data.records; }
};
