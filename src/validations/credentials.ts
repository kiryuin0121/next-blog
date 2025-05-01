import { z } from "zod";
// passwordはgoogleの基準値を採用
export const credentialsSchema = z.object({
  email: z.string().min(6).max(128).email(),
  password: z.string().min(8).max(64),
});
