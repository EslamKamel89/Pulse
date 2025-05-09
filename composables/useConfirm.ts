import { LazySharedConfirm } from "#components";
type ColorType =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "error"
  | "neutral"
  | undefined;
export const useConfirm = (options: {
  title?: string;
  description?: string;
  yesColor?: ColorType;
  hanldeConfirm?: (confirm: boolean) => void;
}) => {
  const overlay = useOverlay();
  const confirm = ref<boolean>();
  const modal = overlay.create(LazySharedConfirm, {
    props: options,
  });
  async function open() {
    const instance = modal.open();

    const result = await instance.result;

    confirm.value = result as boolean;
  }
  return {
    confirm,
    open,
  };
};
