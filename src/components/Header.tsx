"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Header() {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <header className="border-b bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-lg font-bold text-gray-900 sm:text-xl">
            ContentPageMaker
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              {session.user?.image && (
                <img
                  src={session.user.image}
                  alt={session.user.name ?? "User"}
                  className="h-8 w-8 rounded-full"
                />
              )}
              <span className="text-sm text-gray-700">
                {session.user?.name ?? session.user?.email}
              </span>
            </div>
            <Button
              onClick={() => signOut({ callbackUrl: "/auth/signin" })}
              variant="outline"
              size="sm"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
