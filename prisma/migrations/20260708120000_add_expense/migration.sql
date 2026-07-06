-- CreateEnum
CREATE TYPE "ExpenseCategory" AS ENUM ('Reagents', 'Utilities', 'Salaries', 'Equipment', 'Maintenance', 'Transport', 'Other');

-- CreateTable
CREATE TABLE "expense" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "category" "ExpenseCategory" NOT NULL,
    "notes" TEXT,
    "expenseDate" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "expense_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "expense_userId_expenseDate_idx" ON "expense"("userId", "expenseDate");

-- AddForeignKey
ALTER TABLE "expense" ADD CONSTRAINT "expense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;