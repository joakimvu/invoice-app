"use client";

import { useOptimistic } from "react";
import Container from "@/components/Container";
import { Badge } from "@/components/ui/badge";
import { Invoices } from "@/db/schema";
import { cn } from "@/lib/utils";
import { ChevronDown, Ellipsis, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-meny";

import { AVAILABLE_STATUSES } from "@/data/invoices";
import { updateStatusAction, deleteInvoiceAction } from "@/app/actions";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface InvoiceProps {
  invoice: typeof Invoices.$inferSelect;
}

export default function Invoice({ invoice }: InvoiceProps) {
  const [currentStatus, setCurrentStatus] = useOptimistic(
    invoice.status,
    (state, newStatus) => {
      return String(newStatus);
    }
  );

  const handleOnUpdateStatus = async (formData: FormData) => {
    const originalStatus = currentStatus;
    setCurrentStatus(formData.get("status"));
    try {
      await updateStatusAction(formData);
    } catch (e) {
      setCurrentStatus(originalStatus);
    }
  };

  return (
    <main className="wg-full h-full">
      <Container>
        <div className="flex justify-between mb-8">
          <h1 className="flex items-center gap-4 text-3xl font-semibold">
            Invoices {invoice.id}
            <Badge
              className={cn(
                "rounded-full",
                "capitalize",
                invoice.status === "open" && "bg-blue-500",
                invoice.status === "paid" && "bg-green-500",
                invoice.status === "void" && "bg-zinc-700",
                invoice.status === "uncollectible" && "bg-red-500"
              )}
            >
              {invoice.status}
            </Badge>
          </h1>

          <div className="flex gap-4">
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
                      <form action={handleOnUpdateStatus}>
                        <input type="hidden" name="id" value={invoice.id} />
                        <input type="hidden" name="status" value={status.id} />
                        <button>{status.label}</button>
                      </form>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            <Dialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="flex items-center gap-2" variant="outline">
                    <span className="sr-only">More Options</span>
                    <Ellipsis className="w-4 h-auto" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <DialogTrigger asChild>
                      <button className="flex items-center gap-2">
                        <Trash2 className="w-4 h-auto" />
                        Delete Invoice
                      </button>
                    </DialogTrigger>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DialogContent>
                <DialogHeader className="gap-2">
                  <DialogTitle className="text-2xl">
                    Delete Invoice?
                  </DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your invoice and remove your data from our servers.
                  </DialogDescription>
                  <DialogFooter>
                    <form action={deleteInvoiceAction} className="flex">
                      <input type="hidden" name="id" value={invoice.id} />
                      <Button
                        variant="destructive"
                        className="flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-auto" />
                        Delete Invoice
                      </Button>
                    </form>
                  </DialogFooter>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <p className="flex text-3xl mb-3">
          ${(invoice.value / 100).toFixed(2)}
        </p>

        <p className="flex text-lg mb-8">{invoice.description}</p>

        <h2 className="flex font-bold text-lg mb-4">Billing Details</h2>

        <ul className="grid gap-2">
          <li className="flex gap-4">
            <strong className="block flex-shrink-0 font-medium text-sm">
              Invoice ID
            </strong>
            <span>{invoice.id}</span>
          </li>
          <li className="flex gap-4">
            <strong className="block flex-shrink-0 font-medium text-sm">
              Invoice Date
            </strong>

            <span>
              {new Date(invoice.createTimeStamp).toLocaleDateString()}
            </span>
          </li>
          <li className="flex gap-4">
            <strong className="block flex-shrink-0 font-medium text-sm">
              Billing Name
            </strong>
            {/* <span>{invoice.customer.name}</span> */}
          </li>
          <li className="flex gap-4">
            <strong className="block flex-shrink-0 font-medium text-sm">
              Billing Email
            </strong>
            {/* <span>{invoice.customer.email}</span> */}
          </li>
        </ul>
      </Container>
    </main>
  );
}
