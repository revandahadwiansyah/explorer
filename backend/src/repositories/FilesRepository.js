const moment = require("moment");
const crypto = require("crypto");
const knex = require("@config/connection");
const { EventEmitter } = require("events");

class FilesRepository extends EventEmitter {
  constructor() {
    super();
    this.table = "files";
  }

  async findAll() {
    return knex(this.table).select("*").orderBy("created_at", "asc");
  }

  async findById(id) {
    return knex(this.table).where({ id }).first();
  }

  async findByFolderId(fid) {
    return knex(this.table)
      .where({ folders_id: fid })
      .orderBy("created_at", "asc");
  }

  async create(data) {
    const [files] = await knex(this.table).insert(data).returning("*");

    this.emit("files:created", files);
    return files;
  }

  async update(id, data) {
    const [files] = await knex(this.table)
      .where({ id })
      .update(data)
      .returning("*");

    this.emit("files:updated", files);
    return files;
  }

  async delete(id) {
    await knex(this.table).where({ id }).del();

    this.emit("files:deleted", id);
  }
}

module.exports = FilesRepository;
