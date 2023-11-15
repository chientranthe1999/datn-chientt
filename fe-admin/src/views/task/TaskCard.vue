<script lang="ts" setup>
import type { ComputedRef, PropType } from 'vue'
import Badge from './Badge.vue'

const props = defineProps({
  task: {
    type: Object as PropType<{ type: string; title: string; date: string }>,
    default: () => ({}),
    required: true,
  },
})

const mapColor = {
  'Design': 'purple',
  'Feature Request': 'teal',
  'Backend': 'blue',
  'QA': 'green',
  'default': 'teal',
}

const badgeColor: ComputedRef<string> = computed(() => {
  return mapColor[props.task?.type as keyof typeof mapColor] || mapColor.default
})
</script>

<template>
  <div class="bg-white shadow rounded px-3 pt-3 pb-5 border border-white">
    <div class="flex justify-between">
      <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">{{ task.title }}</p>

      <img
        class="w-6 h-6 rounded-full ml-3"
        src="https://pickaface.net/gallery/avatar/unr_sample_161118_2054_ynlrg.png"
        alt="Avatar"
      >
    </div>
    <div class="flex mt-4 justify-between items-center">
      <span class="text-sm text-gray-600">{{ task.date }}</span>
      <Badge v-if="task.type" :color="badgeColor">{{ task.type }}</Badge>
    </div>
  </div>
</template>
