import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col h-screen text-center gap-6 max-w-5xl mx-auto my-12">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Invoices</h1>
        <p>
          <Button variant="ghost" className="inline-flex gap-2" asChild>
            <Link href="/invoices/new">
              <CirclePlus className="h-4 w-4" /> Create Invoice
            </Link>
          </Button>
        </p>
      </div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left w-[100px] p-4">Date</TableHead>
            <TableHead className="text-left p-4">Customer</TableHead>
            <TableHead className="text-left p-4">Email</TableHead>
            <TableHead className="text-center p-4">Status</TableHead>
            <TableHead className="text-right p-4">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-left font-medium p-4">
              <span className="font-semibold">10/10/2024</span>
            </TableCell>
            <TableCell className="text-left p-4">
              <span className="font-semibold">John Doe</span>
            </TableCell>
            <TableCell className="text-left p-4">
              <span>johndoe@example.com</span>
            </TableCell>
            <TableCell className="text-center p-4">
              <Badge className="rounded-full">Open </Badge>
            </TableCell>
            <TableCell className="text-right p-4">
              <span>$250.00</span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </main>
  );
}
