<script setup lang="ts">
import { Trash } from "lucide-vue-next";
defineProps<{
  title: string;
}>();
const selectedFile = ref<File | null>(null);
const isDragging = ref(false);
const emit = defineEmits<{
  onChange: [file: File | null];
}>();
const handleFileChange = (event: Event) => {
  const newFiles = (event.target as HTMLInputElement).files;
  if (newFiles) {
    const files = Array.from(newFiles);
    selectedFile.value = files.length ? files[0] : null;
    emit("onChange", selectedFile.value);
  }
};
const handleFileRemove = () => {
  selectedFile.value = null;
  updateFileInput();
};
const updateFileInput = () => {
  const dataTransfer = new DataTransfer();

  // files.value = dataTransfer.files;

  const fileInput = document.getElementById(
    "dropzone-file-single",
  ) as HTMLInputElement;

  if (fileInput?.files) {
    fileInput.files = null;
  }

  emit("onChange", selectedFile.value);
};
const getPreviewUrl = (file: File) => URL.createObjectURL(file);
const onDrop = (event: Event) => {
  isDragging.value = false;
  const files: FileList | null | undefined = (event as any)?.dataTransfer
    ?.files;
  if (!files || !files.length) return;
  selectedFile.value = files[0];
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
    <h3 class="mb-3 font-bold">{{ title }}</h3>
    <div class="flex w-full flex-col space-y-4">
      <div class="flex w-full items-center justify-center">
        <label
          for="dropzone-file-single"
          class="flex h-28 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
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
              {{ isDragging ? "Release to upload" : "Drag & drop image here" }}
            </p>
            <p class="text-xs text-gray-500">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file-single"
            type="file"
            class="hidden"
            @change="handleFileChange"
            :multiple="false"
          />
        </label>
      </div>
      <template v-if="selectedFile">
        <div
          class="mx-auto my-4 grid w-fit grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        >
          <div class="relative">
            <Trash
              @click="handleFileRemove"
              class="absolute -top-2 -right-2 h-10 w-10 cursor-pointer rounded-full bg-white px-2 py-1 text-red-500"
            />
            <img
              :src="getPreviewUrl(selectedFile)"
              alt=""
              class="rounded-lg border"
            />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
