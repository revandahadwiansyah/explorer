<template>
  <div class="toolbar">
    <button @click="store.startCreateFolder">
      New Folder
    </button>
    <button @click="store.startCreateFile" :disabled="!store.activeFolderId">
      Add File
    </button>
  </div>
</template>

<script setup>
import { useExplorerStore } from '../stores/explorer'
const store = useExplorerStore()
</script>
