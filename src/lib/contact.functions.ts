import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(120),
  phone: z.string().trim().min(6, "Phone is required").max(40),
  message: z.string().trim().min(5, "Message is required").max(4000),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactResult = { ok: true } | { ok: false; error: string };

/**
 * Receives a contact request and emails it to info@otherlogic.com.
 * The email delivery itself is activated once the project's email
 * domain is configured (Lovable → Cloud → Emails).
 */
export const submitContact = createServerFn({ method: "POST" })
  .inputValidator(contactSchema)
  .handler(async ({ data }): Promise<ContactResult> => {
    const recipient = "info@otherlogic.com";
    // Delivery is wired to the platform email service once a sender
    // domain is configured. Until then, acknowledge receipt to the
    // caller but signal that email isn't active yet.
    console.log("[contact] request received", { recipient, name: data.name });
    return { ok: false, error: "EMAIL_NOT_CONFIGURED" };
  });
