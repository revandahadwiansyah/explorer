<template>
  <div class="app">
    <Toolbar />

    <div class="explorer">
      <FolderTree />
      <FileView />
    </div>
  </div>
</template>

<script setup>
import FolderTree from './components/FolderTree.vue'
import FileView from './components/FileView.vue'
import Toolbar from './components/Toolbar.vue'
</script>
