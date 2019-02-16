import axios from "axios";

export default async () => {
    const result = await axios.get("http://localhost:5000/records");
    return result.data;
};
