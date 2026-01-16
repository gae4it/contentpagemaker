"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";

interface LandingPageCardProps {
  landingPage: {
    id: string;
    url: string;
    description: string;
    updatedAt: Date;
    sections: unknown[];
  };
  onDelete: () => void;
  onArchive: () => void;
  onDuplicate: () => void;
}

export function LandingPageCard({
  landingPage,
  onDelete,
  onArchive,
  onDuplicate,
}: LandingPageCardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md">
      <div className="space-y-3">
        <div>
          <span className="text-xs font-medium tracking-wide text-gray-500 uppercase">
            Landing Page
          </span>
        </div>

        <div>
          <a
            href={landingPage.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium break-all text-blue-600 hover:text-blue-800"
          >
            {landingPage.url}
          </a>
        </div>

        <p className="line-clamp-2 text-sm text-gray-600">
          {landingPage.description.length > 120
            ? `${landingPage.description.substring(0, 120)}...`
            : landingPage.description}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>
            {mounted
              ? `Updated ${formatDate(landingPage.updatedAt)}`
              : "Updated recently"}
          </span>
          <span>{landingPage.sections.length}/25 sections</span>
        </div>

        <div className="grid grid-cols-2 gap-2 border-t border-gray-100 pt-2">
          <Link href={`/edit/${landingPage.id}`} className="w-full">
            <Button variant="success" size="sm" className="w-full">
              Edit
            </Button>
          </Link>
          <Button
            variant="gray"
            size="sm"
            onClick={onArchive}
            className="w-full"
          >
            Archive
          </Button>
          <Button
            variant="warning"
            size="sm"
            onClick={onDuplicate}
            className="w-full"
          >
            Duplicate
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={onDelete}
            className="w-full"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
