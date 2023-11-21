<script lang="ts" setup>
import AddNewTask from '@/views/task/AddNewTask.vue'
import KanbanBoard from '@/views/task/KanbanBoard.vue'

const isOpenAddNewTask = ref(true)
</script>

<template>
  <KanbanBoard />
  <AddNewTask v-model:is-drawer-open="isOpenAddNewTask" />
</template>
