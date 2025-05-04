export default function useTheme() {
  const colorMode = useColorMode();

  const isDark = computed({
    get() {
      return colorMode.value === "dark";
    },
    set(_isDark) {
      colorMode.preference = _isDark ? "dark" : "light";
    },
  });
  const icon = computed(() => {
    return isDark.value ? "i-lucide-moon" : "i-lucide-sun";
  });
  return {
    colorMode,
    isDark,
    icon,
  };
}
