/*
  Warnings:

  - A unique constraint covering the columns `[uid]` on the table `Job` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Job_uid_key" ON "Job"("uid");
