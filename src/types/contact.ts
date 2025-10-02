import { z } from "zod";

/**
 * Contact form data schema for validation
 */
export const ContactFormSchema = z.object({
  name: z.string().min(1, "名前を入力してください").max(100, "名前は100文字以内で入力してください"),
  email: z
    .string()
    .min(1, "メールアドレスを入力してください")
    .email("有効なメールアドレスを入力してください"),
  subject: z
    .string()
    .min(1, "件名を入力してください")
    .max(200, "件名は200文字以内で入力してください"),
  message: z
    .string()
    .min(10, "メッセージは10文字以上入力してください")
    .max(5000, "メッセージは5000文字以内で入力してください"),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;

/**
 * Contact form state for useActionState
 */
export interface ContactFormState {
  success: boolean;
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    subject?: string[];
    message?: string[];
    _form?: string[];
  };
}
