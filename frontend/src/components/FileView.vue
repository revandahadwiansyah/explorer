<template>
  <div class="content">
    <ul>
      <li v-for="file in store.files" :key="file.id || 'tmp'" class="file-row"
        :class="{ active: file.id && store.activeFileId === file.id }" @click="file.id && select(file)"
        @dblclick="file.id && onDblClick(file)">
        <div class="left">
          📄

          <span v-if="!file.isCreating && store.renamingFileId !== file.id">
            {{ file.name }}
          </span>

          <input v-else :ref="el => setInputRef(file.id, el)" v-model="value" @keyup.enter="commit(file)"
            @blur="commit(file)" />
        </div>

        <button v-if="store.activeFileId === file.id && !file.isCreating" class="delete-btn" @click.stop="remove(file)"
          title="Delete file">
          🗑️
        </button>

      </li>

    </ul>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";
import { useExplorerStore } from "../stores/explorer";

const store = useExplorerStore();

const inputRefs = ref({});
const value = ref("");

// SELECT FILE
function select(file) {
  if (!file || !file.id) return;
  store.activeFileId = file.id;
}

// RENAME FILE
function onDblClick(file) {
  value.value = file.name;
  store.startRenameFile(file.id);

  nextTick(() => {
    const el = inputRefs.value[file.id];
    el?.focus();
    el?.select();
  });
}

// COMMIT CREATE / RENAME
function commit(file) {
  const name = value.value.trim();

  if (!name) {
    if (file.isCreating) {
      store.cancelCreateFile();
    }
    store.renamingFileId = null;
    return;
  }

  if (file.isCreating) {
    store.commitCreateFile(name);
  } else {
    store.commitRenameFile(file, name);
  }

  value.value = "";
}

// REGISTER INPUT REF
function setInputRef(id, el) {
  if (el) inputRefs.value[id] = el;
}

// REMOVE FILES
function remove(file) {
  if (!file?.id) return;

  const ok = confirm(`Delete file "${file.name}"?`);
  if (!ok) return;

  store.deleteFile(file.id);
}


// AUTO FOCUS WHEN CREATING FILE
watch(
  () => store.creating,
  async (val) => {
    if (val === "file") {
      await nextTick();

      const tmp = store.files.find(f => f.isCreating);
      if (!tmp) return;

      value.value = "New File";

      nextTick(() => {
        const el = inputRefs.value[tmp.id];
        el?.focus();
        el?.select();
      });
    }
  }
);
</script>
