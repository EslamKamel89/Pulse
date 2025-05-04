import type { ApiError } from "~/types/index.d.ts";
interface State {
  appError: ApiError | null;
  isLoading: boolean;
}
const state = ref<State>();
export const useStore = () => {
  if (!state.value) {
    state.value = {
      appError: null,
      isLoading: false,
    };
  }

  return {
    state,
  };
};
