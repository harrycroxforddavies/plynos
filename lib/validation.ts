import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2, "Please enter your name").max(120),
  email: z.string().email("Please enter a valid email").max(200),
  phone: z
    .string()
    .max(40)
    .optional()
    .nullable()
    .refine(
      (v) => !v || /^\+\d[\d\s().-]{6,}$/.test(v),
      "Please include your country code, e.g. +44 7700 900123"
    ),
  company: z.string().max(160).optional().nullable(),
  website_url: z
    .string()
    .max(300)
    .optional()
    .nullable()
    .refine(
      (v) => !v || /^(https?:\/\/)?[\w.-]+\.[a-z]{2,}.*$/i.test(v),
      "Please enter a valid URL or leave blank"
    ),
  niche: z.string().max(160).optional().nullable(),
  goal: z.string().min(10, "Tell us a bit more about the goal").max(2000),
  deadline: z.string().max(160).optional().nullable(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Consent is required" }),
  }),
  // honeypot
  website: z.string().max(0).optional().nullable(),
});

export type LeadInput = z.infer<typeof leadSchema>;
