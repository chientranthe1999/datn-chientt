<script lang="ts" setup>
import type { PropType } from 'vue'

defineProps({
  task: {
    type: Object as PropType<{ type: string; title: string; date: string }>,
    default: () => ({}),
    required: true,
  },
})

const mapColor: Record<string, string> = {
  'Design': 'purple',
  'Feature Request': 'teal',
  'Backend': 'blue',
  'QA': 'green',
  'default': 'teal',
}
</script>

<template>
  <div class="task-card px-3 pt-3 pb-5">
    <p class="text-sm">{{ task.title }}</p>

    <div class="d-flex mt-4 justify-space-between align-center">
      <span class="text-xs text-gray-600">{{ task.date }}</span>
      <VChip v-if="task.type" :class="`text-custom-${mapColor[task.type]}`" size="small">{{ task.type }}</VChip>
    </div>
  </div>
</template>

<style scoped lang="scss">
$colors: (
  "purple": #6b46c1,
  "teal": #2c7a7b,
  "blue": #2b6cb0,
  "green": #2f855a,
);

@each $color-name, $color-value in $colors {
  .text-custom-#{$color-name} {
    color: $color-value !important;
    background-color: color-mix(in srgb, currentColor 10%, transparent);
  }
}

.task-card {
  box-shadow: rgba(145, 158, 171, 0.16) 0 1px 2px 0;
  border-radius: 16px;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  margin-bottom: 16px;
  background-color: white;

  &:hover {
    box-shadow: rgba(145, 158, 171, 0.16) 0px 20px 40px -4px;
  }
}

.task-card {
  box-shadow: rgba(145, 158, 171, 0.16) 0 1px 2px 0;
  border-radius: 16px;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  margin-bottom: 16px;
  background-color: white;

  &:hover {
    box-shadow: rgba(145, 158, 171, 0.16) 0px 20px 40px -4px;
  }
}
</style>
