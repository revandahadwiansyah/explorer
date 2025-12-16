const router = require("express").Router();
const FolderController = require("@controllers/FolderController");
const FilesController = require("@controllers/FilesController");

/*
 * Folders
 *
 */
router.get("/folders", FolderController.getFolders);
router.get("/folders/:id", FolderController.getFolderById);
router.post("/folders/add", FolderController.createFolder);
router.put("/folders/update/:id", FolderController.updateFolder);
router.delete("/folders/delete/:id", FolderController.deleteFolder);

/*
 * Files
 *
 */
router.get("/files", FilesController.getFiles);
router.get("/files/:folderId", FilesController.getFilesByFolderId);
router.post("/files/add", FilesController.createFile);
router.put("/files/update/:id", FilesController.updateFile);
router.delete("/files/delete/:id", FilesController.deleteFile);

module.exports = router;
