<script setup lang="ts">
import { upload as uploadImage } from '@/plugins/firebase/firebase'

interface Props {
  rounded?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  rounded: false,
})

const fileInput = ref<HTMLElement>()
const imageUrl = ref<string | null>('')
const selectedFile = ref<File | null>(null)
const zoomOut = ref<boolean>(false)

const upload = () => {
  if (selectedFile.value)
    uploadImage(selectedFile.value)
}

const previewImage = (e: Event) => {
  const target = e.target as HTMLInputElement

  selectedFile.value = (target.files as FileList)[0]

  if (selectedFile.value) {
    const reader = new FileReader()

    reader.onload = (evt: ProgressEvent<FileReader>) => {
      if (evt.target && typeof evt.target.result === 'string')
        imageUrl.value = evt.target.result
    }

    reader.readAsDataURL(selectedFile.value)

    return
  }
  selectedFile.value = null
}

const removeImage = (e: Event) => {
  e.stopPropagation()
  imageUrl.value = null
  selectedFile.value = null
}

const zoomImage = (e: Event) => {
  e.stopPropagation()
  zoomOut.value = true
}

const handleClick = () => {
  fileInput.value?.click()
}

defineExpose({
  upload,
})
</script>

<template>
  <div class="upload-picture" :class="{ 'rounded-50': props.rounded }" v-bind="$attrs" @click="handleClick">
    <div v-if="imageUrl" class="upload-picture--cover">
      <div class="upload-picture--tool d-flex" :class="{ 'rounded-50': props.rounded }">
        <VIcon icon="tabler-zoom-in" class="mr-1" title="zoom out" @click="zoomImage" />
        <VIcon icon="tabler-circle-minus" title="remove" @click="removeImage" />
      </div>
      <img :src="imageUrl" alt="Selected Image" style="max-width: 100%;" :style="props.rounded ? 'height: 100%; border-radius: 50%;' : ''">
    </div>
    <slot v-else name="icon"><VIcon icon="tabler-plus" /></slot>
    <input ref="fileInput" type="file" accept="image/*" @change="previewImage">
  </div>

  <VDialog v-model="zoomOut" width="50%">
    <VImg :src="imageUrl" />
    <VBtn class="icon--close" @click="() => zoomOut = false">Close</VBtn>
  </VDialog>
</template>

<style lang="scss" scoped>
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-picture {
  --card-size: 150px;
  background-color:  rgb(var(--v-theme-background));
  border: 1px dashed rgb(var(--v-theme-grey-400));
  border-radius: 6px;
  width: var(--card-size);
  height: var(--card-size);
  cursor: pointer;
  @extend .flex-center;
  font-size: 1.5em;
  transition: all .3s ease-in;
  position: relative;

  &:hover {
    border-color: rgb(var(--v-theme-primary));
  }

  input {
    display: none;
  }

  img {
    object-fit: cover;
  }

  &--cover {
    width: 100%;
    height: 100%;
    position: relative;
    @extend .flex-center;
  }

  &--tool {
    position: absolute;
    background: rgba(0, 0, 0, .5);
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity .3s ease-in;
    @extend .flex-center;
    &:hover {
      opacity: 1;
    }
  }

}
.icon--close {
  width: fit-content;
  margin: 2em auto 0;
}

.rounded-50 {
  border-radius: 50%;
}
</style>
