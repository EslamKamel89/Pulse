import type { NavRoute } from "~/types";

export const useRoutes = () => {
  const { clear, fetch } = useUserSession();
  const { params } = useRoute();
  const { isDark, colorMode, icon } = useTheme();

  const logout = async () => {
    await clear();
    await fetch();
    await navigateTo("/");
  };
  const routes = computed<NavRoute[]>(() => {
    return [
      {
        label: "Chat",
        href: "/conversations",
        icon: "heroicons:chat-bubble-oval-left-ellipsis-solid",
        active: params.name === "conversations",
        onClick: null,
      },
      {
        label: "Users",
        href: "/user",
        icon: "heroicons:users-20-solid",
        active: params.name === "users",
        onClick: null,
      },
      {
        label: "Logout",
        onClick: () => {
          logout();
        },
        href: "#",
        icon: "heroicons:arrow-left-on-rectangle",
        active: false,
      },
      {
        label: "Toggle Theme",
        onClick: () => {
          isDark.value = !isDark.value;
        },
        href: "#",
        icon: icon.value,
        active: false,
      },
    ];
  });
  return {
    routes,
    logout,
  };
};
