import api from "./api";

export function getFilesByFolder(folderId) {
  return api.get(`/api/v1/files/${folderId}`);
}

export function createFiles(payload) {
  return api.post(`/api/v1/files/add`, payload);
}

export function updateFiles(id, payload) {
  return api.put(`/api/v1/files/update/${id}`, payload);
}

export function deleteFiles(id) {
  return api.delete(`/api/v1/files/delete/${id}`);
}
