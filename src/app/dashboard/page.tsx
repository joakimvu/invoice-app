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

export default function Home() {
  return (
    <main className="flex flex-col justify-center h-screen text-center gap-6 max-w-5xl mx-auto">
      <h1 className="text-5xl font-bold">Dashboard</h1>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left w-[100px]">Date</TableHead>
            <TableHead className="text-left">Customer</TableHead>
            <TableHead className="text-left">Email</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-left font-medium">
              <span className="font-semibold">10/10/2024</span>
            </TableCell>
            <TableCell className="text-left">
              <span className="font-semibold">John Doe</span>
            </TableCell>
            <TableCell className="text-left">
              <span>johndoe@example.com</span>
            </TableCell>
            <TableCell className="text-center">
              <Badge className="rounded-full">Open </Badge>
            </TableCell>
            <TableCell className="text-right">
              <span>$250.00</span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </main>
  );
}
