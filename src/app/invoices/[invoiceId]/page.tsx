import Container from "@/components/Container";
import { Badge } from "@/components/ui/badge";
import { db } from "@/db";
import { Invoices } from "@/db/schema";
import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-meny";

import { AVAILABLE_STATUSES } from "@/data/invoices";
import { updateStatusAciton } from "@/app/actions";
import { Button } from "@/components/ui/button";

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

  return (
    <main className="wg-full h-full">
      <Container>
        <div className="flex justify-between mb-8">
          <h1 className="flex items-center gap-4 text-3xl font-semibold">
            Invoices {invoiceId}
            <Badge
              className={cn(
                "rounded-full",
                "capitalize",
                result.status === "open" && "bg-blue-500",
                result.status === "paid" && "bg-green-500",
                result.status === "void" && "bg-zinc-700",
                result.status === "uncollectible" && "bg-red-500"
              )}
            >
              {result.status}
            </Badge>
          </h1>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button className="flex items-center gap-2" variant="outline">
                Change Status
                <ChevronDown className="w-4 h-auto" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {AVAILABLE_STATUSES.map((status) => {
                return (
                  <DropdownMenuItem key={status.id}>
                    <form action={updateStatusAciton}>
                      <input type="hidden" name="id" value={invoiceId} />
                      <input type="hidden" name="status" value={status.id} />
                      <button>{status.label}</button>
                    </form>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <p className="flex text-3xl mb-3">${(result.value / 100).toFixed(2)}</p>

        <p className="flex text-lg mb-8">{result.description}</p>

        <h2 className="flex font-bold text-lg mb-4">Billing Details</h2>

        <ul className="grid gap-2">
          <li className="flex gap-4">
            <strong className="block flex-shrink-0 font-medium text-sm">
              Invoice ID
            </strong>
            <span>{result.id}</span>
          </li>
          <li className="flex gap-4">
            <strong className="block flex-shrink-0 font-medium text-sm">
              Invoice Date
            </strong>

            <span>{new Date(result.createTimeStamp).toLocaleDateString()}</span>
          </li>
          <li className="flex gap-4">
            <strong className="block flex-shrink-0 font-medium text-sm">
              Billing Name
            </strong>
            {/* <span>{result.customer.name}</span> */}
          </li>
          <li className="flex gap-4">
            <strong className="block flex-shrink-0 font-medium text-sm">
              Billing Email
            </strong>
            {/* <span>{result.customer.email}</span> */}
          </li>
        </ul>
      </Container>
    </main>
  );
}
