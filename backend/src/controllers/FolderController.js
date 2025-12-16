const FoldersRepository = require("@repositories/FoldersRepository");
const folderRepo = new FoldersRepository();

const getFolders = async (req, res) => {
  try {
    const data = await folderRepo.findAll();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getFolderById = async (req, res) => {
  try {
    const data = await folderRepo.findById(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createFolder = async (req, res) => {
  try {
    const folder = await folderRepo.create(req.body);
    res.status(201).json(folder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create folder" });
  }
};

const updateFolder = async (req, res) => {
  try {
    const folder = await folderRepo.update(req.params.id, req.body);
    res.json(folder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update folder" });
  }
};

const deleteFolder = async (req, res) => {
  try {
    await folderRepo.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete folder" });
  }
};

module.exports = {
  getFolders,
  getFolderById,
  createFolder,
  updateFolder,
  deleteFolder,
};
