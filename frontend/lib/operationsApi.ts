import api from "./api";

export async function getOperationsBrief() {

  const response =
    await api.get(
      "/operations-brief"
    );

  return response.data;
}