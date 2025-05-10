import type { UseFetchKey } from "~/types";
import type { Conversation, Message } from "~/types/db";
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
  const { conversationId } = toRefs(useStore().state.value);
  const { $pusher } = useNuxtApp();
  onMounted(() => {
    pr("useConversations composable onMounted hook is called");
    fetchData();
    $pusher.subscribe(`conversation.${conversationId?.value}`);
    $pusher.bind("message:new", (message: Message[]) => {
      // conversation
    });
  });
  return {
    conversations,
    conversationsStatus,
  };
};
