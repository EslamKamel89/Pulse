export const fileUpload = async (
  file: File | null,
  resource: string,
): Promise<string | null> => {
  const fd = new FormData();
  if (!file) {
    return null;
  }
  fd.append("file", file);
  const { setAppError } = useStore();
  try {
    const { url } = await $fetch<{ url: string | null }>(
      `/api/upload/${resource}/file`,
      {
        method: "POST",
        body: fd,
      },
    );
    pr(url, "fileUpload");
    return url;
  } catch (error) {
    pr(error, "Error fileUpload");
    setAppError(handleApiError(error));
    return null;
  } finally {
    setAppError(null);
  }
};
