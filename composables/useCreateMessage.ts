import type { User } from "~/types/db";

const open = ref(false);
const image = ref<string | null>(null);
const message = ref<string | null>(null);
export const useCreateMessage = () => {
  const user = ref(useUserSession().user.value as User);
  const { setLoading, showToast } = useStore();
  const handleImageSelect = async (file: File | null) => {
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
  const handleImageDelete = () => {
    image.value = null;
  };
  const closeModal = () => {
    open.value = false;
  };
  const handleSendMessage = async () => {};
  return {
    message,
    image,
    open,
    user,
    handleImageSelect,
    closeModal,
    handleSendMessage,
    handleImageDelete,
  };
};
