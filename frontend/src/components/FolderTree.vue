<template>
  <div class="sidebar">
    <ul>
      <li v-for="folder in store.folders" :key="folder.id">
        <div class="folder-row" :class="{ active: store.activeFolderId === folder.id }" @click="onClick(folder)"
          @dblclick.stop="onDblClick(folder)">
          <!-- LEFT -->
          <div class="left">
            📁

            <!-- NORMAL -->
            <span v-if="!folder.isCreating && store.renamingFolderId !== folder.id">
              {{ folder.name }}
            </span>

            <!-- CREATE / RENAME -->
            <input v-else :ref="el => setInputRef(folder.id, el)" v-model="value" @keyup.enter="commit(folder)"
              @blur="commit(folder)" />
          </div>

          <!-- 🗑️ DELETE BUTTON -->
          <button v-if="store.activeFolderId === folder.id && !folder.isCreating" class="delete-btn"
            @click.stop="remove(folder)" title="Delete folder">
            🗑️
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted } from "vue";
import { useExplorerStore } from "../stores/explorer";

const store = useExplorerStore();

const value = ref("");
const inputRefs = ref({});

/* -----------------------------
 * INITIAL LOAD
 * ----------------------------- */
onMounted(() => {
  store.fetchFolders();
});

/* -----------------------------
 * SELECT FOLDER
 * ----------------------------- */
function onClick(folder) {
  store.selectFolder(folder.id);
}

/* -----------------------------
 * RENAME FOLDER
 * ----------------------------- */
function onDblClick(folder) {
  value.value = folder.name;
  store.startRenameFolder(folder.id);

  nextTick(() => {
    const el = inputRefs.value[folder.id];
    el?.focus();
    el?.select();
  });
}

/* -----------------------------
 * COMMIT CREATE / RENAME
 * ----------------------------- */
function commit(folder) {
  const name = value.value.trim();

  if (!name) {
    if (folder.isCreating) {
      store.cancelCreateFolder();
    }
    store.renamingFolderId = null;
    return;
  }

  if (folder.isCreating) {
    store.commitCreateFolder(name);
  } else {
    store.commitRenameFolder(folder, name);
  }

  value.value = "";
}

/* -----------------------------
 * DELETE FOLDER
 * ----------------------------- */
function remove(folder) {
  const ok = confirm(`Delete folder "${folder.name}"?`);
  if (!ok) return;

  store.deleteFolder(folder.id);
}

/* -----------------------------
 * REGISTER INPUT REF
 * ----------------------------- */
function setInputRef(id, el) {
  if (el) inputRefs.value[id] = el;
}

/* -----------------------------
 * AUTO FOCUS WHEN CREATING
 * ----------------------------- */
watch(
  () => store.creating,
  async (val) => {
    if (val === "folder") {
      await nextTick();

      const tmp = store.folders.find(f => f.isCreating);
      if (!tmp) return;

      value.value = "New Folder";

      nextTick(() => {
        const el = inputRefs.value[tmp.id];
        el?.focus();
        el?.select();
      });
    }
  }
);
</script>

<style scoped>
.folder-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 8px;
  border-radius: 4px;
  cursor: pointer;
}

.folder-row.active {
  background-color: #d0d0d0;
}

.folder-row:hover {
  background-color: #e6e6e6;
}

.left {
  display: flex;
  align-items: center;
  gap: 6px;
}

.delete-btn {
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #fff;
  border: 1.5px solid #e53935;
  border-radius: 4px;

  cursor: pointer;
  opacity: 0.8;
}

.delete-btn:hover {
  background-color: #ffecec;
  opacity: 1;
}
</style>
