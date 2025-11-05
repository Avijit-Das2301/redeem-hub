"use client";

import { useState, useEffect } from "react";
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

export default function RedemptionTable({ initialRedemptions = [] }) {
  const [rows, setRows] = useState(initialRedemptions);

  useEffect(() => {
    if (rows.length === 0) {
      fetch("/api/redemptions")
        .then((res) => res.json())
        .then(setRows)
        .catch(() => setRows([]));
    }
  }, []);

  if (!rows || rows.length === 0) return <Skeleton rows={3} />;

  return (
    <Card className="p-4 w-full overflow-x-auto shadow-sm">
      <Table>
        <TableCaption>Recent redemption history.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500 p-4">
                No redemption records found
              </TableCell>
            </TableRow>
          ) : (
            rows.map((r) => (
              <TableRow
                key={r._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell className="font-medium">{r.user}</TableCell>
                <TableCell>{r.code}</TableCell>
                <TableCell>
                  {r.date
                    ? new Date(r.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "—"}
                </TableCell>
                <TableCell
                  className={`font-medium ${
                    r.status === "Success" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {r.status}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
