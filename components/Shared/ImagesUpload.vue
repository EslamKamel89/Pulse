<script setup lang="ts">
import { Trash } from "lucide-vue-next";

// const files = ref<FileList>();
const filesArray = ref<File[]>([]);
const isDragging = ref(false);
const emit = defineEmits<{
  onChange: [files: File[]];
}>();
const handleFileChange = (event: Event) => {
  const newFiles = (event.target as HTMLInputElement).files;

  if (newFiles) {
    // files.value = newFiles;
    filesArray.value = Array.from(newFiles);
    emit("onChange", filesArray.value);
  }
};
const handleFileRemove = (index: number) => {
  // if (!files.value) return;
  if (!filesArray.value.length) return;
  filesArray.value = filesArray.value.filter((_, i) => i !== index);
  updateFileInput();
};
const updateFileInput = () => {
  const dataTransfer = new DataTransfer();

  filesArray.value.forEach((file) => {
    dataTransfer.items.add(file);
  });

  // files.value = dataTransfer.files;

  const fileInput = document.getElementById(
    "dropzone-file",
  ) as HTMLInputElement;

  if (fileInput) {
    fileInput.files = dataTransfer.files;
  }
  // emit("onChange", files.value);
  emit("onChange", filesArray.value);
};
const getPreviewUrl = (file: File) => URL.createObjectURL(file);
const onDrop = (event: Event) => {
  isDragging.value = false;
  const files: FileList | null | undefined = (event as any)?.dataTransfer
    ?.files;
  if (!files) return;
  Array.from(files).map((file) => filesArray.value.push(file));
};
const onDragLeave = (event: Event) => {
  isDragging.value = false;
};
const onDragEnter = () => {
  isDragging.value = true;
};
</script>

<template>
  <div class="my-4">
    <h3 class="font-bold">Attached New Images</h3>
    <div class="flex w-full flex-col space-y-4">
      <div class="flex w-full items-center justify-center">
        <label
          for="dropzone-file"
          class="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
          @dragenter.prevent="onDragEnter"
          @dragstart.prevent="onDragEnter"
          @dragover.prevent="onDragEnter"
          @dragleave.prevent="onDragLeave"
          @drop.prevent="onDrop"
        >
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              class="mb-4 h-8 w-8 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p class="mb-2 text-sm font-semibold text-gray-500">
              {{ isDragging ? "Release to upload" : "Drag & drop images here" }}
            </p>
            <p class="text-xs text-gray-500">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            class="hidden"
            @change="handleFileChange"
            :multiple="true"
          />
        </label>
      </div>
      <template v-if="filesArray.length">
        <div
          class="mx-auto my-4 grid w-fit grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        >
          <div
            v-for="(file, index) in filesArray"
            :key="file.name"
            class="relative"
          >
            <Trash
              @click="handleFileRemove(index)"
              class="absolute -top-2 -right-2 h-10 w-10 cursor-pointer rounded-full bg-white px-2 py-1 text-red-500"
            />
            <img :src="getPreviewUrl(file)" alt="" class="rounded-lg border" />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
