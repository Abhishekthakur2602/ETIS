import api from "./api";

export async function getAdminDashboard() {
  const response = await api.get("/admin-dashboard");

  return response.data;
}

export async function getLiveAssignments() {
  const response = await api.get("/live-assignments");

  return response.data;
}
