import { z } from "zod";

const LEAD_STATUSES = [
  "new",
  "contacted",
  "replied",
  "call_booked",
  "proposal_sent",
  "won",
  "lost",
  "unsubscribed",
] as const;

const LEAD_SOURCES = [
  "website",
  "resend",
  "fiverr",
  "referral",
  "cold_call",
  "whatsapp",
  "other",
] as const;

const blankToNull = (v: unknown) =>
  typeof v === "string" && v.trim() === "" ? null : v;

export const leadCsvRowSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid email")
    .max(200),
  phone: z.preprocess(blankToNull, z.string().trim().max(40).nullable().optional()),
  company: z.preprocess(blankToNull, z.string().trim().max(160).nullable().optional()),
  website_url: z.preprocess(blankToNull, z.string().trim().max(300).nullable().optional()),
  niche: z.preprocess(blankToNull, z.string().trim().max(160).nullable().optional()),
  goal: z.preprocess(blankToNull, z.string().trim().max(2000).nullable().optional()),
  notes: z.preprocess(blankToNull, z.string().trim().max(2000).nullable().optional()),
  source: z.preprocess(
    (v) => {
      if (typeof v !== "string") return v;
      const trimmed = v.trim().toLowerCase();
      return trimmed === "" ? undefined : trimmed;
    },
    z.enum(LEAD_SOURCES).catch("other").optional()
  ),
  status: z.preprocess(
    (v) => {
      if (typeof v !== "string") return v;
      const trimmed = v.trim().toLowerCase();
      return trimmed === "" ? undefined : trimmed;
    },
    z.enum(LEAD_STATUSES).catch("new").optional()
  ),
});

export type LeadCsvRow = z.infer<typeof leadCsvRowSchema>;

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
