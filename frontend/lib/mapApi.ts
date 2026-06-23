import axios from "axios";

const API_URL =
  "http://127.0.0.1:8000";

export async function getMapIncidents() {

  const response =
    await axios.get(
      `${API_URL}/map-incidents`
    );

  return response.data;
}