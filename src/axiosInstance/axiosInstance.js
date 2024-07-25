import axios from "axios";

const defaultAxios = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000,
  header: {
    "Content-Type": "application/json",
  }
});

export { defaultAxios };