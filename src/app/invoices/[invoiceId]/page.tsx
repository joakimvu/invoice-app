import { Badge } from "@/components/ui/badge";
import { db } from "@/db";
import { Invoices } from "@/db/schema";
import { cn } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export default async function InvoicePage({
  params,
}: {
  params: { invoiceId: string };
}) {
  const invoiceId = parseInt(params.invoiceId);

  if (isNaN(invoiceId)) {
    throw new Error("Invalid Invoice ID");
  }

  const [result] = await db
    .select()
    .from(Invoices)
    .where(eq(Invoices.id, invoiceId))
    .limit(1);

  if (!result) {
    notFound();
  }

  return (
    <main className="h-screen text-center max-w-5xl mx-auto my-12">
      <div className="flex justify-between mb-8">
        <h1 className="flex items-center gap-4 text-3xl font-bold">
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
    </main>
  );
}
