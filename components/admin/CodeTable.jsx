"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import Skeleton from "@/components/ui/Skeleton";

export default function CodeTable({ initialCodes = [] }) {
  const [items, setItems] = useState(initialCodes);

  useEffect(() => {
    if (items.length === 0) {
      fetch("/api/codes/get")
        .then((res) => res.json())
        .then(setItems)
        .catch(() => setItems([]));
    }
  }, []);

  if (!items || items.length === 0) return <Skeleton rows={4} />;

  return (
    <Card className="p-4 w-full overflow-x-auto shadow-sm">
      <Table>
        <TableCaption>All generated redeem codes.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Limit</TableHead>
            <TableHead>Redeemed</TableHead>
            <TableHead>Expiry</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {items.map((it) => (
            <TableRow
              key={it._id}
              className="hover:bg-gray-50 transition-colors"
            >
              <TableCell className="font-medium">{it.code}</TableCell>
              <TableCell className="capitalize">{it.type}</TableCell>
              <TableCell>{it.limit}</TableCell>
              <TableCell>{it.redeemed}</TableCell>
              <TableCell>
                {new Date(it.expiry).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell
                className={`font-medium ${
                  it.status === "active" ? "text-green-600" : "text-red-600"
                }`}
              >
                {it.status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
