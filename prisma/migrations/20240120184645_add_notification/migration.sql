/*
  Warnings:

  - The primary key for the `Notification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `NomNotification` on the `Notification` table. All the data in the column will be lost.
  - Added the required column `TexteNotification` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idFestival` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_pkey",
DROP COLUMN "NomNotification",
ADD COLUMN     "TexteNotification" TEXT NOT NULL,
ADD COLUMN     "idFestival" INTEGER NOT NULL,
ADD CONSTRAINT "Notification_pkey" PRIMARY KEY ("idFestival", "idNotif");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_idFestival_fkey" FOREIGN KEY ("idFestival") REFERENCES "Festival"("idFestival") ON DELETE RESTRICT ON UPDATE CASCADE;
