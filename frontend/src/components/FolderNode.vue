<template>
  <li>
    <div class="folder" :class="{ selected: store.selectedItem?.id === folder.id }" @click.stop="selectFolder">
      📁 {{ folder.name }}
    </div>

    <ul v-if="folder.children?.length">
      <FolderNode v-for="child in folderFolders" :key="child.id" :folder="child" />
    </ul>
  </li>
</template>

<script setup>
import { computed } from 'vue'
import { useExplorerStore } from '../stores/explorer'

const props = defineProps({
  folder: Object
})

const store = useExplorerStore()

// CREATE FOLDER CHILDREN
const folderFolders = computed(() =>
  (props.folder.children || []).filter(
    child => child.type === 'folder'
  )
)
</script>
