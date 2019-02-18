import axios from "axios";

export default async () => {
    const res = await axios.get("http://localhost:5000/api/records");
    let arr = [];
    if (res.data.records.length === 0) {
        [...Array(14).keys()].forEach(x => {
            arr.push({ name: "", answer: 0 });
        });
        return arr;
    } else { return res.data.records; }
};
