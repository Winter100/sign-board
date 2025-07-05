import { z } from "zod/v4";

export const pointsSchema = z.object({
  x: z.number(),
  y: z.number(),
});

export const pathsSchema = z.object({
  points: z.array(z.array(pointsSchema)),
});

export const createSignSchema = z.object({
  avatar: z.string().trim().min(1),
  writer: z.string().trim().min(1, "작성자를 적어주세요.").max(15),
  password: z.string().trim().min(4).max(15),
  message: z.string().min(1).max(200),
  paths: z.array(z.array(pointsSchema)).min(1, "서명을 작성해주세요!"),
});

export const signSchema = z.object({
  avatar: z.string(),
  created_at: z.string(),
  id: z.string(),
  writer: z.string(),
  message: z.string(),
  image_url: z.url(),
});

export const infiniteSignSchema = z.object({
  item: z.array(signSchema),
  hasNextPage: z.boolean().optional(),
  nextCursor: z.string().nullable().optional(),
});

export const postSignsSchema = z.object({
  message: z.string(),
});

export const deleteSignSchema = z.object({
  message: z.string(),
});

export type CreateSignType = z.infer<typeof createSignSchema>;
export type SignType = z.infer<typeof signSchema>;
export type PathsType = z.infer<typeof pathsSchema>;
export type InfiniteSignType = z.infer<typeof infiniteSignSchema>;
export type PostSignsType = z.infer<typeof postSignsSchema>;
export type DeleteSignType = z.infer<typeof deleteSignSchema>;
