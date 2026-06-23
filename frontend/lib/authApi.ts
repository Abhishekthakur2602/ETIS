import axios from "axios";

const API_URL =
  "http://127.0.0.1:8000";

export async function signup(
  data: any
) {

  const res =
    await axios.post(
      `${API_URL}/signup`,
      data
    );

  return res.data;
}

export async function login(
  data: any
) {

  const res =
    await axios.post(
      `${API_URL}/login`,
      data
    );

  return res.data;
}