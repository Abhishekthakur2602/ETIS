import api from "./api";

export async function getTimeline(predictionId: number) {
  const res = await api.get(`/incident-timeline/${predictionId}`);

  return res.data;
}
