"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import {
  sectionSchema,
  MAX_BUTTONS_PER_SECTION,
  MAX_IMAGES_PER_SECTION,
} from "@/lib/validations";
import type { Section } from "@/lib/validations";

interface SectionEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (section: Section) => void;
  section?: Section | null;
}

export function SectionEditor({
  isOpen,
  onClose,
  onSave,
  section,
}: SectionEditorProps) {
  const [activeTab, setActiveTab] = useState<"basic" | "buttons" | "images">(
    "basic",
  );

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Section>({
    resolver: zodResolver(sectionSchema),
    defaultValues: {
      name: "",
      intro: "",
      title: "",
      subtitle: "",
      description: "",
      buttons: [],
      images: [],
    },
  });

  const {
    fields: buttonFields,
    append: appendButton,
    remove: removeButton,
  } = useFieldArray({
    control,
    name: "buttons",
  });

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control,
    name: "images",
  });

  useEffect(() => {
    if (section) {
      reset(section);
    } else {
      reset({
        name: "",
        intro: "",
        title: "",
        subtitle: "",
        description: "",
        buttons: [],
        images: [],
      });
    }
  }, [section, reset]);

  const onSubmit = (data: Section) => {
    onSave({
      ...data,
      id: section?.id ?? crypto.randomUUID(),
    });
  };

  const handleClose = () => {
    reset();
    setActiveTab("basic");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={section ? "Edit Section" : "Add New Section"}
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: "basic", label: "Basic Info" },
              {
                id: "buttons",
                label: `Buttons (${buttonFields.length}/${MAX_BUTTONS_PER_SECTION})`,
              },
              {
                id: "images",
                label: `Images (${imageFields.length}/${MAX_IMAGES_PER_SECTION})`,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() =>
                  setActiveTab(tab.id as "basic" | "buttons" | "images")
                }
                className={`border-b-2 px-1 py-2 text-sm font-medium ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Basic Info Tab */}
        {activeTab === "basic" && (
          <div className="space-y-4">
            <Input
              label="Section Name *"
              placeholder="e.g., Hero Section, Features, Contact"
              error={errors.name?.message}
              {...register("name")}
            />

            <Input
              label="Intro (max 80 chars)"
              placeholder="Short introduction..."
              error={errors.intro?.message}
              {...register("intro")}
            />

            <Input
              label="Title (max 80 chars)"
              placeholder="Section title..."
              error={errors.title?.message}
              {...register("title")}
            />

            <Input
              label="Subtitle (max 160 chars)"
              placeholder="Section subtitle..."
              error={errors.subtitle?.message}
              {...register("subtitle")}
            />

            <Textarea
              label="Description"
              placeholder="Detailed description of the section..."
              rows={4}
              error={errors.description?.message}
              {...register("description")}
            />
          </div>
        )}

        {/* Buttons Tab */}
        {activeTab === "buttons" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Buttons</h3>
              <Button
                type="button"
                onClick={() =>
                  appendButton({ label: "", linkType: "url", value: "" })
                }
                disabled={buttonFields.length >= MAX_BUTTONS_PER_SECTION}
                size="sm"
              >
                + Add Button
              </Button>
            </div>

            {buttonFields.length === 0 ? (
              <p className="py-4 text-center text-gray-500">
                No buttons added yet.
              </p>
            ) : (
              <div className="space-y-4">
                {buttonFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="space-y-3 rounded-lg border p-4"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Button {index + 1}</h4>
                      <Button
                        type="button"
                        variant="danger"
                        size="sm"
                        onClick={() => removeButton(index)}
                      >
                        Remove
                      </Button>
                    </div>

                    <Input
                      label="Label"
                      placeholder="Button text"
                      error={errors.buttons?.[index]?.label?.message}
                      {...register(`buttons.${index}.label`)}
                    />

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Link Type
                      </label>
                      <select
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        {...register(`buttons.${index}.linkType`)}
                      >
                        <option value="url">URL</option>
                        <option value="scroll">Scroll to section</option>
                      </select>
                    </div>

                    <Input
                      label="Value"
                      placeholder="URL or section ID"
                      error={errors.buttons?.[index]?.value?.message}
                      {...register(`buttons.${index}.value`)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Images Tab */}
        {activeTab === "images" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Images</h3>
              <Button
                type="button"
                onClick={() => appendImage({ url: "", alt: "" })}
                disabled={imageFields.length >= MAX_IMAGES_PER_SECTION}
                size="sm"
              >
                + Add Image
              </Button>
            </div>

            {imageFields.length === 0 ? (
              <p className="py-4 text-center text-gray-500">
                No images added yet.
              </p>
            ) : (
              <div className="space-y-4">
                {imageFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="space-y-3 rounded-lg border p-4"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Image {index + 1}</h4>
                      <Button
                        type="button"
                        variant="danger"
                        size="sm"
                        onClick={() => removeImage(index)}
                      >
                        Remove
                      </Button>
                    </div>

                    <Input
                      label="Image URL"
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      error={errors.images?.[index]?.url?.message}
                      {...register(`images.${index}.url`)}
                    />

                    <Input
                      label="Alt Text (optional)"
                      placeholder="Description of the image"
                      error={errors.images?.[index]?.alt?.message ?? undefined}
                      {...register(`images.${index}.alt`)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end space-x-4 border-t pt-4">
          <Button type="button" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit">
            {section ? "Update Section" : "Add Section"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
