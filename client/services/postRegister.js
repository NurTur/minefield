import axios from "axios";

export default async (obj) => {
    const result = await axios.post("http://localhost:5000/register", obj);
    return result.data;
};

