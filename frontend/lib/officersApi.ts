import api from "./api";

export async function getAvailableOfficers() {
  const response = await api.get("/available-officers");

  return response.data;
}
