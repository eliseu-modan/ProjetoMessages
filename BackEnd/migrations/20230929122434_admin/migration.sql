/*
  Warnings:

  - Added the required column `admin` to the `CreateUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `createuser` ADD COLUMN `admin` BOOLEAN NOT NULL;
