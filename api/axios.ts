import axios from "axios"
// export const baseURL = `http://localhost:8000`
export const baseURL = `https://server-841i.onrender.com`

export const axiosInstance = () => {
    const token = typeof window !== "undefined" && localStorage.getItem("knowledge-token");
    return axios.create({
        baseURL: baseURL,
        headers: {
            Authorization: !!token ? `Bearer ${token}` : "",
        }
    })
};

