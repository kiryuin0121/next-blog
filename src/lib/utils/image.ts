import { writeFile } from "fs/promises";
import path from "path";

export const saveImage = async (file: File): Promise<string | null> => {
  const data = await file.arrayBuffer();
  const buffer = Buffer.from(data);

  const fileName = `${Date.now()}_${file.name}`;
  const uploadDir = path.join(process.cwd(), "public/images");
  try {
    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);
    return `/images/${fileName}`;
  } catch (error) {
    console.error("画像保存Error", error);
    return null;
  }
};
