import type { User } from "~/types/db";

const open = ref(false);
const image = ref<string | null>(null);
export const useCreateMessage = () => {
  const user = ref(useUserSession().user.value as User);
  const { setLoading, showToast } = useStore();
  const handleFileSelect = async (file: File | null) => {
    pr(file, "modal.vue - file selected");
    setLoading(true);
    image.value = await fileUpload(file, "chat");
    pr(image.value, "Image success");
    showToast({
      type: "success",
      message: "Your Image Uploaded Successfully",
    });
    setLoading(false);
  };
  const closeModal = () => {
    open.value = false;
  };
  return {
    image,
    open,
    user,
    handleFileSelect,
    closeModal,
  };
};
