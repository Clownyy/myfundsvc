-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('INCOME', 'EXPENSE', 'SAVING');

-- CreateEnum
CREATE TYPE "BillType" AS ENUM ('ONCE', 'WEEKLY', 'MONTHLY');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "login" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "activated" BOOLEAN NOT NULL,
    "role_user" TEXT,
    "reset_key" TEXT,
    "reset_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sys-menu" (
    "menuCode" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL,

    CONSTRAINT "sys-menu_pkey" PRIMARY KEY ("menuCode")
);

-- CreateTable
CREATE TABLE "bill_template" (
    "id" SERIAL NOT NULL,
    "bill_name" TEXT NOT NULL,
    "bill_amount" DECIMAL(65,30) NOT NULL,
    "type" "BillType" NOT NULL DEFAULT 'MONTHLY',
    "curr_freq" INTEGER,
    "frequency" INTEGER,
    "active" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "bill_template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bill" (
    "id" SERIAL NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "notes" TEXT NOT NULL,
    "paid" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "template_id" INTEGER NOT NULL,

    CONSTRAINT "bill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction" (
    "id" SERIAL NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "type" "TransactionType" NOT NULL DEFAULT 'EXPENSE',
    "price" DECIMAL(65,30) NOT NULL,
    "category" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "notes" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saving" (
    "id" SERIAL NOT NULL,
    "saving_name" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "date" DATE NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "instrument_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "saving_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "instrument" (
    "id" SERIAL NOT NULL,
    "instrument_code" TEXT NOT NULL,
    "instrument_name" TEXT NOT NULL,
    "buy_price" DECIMAL(65,30) NOT NULL,
    "sell_price" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "instrument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cash_pos" (
    "id" SERIAL NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "cash_pos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_login_key" ON "user"("login");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "sys-menu_menuCode_key" ON "sys-menu"("menuCode");

-- CreateIndex
CREATE UNIQUE INDEX "bill_template_id_key" ON "bill_template"("id");

-- CreateIndex
CREATE UNIQUE INDEX "bill_id_key" ON "bill"("id");

-- CreateIndex
CREATE UNIQUE INDEX "transaction_id_key" ON "transaction"("id");

-- CreateIndex
CREATE UNIQUE INDEX "saving_id_key" ON "saving"("id");

-- CreateIndex
CREATE UNIQUE INDEX "instrument_id_key" ON "instrument"("id");

-- CreateIndex
CREATE UNIQUE INDEX "instrument_instrument_code_key" ON "instrument"("instrument_code");

-- CreateIndex
CREATE UNIQUE INDEX "cash_pos_id_key" ON "cash_pos"("id");

-- CreateIndex
CREATE UNIQUE INDEX "cash_pos_user_id_key" ON "cash_pos"("user_id");

-- AddForeignKey
ALTER TABLE "bill_template" ADD CONSTRAINT "bill_template_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bill" ADD CONSTRAINT "bill_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "bill_template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saving" ADD CONSTRAINT "saving_instrument_id_fkey" FOREIGN KEY ("instrument_id") REFERENCES "instrument"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saving" ADD CONSTRAINT "saving_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cash_pos" ADD CONSTRAINT "cash_pos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
