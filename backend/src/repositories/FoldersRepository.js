const moment = require("moment");
const crypto = require("crypto");
const knex = require("@config/connection");
const { EventEmitter } = require("events");

class FoldersRepository extends EventEmitter {
  constructor() {
    super();
    this.table = "folders";
  }

  async findAll() {
    return knex(this.table).select("*").orderBy("created_at", "asc");
  }

  async findById(id) {
    return knex(this.table).where({ id }).first();
  }

  async create(data) {
    const [folders] = await knex(this.table).insert(data).returning("*");

    this.emit("folders:created", folders);
    return folders;
  }

  async update(id, data) {
    const [folders] = await knex(this.table)
      .where({ id })
      .update(data)
      .returning("*");

    this.emit("folders:updated", folders);
    return folders;
  }

  async delete(id) {
    await knex(this.table).where({ id }).del();

    this.emit("folders:deleted", id);
  }
}

module.exports = FoldersRepository;
