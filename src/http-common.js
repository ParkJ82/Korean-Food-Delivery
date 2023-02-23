// CLEANED
import axios from "axios";
axios.defaults.withCredentials = true;

// Export Axios BaseURL for comfort
export default axios.create({
    // baseURL: "http://localhost:3001",
    baseURL: "",
    withCredentials: true,
});