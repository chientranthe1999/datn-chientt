<script lang="ts" setup>
import Draggable from 'vuedraggable'
import TaskCard from './TaskCard.vue'

defineEmits(['openAddNewTask'])

const columns = ref([
  {
    title: 'Backlog',
    tasks: [
      {
        id: 1,
        title: 'Add discount code to checkout page',
        date: 'Sep 14',
        type: 'Feature Request',
      },
      {
        id: 2,
        title: 'Provide documentation on integrations',
        date: 'Sep 12',
      },
      {
        id: 3,
        title: 'Design shopping cart dropdown',
        date: 'Sep 9',
        type: 'Design',
      },
      {
        id: 4,
        title: 'Add discount code to checkout page',
        date: 'Sep 14',
        type: 'Feature Request',
      },
      {
        id: 5,
        title: 'Test checkout flow',
        date: 'Sep 15',
        type: 'QA',
      },
      {
        id: 6,
        title: 'Add discount code to checkout page',
        date: 'Sep 14',
        type: 'Feature Request',
      },
    ],
  },
  {
    title: 'In Progress',
    tasks: [
      {
        id: 6,
        title: 'Design shopping cart dropdown',
        date: 'Sep 9',
        type: 'Design',
      },
      {
        id: 7,
        title: 'Add discount code to checkout page',
        date: 'Sep 14',
        type: 'Feature Request',
      },
      {
        id: 8,
        title: 'Provide documentation on integrations',
        date: 'Sep 12',
        type: 'Backend',
      },
    ],
  },
  {
    title: 'Review',
    tasks: [
      {
        id: 9,
        title: 'Provide documentation on integrations',
        date: 'Sep 12',
      },
      {
        id: 10,
        title: 'Design shopping cart dropdown',
        date: 'Sep 9',
        type: 'Design',
      },
      {
        id: 11,
        title: 'Add discount code to checkout page',
        date: 'Sep 14',
        type: 'Feature Request',
      },
      {
        id: 12,
        title: 'Design shopping cart dropdown',
        date: 'Sep 9',
        type: 'Design',
      },
      {
        id: 13,
        title: 'Add discount code to checkout page',
        date: 'Sep 14',
        type: 'Feature Request',
      },
    ],
  },
  {
    title: 'Done',
    tasks: [
      {
        id: 14,
        title: 'Add discount code to checkout page',
        date: 'Sep 14',
        type: 'Feature Request',
      },
      {
        id: 15,
        title: 'Design shopping cart dropdown',
        date: 'Sep 9',
        type: 'Design',
      },
      {
        id: 16,
        title: 'Add discount code to checkout page',
        date: 'Sep 14',
        type: 'Feature Request',
      },
    ],
  },
])
</script>

<template>
  <div class="d-flex overflow-x-auto py-12">
    <VCard
      v-for="column in columns"
      :key="column.title"
      class="mr-4 px-3 py-3 column-width h-fit-content"
      color="#f3f3f3"
    >
      <p class="text-sm font-weight-semibold">{{ column.title }}</p>
      <Draggable
        :list="column.tasks"
        :item-key="column.title"
        group="task"
      >
        <template #item="{ element }">
          <TaskCard
            :task="element"
            class="mt-3 cursor-grab"
          />
        </template>

        <template #footer>
          <VBtn block variant="tonal" prepend-icon="tabler-plus" @click="$emit('openAddNewTask', column.title)">
            Add Task
          </VBtn>
        </template>
      </Draggable>
    </VCard>

    <VCard
      class="mr-4 px-3 py-3 column-width h-fit-content"
      color="#f3f3f3"
    >
      <VBtn block variant="tonal" prepend-icon="tabler-plus" @click="$emit('openAddNewTask', column.title)">
        Add Task
      </VBtn>
    </VCard>
  </div>
</template>

<style scoped lang="scss">
.column-width {
  min-width: 320px;
  width: 320px;
}

.cursor-grab {
  cursor: grab;
}
</style>
