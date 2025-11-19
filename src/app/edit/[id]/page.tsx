"use client";

import { useState, use } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { SectionCard } from "@/components/SectionCard";
import { SectionEditor } from "@/components/SectionEditor";
import { ExportButton } from "@/components/ExportButton";
import { ConfirmModal } from "@/components/ConfirmModal";
import { api } from "@/trpc/react";
import { landingPageSchema, MAX_SECTIONS_PER_PAGE } from "@/lib/validations";
import type { LandingPage, Section } from "@/lib/validations";

interface EditLandingPageProps {
  params: Promise<{ id: string }>;
}

export default function EditLandingPage({ params }: EditLandingPageProps) {
  const { id } = use(params);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [sectionToDelete, setSectionToDelete] = useState<string | null>(null);

  const { data: landingPage, refetch } = api.landingPage.getById.useQuery({
    id,
  });

  const updateLandingPage = api.landingPage.update.useMutation({
    onSuccess: () => {
      toast.success("Landing page updated successfully!");
      void refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const createSection = api.section.create.useMutation({
    onSuccess: () => {
      toast.success("Section added successfully!");
      void refetch();
      setIsEditorOpen(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const updateSection = api.section.update.useMutation({
    onSuccess: () => {
      toast.success("Section updated successfully!");
      void refetch();
      setIsEditorOpen(false);
      setEditingSection(null);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deleteSection = api.section.delete.useMutation({
    onSuccess: () => {
      toast.success("Section deleted successfully!");
      void refetch();
      setDeleteModalOpen(false);
      setSectionToDelete(null);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const moveSectionUp = api.section.moveUp.useMutation({
    onSuccess: () => {
      void refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const moveSectionDown = api.section.moveDown.useMutation({
    onSuccess: () => {
      void refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LandingPage>({
    resolver: zodResolver(
      landingPageSchema.pick({ url: true, description: true }),
    ),
    values: {
      url: landingPage?.url ?? "",
      description: landingPage?.description ?? "",
    },
  });

  const onSubmit = (data: Pick<LandingPage, "url" | "description">) => {
    updateLandingPage.mutate({
      id,
      ...data,
    });
  };

  const handleAddSection = (section: Section) => {
    createSection.mutate({
      landingPageId: id,
      name: section.name,
      intro: section.intro,
      title: section.title,
      subtitle: section.subtitle,
      description: section.description,
      buttons: section.buttons,
      images: section.images,
    });
  };

  const handleEditSection = (section: unknown) => {
    if (!section || typeof section !== "object") return;
    const s = section as Partial<Section>;
    setEditingSection({
      id: s.id ?? "",
      name: s.name ?? "",
      intro: s.intro ?? "",
      title: s.title ?? "",
      subtitle: s.subtitle ?? "",
      description: s.description ?? "",
      buttons: s.buttons ?? [],
      images: s.images ?? [],
    });
    setIsEditorOpen(true);
  };

  const handleUpdateSection = (section: Section) => {
    if (!section.id) return;
    updateSection.mutate({
      id: section.id,
      name: section.name,
      intro: section.intro,
      title: section.title,
      subtitle: section.subtitle,
      description: section.description,
      buttons: section.buttons,
      images: section.images,
    });
  };

  const handleDeleteSection = (sectionId: string) => {
    setSectionToDelete(sectionId);
    setDeleteModalOpen(true);
  };

  const confirmDeleteSection = () => {
    if (sectionToDelete) {
      deleteSection.mutate({ id: sectionToDelete });
    }
  };

  const handleMoveUp = (sectionId: string) => {
    moveSectionUp.mutate({ id: sectionId });
  };

  const handleMoveDown = (sectionId: string) => {
    moveSectionDown.mutate({ id: sectionId });
  };

  if (!landingPage) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Loading landing page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-6">
          <Link href="/edit" className="text-blue-600 hover:text-blue-700">
            ← Back to Landing Pages
          </Link>
        </div>

        <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Edit Landing Page
            </h1>
            <ExportButton landingPageId={id} />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Landing Page URL"
              type="url"
              placeholder="https://example.com"
              error={errors.url?.message}
              {...register("url")}
            />

            <Textarea
              label="Landing Page Description"
              placeholder="Describe your landing page..."
              rows={3}
              error={errors.description?.message}
              {...register("description")}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={updateLandingPage.isPending}>
                {updateLandingPage.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>

        {/* Sections */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Sections ({landingPage.sections.length}/{MAX_SECTIONS_PER_PAGE})
            </h2>
            <Button
              onClick={() => setIsEditorOpen(true)}
              disabled={landingPage.sections.length >= MAX_SECTIONS_PER_PAGE}
            >
              + Add Section
            </Button>
          </div>

          {landingPage.sections.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              No sections added yet. Click &quot;Add Section&quot; to get
              started.
            </div>
          ) : (
            <div className="space-y-4">
              {landingPage.sections.map((section, index) => (
                <SectionCard
                  key={section.id}
                  section={{
                    id: section.id,
                    name: section.name,
                    intro: section.intro ?? undefined,
                    title: section.title ?? undefined,
                    subtitle: section.subtitle ?? undefined,
                    description: section.description ?? undefined,
                    buttons: (Array.isArray(section.buttons)
                      ? section.buttons
                      : []
                    ).map((btn) => ({
                      ...btn,
                      linkType: (btn as { linkType?: string }).linkType as
                        | "url"
                        | "scroll",
                    })),
                    images: (Array.isArray(section.images)
                      ? section.images
                      : []
                    ).map((img) => ({
                      ...img,
                      alt: (img as { alt?: string }).alt ?? undefined,
                    })),
                  }}
                  onEdit={() => handleEditSection(section)}
                  onDelete={() => handleDeleteSection(section.id)}
                  onMoveUp={() => handleMoveUp(section.id)}
                  onMoveDown={() => handleMoveDown(section.id)}
                  canMoveUp={index > 0}
                  canMoveDown={index < landingPage.sections.length - 1}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <SectionEditor
        isOpen={isEditorOpen}
        onClose={() => {
          setIsEditorOpen(false);
          setEditingSection(null);
        }}
        onSave={editingSection ? handleUpdateSection : handleAddSection}
        section={editingSection}
      />

      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSectionToDelete(null);
        }}
        onConfirm={confirmDeleteSection}
        title="Delete Section"
        message="Are you sure you want to delete this section? This action cannot be undone."
        isLoading={deleteSection.isPending}
      />
    </div>
  );
}
