<script setup lang="ts">
interface TreeItem {
  label: string
  icon?: string
  children?: TreeItem[]
}

const items: TreeItem = {
  label: 'Chientt',
  children: [
    { label: 'ChienTT-child' },
    { label: 'ChienTT-child1' },
    { label: 'ChienTT-child2' },
  ],
}
</script>

<template>
  <VTreeNode :items="items" />
</template>

