"use client";
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
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface IOrdersProps {
  orders: Order[];
}

export default function OrdersTable(props: IOrdersProps) {
  const { orders = [] } = props;

  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const statusEnum = {
    pending: "Pedente",
    completed: "Completo",
  };

  const formatAmount = new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  const params = new URLSearchParams(searchParams);

  function handleSetOrdering(order: "" | "order_date" | "amount_in_cents") {
    if (params.get("sort") === order) {
      params.set("sort", `-${order}`);
    } else if (params.get("sort") === `-${order}`) {
      params.delete("sort");
    } else if (order) {
      params.set("sort", order);
    }

    replace(`${pathName}?${params.toString()}`, { scroll: false });
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="w-full">
          <TableHead className="table-cell">Cliente</TableHead>
          <TableHead className="table-cell">Status</TableHead>
          <TableHead
            className="table-cell cursor-pointer justify-end items-center gap-1"
            onClick={() => handleSetOrdering("order_date")}
          >
            <div className="flex items-center gap-1">
              Data
              <ChevronsUpDown className="w-4" />
            </div>
          </TableHead>
          <TableHead
            onClick={() => handleSetOrdering("amount_in_cents")}
            className="text-right cursor-pointer flex justify-end items-center gap-1"
          >
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
