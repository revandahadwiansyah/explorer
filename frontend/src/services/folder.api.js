import api from "./api";

export function getFolders() {
  return api.get("/api/v1/folders");
}

export function addFolder(payload) {
  return api.post("/api/v1/folders/add", payload);
}

export function updateFolder(id, payload) {
  return api.put(`/api/v1/folders/update/${id}`, payload);
}

export function deleteFolder(id) {
  return api.delete(`/api/v1/folders/delete/${id}`);
}
