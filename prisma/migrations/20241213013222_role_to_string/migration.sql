/*
  Warnings:

  - The values [ENGINERR] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - Changed the type of `role` on the `Employee` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('INTERN', 'ENGINEER', 'ADMIN');
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "role",
ADD COLUMN     "role" TEXT NOT NULL;
