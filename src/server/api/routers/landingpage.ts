import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

const MAX_SECTIONS_PER_PAGE = 25;

export const landingPageRouter = createTRPCRouter({
  // Get all landing pages for current user
  getAll: protectedProcedure
    .input(z.object({ archived: z.boolean().optional() }).optional())
    .query(async ({ ctx, input }) => {
      return ctx.db.landingPage.findMany({
        where: {
          userId: ctx.session.user.id,
          archived: input?.archived ?? false,
        },
        orderBy: { updatedAt: "desc" },
        include: {
          sections: {
            orderBy: { order: "asc" },
            include: {
              buttons: true,
              images: true,
            },
          },
        },
      });
    }),

  // Get single landing page by ID
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const landingPage = await ctx.db.landingPage.findUnique({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
        include: {
          sections: {
            orderBy: { order: "asc" },
            include: {
              buttons: true,
              images: true,
            },
          },
        },
      });

      if (!landingPage) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Landing page not found",
        });
      }

      return landingPage;
    }),

  // Create new landing page
  create: protectedProcedure
    .input(
      z.object({
        url: z.string().url("Invalid URL format"),
        description: z.string().min(1, "Description is required"),
        sections: z
          .array(
            z.object({
              name: z.string().min(1, "Section name is required"),
              intro: z.string().optional(),
              title: z.string().optional(),
              subtitle: z.string().optional(),
              description: z.string().optional(),
              buttons: z
                .array(
                  z.object({
                    label: z.string().min(1, "Button label is required"),
                    linkType: z.enum(["url", "scroll"]),
                    value: z.string().min(1, "Button value is required"),
                  }),
                )
                .max(3, "Maximum 3 buttons per section")
                .optional(),
              images: z
                .array(
                  z.object({
                    url: z.string().url("Invalid image URL"),
                    alt: z.string().optional(),
                  }),
                )
                .max(8, "Maximum 8 images per section")
                .optional(),
            }),
          )
          .max(
            MAX_SECTIONS_PER_PAGE,
            `Maximum ${MAX_SECTIONS_PER_PAGE} sections per landing page`,
          )
          .optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Check if URL already exists for this user
      const existingPage = await ctx.db.landingPage.findFirst({
        where: {
          userId: ctx.session.user.id,
          url: input.url,
        },
      });

      if (existingPage) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "A landing page with this URL already exists",
        });
      }

      return ctx.db.landingPage.create({
        data: {
          url: input.url,
          description: input.description,
          userId: ctx.session.user.id,
          sections: input.sections
            ? {
                create: input.sections.map((section, index) => ({
                  name: section.name,
                  intro: section.intro,
                  title: section.title,
                  subtitle: section.subtitle,
                  description: section.description,
                  order: index,
                  buttons: section.buttons
                    ? {
                        create: section.buttons,
                      }
                    : undefined,
                  images: section.images
                    ? {
                        create: section.images,
                      }
                    : undefined,
                })),
              }
            : undefined,
        },
        include: {
          sections: {
            orderBy: { order: "asc" },
            include: {
              buttons: true,
              images: true,
            },
          },
        },
      });
    }),

  // Duplicate landing page
  duplicate: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const original = await ctx.db.landingPage.findUnique({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
        include: {
          sections: {
            orderBy: { order: "asc" },
            include: {
              buttons: true,
              images: true,
            },
          },
        },
      });

      if (!original) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Landing page not found",
        });
      }

      // Find next available URL suffix (-2, -3, etc.)
      let suffix = 2;
      let newUrl = `${original.url}-${suffix}`;

      while (true) {
        const existing = await ctx.db.landingPage.findFirst({
          where: {
            userId: ctx.session.user.id,
            url: newUrl,
          },
        });

        if (!existing) break;
        suffix++;
        newUrl = `${original.url}-${suffix}`;
      }

      // Create duplicate with new URL
      return ctx.db.landingPage.create({
        data: {
          url: newUrl,
          description: original.description,
          userId: ctx.session.user.id,
          archived: original.archived,
          sections: {
            create: original.sections.map((section) => ({
              name: section.name,
              intro: section.intro,
              title: section.title,
              subtitle: section.subtitle,
              description: section.description,
              order: section.order,
              buttons: {
                create: section.buttons.map((btn) => ({
                  label: btn.label,
                  linkType: btn.linkType,
                  value: btn.value,
                })),
              },
              images: {
                create: section.images.map((img) => ({
                  url: img.url,
                  alt: img.alt,
                })),
              },
            })),
          },
        },
        include: {
          sections: {
            orderBy: { order: "asc" },
            include: {
              buttons: true,
              images: true,
            },
          },
        },
      });
    }),

  // Archive landing page
  archive: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.landingPage.update({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
        data: {
          archived: true,
        },
      });
    }),

  // Unarchive landing page
  unarchive: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.landingPage.update({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
        data: {
          archived: false,
        },
      });
    }),

  // Update landing page
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        url: z.string().url("Invalid URL format").optional(),
        description: z.string().min(1, "Description is required").optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateData } = input;

      // If updating URL, check for conflicts
      if (updateData.url) {
        const existingPage = await ctx.db.landingPage.findFirst({
          where: {
            userId: ctx.session.user.id,
            url: updateData.url,
            NOT: { id },
          },
        });

        if (existingPage) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "A landing page with this URL already exists",
          });
        }
      }

      return ctx.db.landingPage.update({
        where: {
          id,
          userId: ctx.session.user.id,
        },
        data: updateData,
        include: {
          sections: {
            orderBy: { order: "asc" },
            include: {
              buttons: true,
              images: true,
            },
          },
        },
      });
    }),

  // Delete landing page
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.landingPage.delete({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      });
    }),

  // Export landing page to TXT format
  export: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const landingPage = await ctx.db.landingPage.findUnique({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
        include: {
          sections: {
            orderBy: { order: "asc" },
            include: {
              buttons: true,
              images: true,
            },
          },
        },
      });

      if (!landingPage) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Landing page not found",
        });
      }

      // Format TXT export according to specifications
      let txtContent = `LANDING PAGE: ${landingPage.url}\nDESCRIPTION: ${landingPage.description}\n\n`;

      landingPage.sections.forEach((section, index) => {
        txtContent += `=== SECTION ${index + 1}: ${section.name} ===\n`;
        if (section.intro) txtContent += `Intro: ${section.intro}\n`;
        if (section.title) txtContent += `Title: ${section.title}\n`;
        if (section.subtitle) txtContent += `Subtitle: ${section.subtitle}\n`;
        if (section.description)
          txtContent += `Description: ${section.description}\n`;

        if (section.buttons.length > 0) {
          const buttonStrings = section.buttons.map(
            (btn) => `${btn.label} -> ${btn.value} (${btn.linkType})`,
          );
          txtContent += `Buttons: ${buttonStrings.join(", ")}\n`;
        }

        if (section.images.length > 0) {
          const imageUrls = section.images.map((img) => img.url);
          txtContent += `Images: ${imageUrls.join(", ")}\n`;
        }

        txtContent += "\n";
      });

      txtContent += `---\nTotal Sections: ${landingPage.sections.length}\nGenerated: ${new Date().toLocaleString()}\n`;

      return {
        filename: `landing-page-${landingPage.id}.txt`,
        content: txtContent,
      };
    }),
});
