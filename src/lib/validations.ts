import { z } from "zod";

// Limits
export const MAX_SECTIONS_PER_PAGE = 25;
export const MAX_BUTTONS_PER_SECTION = 3;
export const MAX_IMAGES_PER_SECTION = 8;

// Button schema
export const buttonSchema = z.object({
  id: z.string().optional(),
  label: z.string().min(1, "Button label is required"),
  linkType: z.enum(["url", "scroll"]),
  value: z.string().min(1, "Button value is required"),
});

// Image schema
export const imageSchema = z.object({
  id: z.string().optional(),
  url: z.string().url("Invalid image URL"),
  alt: z.string().optional(),
});

// Section schema
export const sectionSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Section name is required"),
  intro: z.string().max(80, "Intro must be 80 characters or less").optional(),
  title: z.string().max(80, "Title must be 80 characters or less").optional(),
  subtitle: z
    .string()
    .max(160, "Subtitle must be 160 characters or less")
    .optional(),
  description: z.string().optional(),
  buttons: z
    .array(buttonSchema)
    .max(
      MAX_BUTTONS_PER_SECTION,
      `Maximum ${MAX_BUTTONS_PER_SECTION} buttons per section`,
    )
    .optional(),
  images: z
    .array(imageSchema)
    .max(
      MAX_IMAGES_PER_SECTION,
      `Maximum ${MAX_IMAGES_PER_SECTION} images per section`,
    )
    .optional(),
});

// Landing page schema
export const landingPageSchema = z.object({
  id: z.string().optional(),
  url: z.string().url("Invalid URL format"),
  description: z.string().min(1, "Description is required"),
  sections: z
    .array(sectionSchema)
    .max(
      MAX_SECTIONS_PER_PAGE,
      `Maximum ${MAX_SECTIONS_PER_PAGE} sections per landing page`,
    )
    .optional(),
});

// Types
export type Button = z.infer<typeof buttonSchema>;
export type Image = z.infer<typeof imageSchema>;
export type Section = z.infer<typeof sectionSchema>;
export type LandingPage = z.infer<typeof landingPageSchema>;
