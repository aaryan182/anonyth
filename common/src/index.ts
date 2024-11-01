import { z } from "zod";

export const userSignupSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const userSigninSchema = z.object({
  id: z.string(),
  password: z.string(),
});

export const postCreateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

export const postUpdateSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

export const paginationSchema = z.object({
  page: z.string().optional().default("1"),
});

export type UserSignup = z.infer<typeof userSignupSchema>;
export type UserSignin = z.infer<typeof userSigninSchema>;
export type PostCreate = z.infer<typeof postCreateSchema>;
export type PostUpdate = z.infer<typeof postUpdateSchema>;
export type Pagination = z.infer<typeof paginationSchema>;
