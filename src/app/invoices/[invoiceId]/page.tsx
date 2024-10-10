import { db } from "@/db";
import { Invoices } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";

import Invoice from "./invoice";

export default async function InvoicePage({
  params,
}: {
  params: { invoiceId: string };
}) {
  const { userId } = auth();
  const invoiceId = parseInt(params.invoiceId);

  if (isNaN(invoiceId)) {
    throw new Error("Invalid Invoice ID");
  }

  const [result] = await db
    .select()
    .from(Invoices)
    .where(and(eq(Invoices.id, invoiceId), eq(Invoices.userId, userId)))
    .limit(1);

  if (!result) {
    notFound();
  }

  return <Invoice invoice={result} />;
}
