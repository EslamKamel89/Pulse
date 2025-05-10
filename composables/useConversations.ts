import type { UseFetchKey } from "~/types";
import type { Conversation } from "~/types/db";
const conversations = ref<Conversation[]>();
const conversationsStatus = ref<"error" | "idle" | "pending" | "success">();
// const status
const fetchData = async () => {
  const { data, status, execute } = await useFetch<Conversation[]>(
    "/api/conversations",
    {
      lazy: true,
      server: false,
      immediate: false,
      key: "conversations" as UseFetchKey,
    },
  );
  await execute();
  conversations.value = data.value ?? [];
  conversationsStatus.value = status.value;
};
export const useConversations = () => {
  onMounted(() => {
    pr("useConversations is called");
    fetchData();
    // execute();
  });
  return {
    conversations,
    conversationsStatus,
  };
};
