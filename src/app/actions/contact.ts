"use server";

import { ContactFormSchema, type ContactFormState } from "@/types/contact";

/**
 * Server Action for contact form submission
 * Uses React 19 Server Actions pattern
 */
export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Extract form data
  const rawFormData = {
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  };

  // Validate using Zod schema
  const validationResult = ContactFormSchema.safeParse(rawFormData);

  if (!validationResult.success) {
    // Return validation errors
    const errors = validationResult.error.flatten().fieldErrors;
    return {
      success: false,
      message: "",
      errors: {
        name: errors.name,
        email: errors.email,
        subject: errors.subject,
        message: errors.message,
      },
    };
  }

  try {
    // TODO: Phase 2 - Implement actual email sending
    // For now, simulate successful submission
    console.log("Contact form submission:", validationResult.data);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      success: true,
      message: "お問い合わせを送信しました。ご連絡ありがとうございます。",
    };
  } catch (error) {
    console.error("Contact form error:", error);

    return {
      success: false,
      message: "",
      errors: {
        _form: ["送信中にエラーが発生しました。もう一度お試しください。"],
      },
    };
  }
}
