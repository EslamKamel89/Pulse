import type { ApiError } from "~/types/index.d.ts";
interface State {
  apiError: ApiError | null;
  isLoading: boolean;
}
const initialState: State = {
  apiError: null,
  isLoading: false,
};
const state = ref<State>(initialState);
export const useStore = () => {
  const setAppError = (error: ApiError | null) => {
    state.value.apiError = error;
  };
  const setLoading = (loading: boolean) => {
    state.value.isLoading = loading;
  };
  const resetState = () => {
    state.value = initialState;
  };
  const toast = useToast();
  const showToast = (props: {
    message: string;
    description?: string;
    icon?: string;
    type: "success" | "error";
  }) => {
    toast.add({
      title: props.message,
      description: props.description,
      icon: props.icon,
      color: props.type === "success" ? "success" : "error",
    });
  };
  return {
    state,
    setAppError,
    setLoading,
    resetState,
    showToast,
  };
};
