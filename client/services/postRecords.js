import axios from "axios";

export default async (arr) => {
    const result = await axios.post("http://localhost:5000/api/records", arr);
    return result.data;
};