import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

const MAX_SECTIONS_PER_PAGE = 25;

export const sectionRouter = createTRPCRouter({
  // Create new section
  create: protectedProcedure
    .input(
      z.object({
        landingPageId: z.string(),
        name: z.string().min(1, "Section name is required"),
        intro: z
          .string()
          .max(80, "Intro must be 80 characters or less")
          .optional(),
        title: z
          .string()
          .max(80, "Title must be 80 characters or less")
          .optional(),
        subtitle: z
          .string()
          .max(160, "Subtitle must be 160 characters or less")
          .optional(),
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
    .mutation(async ({ ctx, input }) => {
      // Verify user owns the landing page
      const landingPage = await ctx.db.landingPage.findUnique({
        where: {
          id: input.landingPageId,
          userId: ctx.session.user.id,
        },
      });

      if (!landingPage) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Landing page not found",
        });
      }

      // Check section limit for the landing page
      const sectionCount = await ctx.db.section.count({
        where: { landingPageId: input.landingPageId },
      });

      if (sectionCount >= MAX_SECTIONS_PER_PAGE) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: `Maximum ${MAX_SECTIONS_PER_PAGE} sections allowed per landing page`,
        });
      }

      // Get the next order number
      const lastSection = await ctx.db.section.findFirst({
        where: { landingPageId: input.landingPageId },
        orderBy: { order: "desc" },
      });

      const nextOrder = lastSection ? lastSection.order + 1 : 0;

      const { landingPageId, buttons, images, ...sectionData } = input;

      return ctx.db.section.create({
        data: {
          ...sectionData,
          landingPageId,
          order: nextOrder,
          buttons: buttons
            ? {
                create: buttons,
              }
            : undefined,
          images: images
            ? {
                create: images,
              }
            : undefined,
        },
        include: {
          buttons: true,
          images: true,
        },
      });
    }),

  // Update section
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1, "Section name is required").optional(),
        intro: z
          .string()
          .max(80, "Intro must be 80 characters or less")
          .optional(),
        title: z
          .string()
          .max(80, "Title must be 80 characters or less")
          .optional(),
        subtitle: z
          .string()
          .max(160, "Subtitle must be 160 characters or less")
          .optional(),
        description: z.string().optional(),
        buttons: z
          .array(
            z.object({
              id: z.string().optional(),
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
              id: z.string().optional(),
              url: z.string().url("Invalid image URL"),
              alt: z.string().optional(),
            }),
          )
          .max(8, "Maximum 8 images per section")
          .optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, buttons, images, ...updateData } = input;

      // Verify user owns the section's landing page
      const section = await ctx.db.section.findUnique({
        where: { id },
        include: { landingPage: true },
      });

      if (!section || section.landingPage.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Section not found",
        });
      }

      // Delete existing buttons and images, then recreate
      // (Simpler than updating individual items)
      if (buttons !== undefined) {
        await ctx.db.button.deleteMany({
          where: { sectionId: id },
        });
      }

      if (images !== undefined) {
        await ctx.db.image.deleteMany({
          where: { sectionId: id },
        });
      }

      return ctx.db.section.update({
        where: { id },
        data: {
          ...updateData,
          buttons: buttons
            ? {
                create: buttons.map(({ id: _, ...button }) => button),
              }
            : undefined,
          images: images
            ? {
                create: images.map(({ id: _, ...image }) => image),
              }
            : undefined,
        },
        include: {
          buttons: true,
          images: true,
        },
      });
    }),

  // Delete section
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Verify user owns the section's landing page
      const section = await ctx.db.section.findUnique({
        where: { id: input.id },
        include: { landingPage: true },
      });

      if (!section || section.landingPage.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Section not found",
        });
      }

      return ctx.db.section.delete({
        where: { id: input.id },
      });
    }),

  // Move section up
  moveUp: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const section = await ctx.db.section.findUnique({
        where: { id: input.id },
        include: { landingPage: true },
      });

      if (!section || section.landingPage.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Section not found",
        });
      }

      if (section.order === 0) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "Section is already at the top",
        });
      }

      // Find the section above
      const sectionAbove = await ctx.db.section.findFirst({
        where: {
          landingPageId: section.landingPageId,
          order: section.order - 1,
        },
      });

      if (!sectionAbove) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No section found above",
        });
      }

      // Swap orders
      await ctx.db.$transaction([
        ctx.db.section.update({
          where: { id: section.id },
          data: { order: sectionAbove.order },
        }),
        ctx.db.section.update({
          where: { id: sectionAbove.id },
          data: { order: section.order },
        }),
      ]);

      return { success: true };
    }),

  // Move section down
  moveDown: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const section = await ctx.db.section.findUnique({
        where: { id: input.id },
        include: { landingPage: true },
      });

      if (!section || section.landingPage.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Section not found",
        });
      }

      // Find the section below
      const sectionBelow = await ctx.db.section.findFirst({
        where: {
          landingPageId: section.landingPageId,
          order: section.order + 1,
        },
      });

      if (!sectionBelow) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "Section is already at the bottom",
        });
      }

      // Swap orders
      await ctx.db.$transaction([
        ctx.db.section.update({
          where: { id: section.id },
          data: { order: sectionBelow.order },
        }),
        ctx.db.section.update({
          where: { id: sectionBelow.id },
          data: { order: section.order },
        }),
      ]);

      return { success: true };
    }),
});
