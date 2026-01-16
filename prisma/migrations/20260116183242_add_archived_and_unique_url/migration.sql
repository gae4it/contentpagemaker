/*
  Warnings:

  - A unique constraint covering the columns `[userId,url]` on the table `landing_pages` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "landing_pages" ADD COLUMN     "archived" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "landing_pages_userId_url_key" ON "landing_pages"("userId", "url");
