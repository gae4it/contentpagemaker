"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-gray-600">Loading...</div>
      </main>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
          <div className="space-y-6 text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              ContentPageMaker
            </h1>
            <p className="text-gray-600">
              Create and manage landing page content with ease
            </p>

            <div className="space-y-4">
              <Link href="/add" className="block">
                <Button className="w-full" size="lg">
                  + Add New Landing Page
                </Button>
              </Link>

              <Link href="/edit" className="block">
                <Button variant="secondary" className="w-full" size="lg">
                  ✏️ Edit Existing Landing Page
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
