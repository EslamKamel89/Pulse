export const useRoutes = () => {
  const { clear, fetch } = useUserSession();
  const { params } = useRoute();
  const { isDark, colorMode } = useTheme();
};
