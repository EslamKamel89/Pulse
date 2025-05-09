import type { UseFetchKey } from "~/types";
import type { User } from "~/types/db";

const open = ref(false);
const image = ref<string | null>(null);
const message = ref<string | null>(null);
export const useCreateMessage = () => {
  const user = ref(useUserSession().user.value as User);
  const { setLoading, showToast, setAppError } = useStore();
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
  const conversationId = Number(useRoute().params.conversationId);
  const handleSendMessage = async () => {
    if (!message.value?.length) return;
    try {
      setLoading(true);
      const newMessage = await $fetch("/api/messages", {
        method: "POST",
        body: {
          body: message.value,
          conversationId,
          image: image.value,
        },
      });
      if (newMessage) {
        refreshNuxtData("conversations" as UseFetchKey);
        image.value = null;
        message.value = null;
      } else {
        setAppError({
          message: "Unkown Error Occured",
          statusMessage: "Unkown Error Occured",
        });
      }
    } catch (error) {
      setAppError(handleApiError(error));
    } finally {
      setLoading(false);
      setAppError(null);
    }
  };
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
