import axios from "axios";
const BASE_URL = "http://localhost:8000";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {},
});

export const getProperties = (body) => {
  return instance.post("/fetch", body);
};

export const uploadProperties = (body) => {
  return instance.post("/upload", body);
};

export const getPrediction = (body) => {
  return instance.post("/predict", body);
};

export const postComparable = (body) => {
    return instance.post("/mark-comparable", body);
  };
