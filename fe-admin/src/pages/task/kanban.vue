<script lang="ts" setup>
import type { Ref } from 'vue'
import AddNewTask from '@/views/task/AddNewTask.vue'
import KanbanBoard from '@/views/task/KanbanBoard.vue'

const isOpenAddNewTask: Ref<boolean> = ref(false)
</script>

<template>
  <section>
    <KanbanBoard @open-add-new-task="isOpenAddNewTask = true" />
    <AddNewTask v-model:is-drawer-open="isOpenAddNewTask" />
  </section>
</template>
