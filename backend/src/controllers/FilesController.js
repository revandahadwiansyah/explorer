const FilesRepository = require("@repositories/FilesRepository");
const filesRepo = new FilesRepository();

const getFiles = async (req, res) => {
  try {
    const data = await filesRepo.findAll();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getFilesByFolderId = async (req, res) => {
  try {
    const data = await filesRepo.findByFolderId(req.params.folderId);

    if (!data) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createFile = async (req, res) => {
  try {
    const files = await filesRepo.create(req.body);
    res.status(201).json(files);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create file" });
  }
};

const updateFile = async (req, res) => {
  try {
    const file = await filesRepo.update(req.params.id, req.body);
    res.json(file);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update file" });
  }
};

const deleteFile = async (req, res) => {
  try {
    await filesRepo.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete file" });
  }
};

module.exports = {
  getFiles,
  getFilesByFolderId,
  createFile,
  updateFile,
  deleteFile,
};
