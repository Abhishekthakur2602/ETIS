import axios from "axios";

const API_URL =
  "http://127.0.0.1:8000";

export async function getLatestPrediction() {

  const res =
    await axios.get(
      `${API_URL}/latest-prediction`
    );

  return res.data;
}