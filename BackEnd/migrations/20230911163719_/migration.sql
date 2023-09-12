-- AlterTable
ALTER TABLE `createmessages` ADD COLUMN `userId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `CreateMessages` ADD CONSTRAINT `CreateMessages_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `CreateUser`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
