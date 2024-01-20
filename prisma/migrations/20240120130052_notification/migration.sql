-- CreateTable
CREATE TABLE "Notification" (
    "idNotif" SERIAL NOT NULL,
    "NomNotification" TEXT NOT NULL,
    "DateEnvoi" TIMESTAMP(3) NOT NULL,
    "Type" TEXT NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("idNotif")
);
