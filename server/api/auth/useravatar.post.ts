import fs from "fs";
import path from "path";
import baseUrl from "~/utils/helpers";
export default defineEventHandler(async (event) => {
  const parts = await readMultipartFormData(event);
  const response: { url: string | null } = { url: null };
  if (!parts || !parts?.length) {
    // todo : unlink the attached image from the server
    return response;
  }
  for (const part of parts) {
    if (part.filename && part.name == "image") {
      const filePath = path.join(
        process.cwd(),
        "public/storage/useravatar",
        part.filename,
      );
      fs.writeFileSync(filePath, part.data);
      response.url = `${baseUrl()}/storage/useravatar/${part.filename}`;
    }
  }
  return response;
});
