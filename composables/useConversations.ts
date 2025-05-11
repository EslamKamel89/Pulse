import type { UseFetchKey } from "~/types";
import type { Conversation, Message } from "~/types/db";
const conversations = ref<Conversation[]>();
const conversationsStatus = ref<"error" | "idle" | "pending" | "success">();

// const status
const fetchData = async () => {
  pr("fetchData is executed");
  const { data, status, execute } = await useFetch<Conversation[]>(
    "/api/conversations",
    {
      lazy: true,
      server: false,
      immediate: false,
      key: "conversations" as UseFetchKey,
      onResponse(res) {
        conversations.value = res.response._data;
      },
    },
  );
  await execute();
  // conversations.value = data.value ?? [];
  conversationsStatus.value = status.value;
};

export const useConversations = () => {
  const bottomDiv = ref<HTMLDivElement | null>(null);
  const { conversationId } = toRefs(useStore().state.value);
  const { $pusher } = useNuxtApp();
  const addMessageToConversationsFromSocket = (newMessage: Message) => {
    conversations.value = conversations.value?.map((conversation) => {
      if (newMessage.conversationId !== conversation.id) {
        return conversation;
      } else {
        return {
          ...conversation,
          messages: [...(conversation?.messages ?? []), newMessage],
        };
      }
    });
    bottomDiv.value?.scrollIntoView();
  };
  onMounted(() => {
    pr("useConversations composable onMounted hook is called");
    fetchData();
    $pusher.subscribe(`conversation.${conversationId?.value}`);
    $pusher.bind("message:new", addMessageToConversationsFromSocket);
  });

  return {
    conversations,
    conversationsStatus,
    bottomDiv,
  };
};
