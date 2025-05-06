import fs from "fs";
import path from "path";
import baseUrl from "~/utils/helpers";
export default defineEventHandler(async (event) => {
  await requireUserSession(event);
  const resource = getRouterParam(event, "resource");
  const parts = await readMultipartFormData(event);
  const response: { url: string | null } = { url: null };
  if (!parts || !parts?.length) {
    // todo: unlink the attached image from the database
    return response;
  }
  for (const part of parts) {
    if (part.filename && part.name == "file") {
      const filePath = path.join(
        process.cwd(),
        `public/storage/${resource}`,
        part.filename,
      );
      fs.writeFileSync(filePath, part.data);
      response.url = `${baseUrl()}/storage/${resource}/${part.filename}`;
    }
  }
  return response;
});
