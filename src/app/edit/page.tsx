"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { LandingPageCard } from "@/components/LandingPageCard";
import { ConfirmModal } from "@/components/ConfirmModal";
import { api } from "@/trpc/react";

export default function EditLandingPages() {
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: activeLandingPages = [], refetch: refetchActive } =
    api.landingPage.getAll.useQuery({ archived: false });

  const { data: archivedLandingPages = [], refetch: refetchArchived } =
    api.landingPage.getAll.useQuery({ archived: true });

  const deleteLandingPage = api.landingPage.delete.useMutation({
    onSuccess: () => {
      toast.success("Landing page deleted successfully!");
      void refetchActive();
      void refetchArchived();
      setDeleteId(null);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const archiveLandingPage = api.landingPage.archive.useMutation({
    onSuccess: () => {
      toast.success("Landing page archived!");
      void refetchActive();
      void refetchArchived();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const unarchiveLandingPage = api.landingPage.unarchive.useMutation({
    onSuccess: () => {
      toast.success("Landing page unarchived!");
      void refetchActive();
      void refetchArchived();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const duplicateLandingPage = api.landingPage.duplicate.useMutation({
    onSuccess: () => {
      toast.success("Landing page duplicated!");
      void refetchActive();
      void refetchArchived();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const filteredActivePages = activeLandingPages.filter(
    (page) =>
      page.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredArchivedPages = archivedLandingPages.filter(
    (page) =>
      page.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleDelete = (id: string) => {
    deleteLandingPage.mutate({ id });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-6">
          <Link href="/" className="text-blue-600 hover:text-blue-700">
            ← Back to Home
          </Link>
        </div>

        <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Edit Landing Pages ({activeLandingPages.length})
            </h1>
            <Link href="/add">
              <Button>+ Add New</Button>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <Input
              placeholder="Search by URL or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
          </div>

          {/* Active Landing Pages Grid */}
          {filteredActivePages.length === 0 ? (
            <div className="py-12 text-center">
              {searchQuery ? (
                <div>
                  <p className="mb-2 text-gray-500">
                    No landing pages found matching your search.
                  </p>
                  <Button variant="ghost" onClick={() => setSearchQuery("")}>
                    Clear search
                  </Button>
                </div>
              ) : (
                <div>
                  <p className="mb-4 text-gray-500">
                    No landing pages created yet.
                  </p>
                  <Link href="/add">
                    <Button>Create your first landing page</Button>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredActivePages.map((page) => (
                <LandingPageCard
                  key={page.id}
                  landingPage={page}
                  onDelete={() => setDeleteId(page.id)}
                  onArchive={() => archiveLandingPage.mutate({ id: page.id })}
                  onDuplicate={() =>
                    duplicateLandingPage.mutate({ id: page.id })
                  }
                />
              ))}
            </div>
          )}
        </div>

        {/* Archived Landing Pages Section */}
        {archivedLandingPages.length > 0 && (
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Archived Landing Pages ({archivedLandingPages.length})
              </h2>
            </div>

            {filteredArchivedPages.length === 0 ? (
              <div className="py-12 text-center">
                <p className="mb-2 text-gray-500">
                  No archived landing pages found matching your search.
                </p>
                <Button variant="ghost" onClick={() => setSearchQuery("")}>
                  Clear search
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredArchivedPages.map((page) => (
                  <LandingPageCard
                    key={page.id}
                    landingPage={page}
                    onDelete={() => setDeleteId(page.id)}
                    onArchive={() =>
                      unarchiveLandingPage.mutate({ id: page.id })
                    }
                    onDuplicate={() =>
                      duplicateLandingPage.mutate({ id: page.id })
                    }
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && handleDelete(deleteId)}
        title="Delete Landing Page"
        message="Are you sure you want to delete this landing page? This action cannot be undone and will also delete all associated sections."
        isLoading={deleteLandingPage.isPending}
      />
    </div>
  );
}
