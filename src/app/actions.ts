"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

import { Invoices, Status } from "@/db/schema";
import { db } from "@/db";
import { and, eq } from "drizzle-orm";

export async function createAction(formData: FormData) {
  const { userId } = auth();
  const value = Math.floor(parseFloat(String(formData.get("value"))) * 100);
  const description = formData.get("description") as string;

  if (!userId) {
    return;
  }

  const results = await db
    .insert(Invoices)
    .values({
      value,
      description,
      userId,
      status: "open",
    })
    .returning({
      id: Invoices.id,
    });

  redirect(`/invoices/${results[0].id}`);
}

export async function updateStatusAction(formData: FormData) {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  const invoiceId = formData.get("id") as string;
  const status = formData.get("status") as Status;

  const results = await db
    .update(Invoices)
    .set({ status })
    .where(
      and(eq(Invoices.id, parseInt(invoiceId)), eq(Invoices.userId, userId))
    );

  revalidatePath(`/invoices/${invoiceId}`, "page");
}

export async function deleteInvoiceAction(formData: FormData) {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  const invoiceId = formData.get("id") as string;

  const results = await db
    .delete(Invoices)
    .where(
      and(eq(Invoices.id, parseInt(invoiceId)), eq(Invoices.userId, userId))
    );

  redirect("/dashboard");
}
