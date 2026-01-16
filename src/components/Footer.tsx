"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-600 sm:flex-row">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} ContentPageMaker</span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/privacy"
              className="transition-colors hover:text-gray-900"
            >
              Privacy Policy
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/terms"
              className="transition-colors hover:text-gray-900"
            >
              Terms of Service
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/legal"
              className="transition-colors hover:text-gray-900"
            >
              Legal Notice
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
