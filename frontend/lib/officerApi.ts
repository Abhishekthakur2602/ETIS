import api from "./api";

export async function getAssignments(officerId: number) {
  const response = await api.get(`/officer-dashboard/${officerId}`);

  return response.data;
}

export async function updateStatus(assignmentId: number, status: string) {
  await api.put("/assignment-status", {
    assignment_id: assignmentId,
    status,
  });
}
