import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "./ui/badge";
import { ChevronsUpDown } from "lucide-react";
import { Order } from "@/lib/types";

interface IOrdersProps {
  orders: Order[];
}

export default function OrdersTable(props: IOrdersProps) {
  const { orders = [] } = props;

  const statusEnum = {
    pending: "Pedente",
    completed: "Completo",
  };

  const formatAmount = new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <Table>
      <TableHeader>
        <TableRow className="w-full">
          <TableHead className="table-cell">Cliente</TableHead>
          <TableHead className="table-cell">Status</TableHead>
          <TableHead className="table-cell cursor-pointer justify-end items-center gap-1">
            <div className="flex items-center gap-1">
              Data
              <ChevronsUpDown className="w-4" />
            </div>
          </TableHead>
          <TableHead className="text-right cursor-pointer flex justify-end items-center gap-1">
            Valor
            <ChevronsUpDown className="w-4" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map(
          ({
            id,
            customer_name,
            customer_email,
            status,
            order_date,
            amount_in_cents,
          }) => (
            <TableRow key={id}>
              <TableCell>
                <div className="font-medium">{customer_name}</div>
                <div className="hidden md:inline text-sm text-muted-foreground">
                  {customer_email}
                </div>
              </TableCell>
              <TableCell>
                <Badge className={`text-xs`} variant="outline">
                  {statusEnum[status]}
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {order_date.toString()}
              </TableCell>
              <TableCell className="text-right">
                {formatAmount.format(amount_in_cents / 100)}
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
}
