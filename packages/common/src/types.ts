import { z } from "zod";

// CreateUser schema
export const CreateUserSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string(),
  name: z.string(),
});

// Signin schema
export const SigninSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string(),
});

// CreateRoom schema
export const CreateRoom = z.object({
  name: z.string().min(3).max(20),
});
