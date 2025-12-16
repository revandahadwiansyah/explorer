import { defineStore } from "pinia";
import {
  getFolders,
  addFolder,
  updateFolder,
  deleteFolder,
} from "../services/folder.api";
import {
  getFilesByFolder,
  createFiles,
  updateFiles,
  deleteFiles,
} from "../services/file.api";

export const useExplorerStore = defineStore("explorer", {
  state: () => ({
    folders: [],
    files: [],

    activeFolderId: null,
    activeFileId: null,

    creating: null,
    renamingFolderId: null,
    renamingFileId: null,
  }),

  /* ---------- ACTIONS ---------- */
  actions: {
    /* ---------- LOAD FOLDERS ---------- */
    async fetchFolders() {
      const res = await getFolders();

      this.folders = (res.data || []).map((f) => ({
        ...f,
        isCreating: false,
      }));

      if (!this.activeFolderId && this.folders.length) {
        await this.selectFolder(this.folders[0].id);
      }
    },

    /* ---------- SELECT FOLDER ---------- */
    async selectFolder(folderId) {
      if (this.creating) return;

      this.activeFolderId = folderId;
      this.activeFileId = null;

      const res = await getFilesByFolder(folderId);

      this.files = (res.data || []).filter(Boolean).map((f) => ({
        ...f,
        isCreating: false,
      }));
    },

    /* ---------- CREATE FOLDER ---------- */
    startCreateFolder() {
      if (this.creating) return;

      this.cancelRename();

      this.creating = "folder";

      this.folders.push({
        name: "New Folder",
        isCreating: true,
      });
    },

    async commitCreateFolder(name) {
      const index = this.folders.findIndex((f) => f.isCreating);
      if (index === -1) return;

      try {
        const payload = {
          name,
          levels: 0,
          descriptions: name,
          status: 1,
        };

        const res = await addFolder(payload);
        this.folders[index] = { ...res.data, isCreating: false };
      } finally {
        this.creating = null;
      }
    },

    cancelCreateFolder() {
      this.folders = this.folders.filter((f) => !f.isCreating);
      this.creating = null;
    },

    /* ---------- CREATE FILE ---------- */
    startCreateFile() {
      if (!this.activeFolderId || this.creating) return;

      this.cancelRename();

      this.creating = "file";

      this.files.push({
        name: "New File",
        isCreating: true,
      });
    },

    async commitCreateFile(name) {
      const index = this.files.findIndex((f) => f.isCreating);
      if (index === -1) return;

      try {
        const payload = {
          name,
          folders_id: this.activeFolderId,
          descriptions: `${name} DESC`,
          status: 1,
        };

        const res = await createFiles(payload);
        this.files[index] = { ...res.data, isCreating: false };
      } finally {
        this.creating = null;
      }
    },

    cancelCreateFile() {
      this.files = this.files.filter((f) => !f.isCreating);
      this.creating = null;
    },

    /* ---------- RENAME FOLDER ---------- */
    startRenameFolder(id) {
      if (this.creating) return;

      this.cancelRename();
      this.renamingFolderId = id;
    },

    async commitRenameFolder(folder, newName) {
      if (!newName || folder.name === newName) {
        this.renamingFolderId = null;
        return;
      }

      await updateFolder(folder.id, { name: newName });
      folder.name = newName;
      this.renamingFolderId = null;
    },

    /* ---------- DELETE FOLDER ---------- */
    async deleteFolder(folderId) {
      if (!folderId) return;

      try {
        await deleteFolder(folderId);

        this.folders = this.folders.filter((f) => f.id !== folderId);

        if (this.activeFolderId === folderId) {
          this.activeFolderId = this.folders[0]?.id || null;

          if (this.activeFolderId) {
            this.selectFolder(this.activeFolderId);
          } else {
            this.files = [];
          }
        }
      } catch (err) {
        console.error("Delete folder failed", err);
      }
    },

    /* ---------- RENAME FILE ---------- */
    startRenameFile(id) {
      if (this.creating) return;

      this.cancelRename();
      this.renamingFileId = id;
    },

    async commitRenameFile(file, newName) {
      if (!newName || file.name === newName) {
        this.renamingFileId = null;
        return;
      }

      await updateFiles(file.id, { name: newName });
      file.name = newName;
      this.renamingFileId = null;
    },

    /* ---------- CANCEL HELPERS ---------- */
    cancelRename() {
      this.renamingFolderId = null;
      this.renamingFileId = null;
    },

    /* ---------- DELETE FILE ---------- */
    async deleteFile(fileId) {
      if (!fileId) return;

      try {
        await deleteFiles(fileId);

        this.files = this.files.filter((f) => f.id !== fileId);

        if (this.activeFileId === fileId) {
          this.activeFileId = null;
        }
      } catch (err) {
        console.error("Delete file failed", err);
      }
    },
  },
});
