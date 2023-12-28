<script setup lang="ts">
const fileInput = ref<HTMLElement>()

const handleClick = () => {
  fileInput.value?.click()
}
</script>

<template>
  <div class="upload-picture" @click="handleClick">
    <input ref="fileInput" type="file" accept="image/*">
    <slot><VIcon icon="tabler-plus" /></slot>
  </div>
</template>

<style lang="scss" scoped>
.upload-picture {
  --card-size: 148px;
  background-color: var(--el-fill-color-lighter);
  border: 1px dashed red;
  border-radius: 6px;
  width: var(--card-size);
  height: var(--card-size);
  cursor: pointer;
  vertical-align: top;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;

  &:hover {
    border-color: green;
  }

  input {
    display: none;
  }
}
</style>
