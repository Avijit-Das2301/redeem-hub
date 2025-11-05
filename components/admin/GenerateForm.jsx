"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Skeleton from "@/components/ui/Skeleton";
import { toast } from "react-toastify";

export default function GenerateForm() {
  const [form, setForm] = useState({
    code: "",
    type: "common",
    limit: 50,
    expiry: "",
  });
  const [loading, setLoading] = useState(false);

  async function handleCreate(e) {
    e.preventDefault();

    if (!form.code || !form.expiry) {
      toast.error("Please fill in all required fields (Code & Expiry).");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/codes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(`Code "${form.code}" created successfully!`);
        setForm({
          code: "",
          type: "common",
          limit: 50,
          expiry: "",
        });
      } else {
        toast.error(data.error || "Failed to create code");
      }
    } catch (err) {
      toast.error("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card"
    >
      {loading ? (
        <Skeleton rows={3} />
      ) : (
        <>
          {/* Form Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Code Input */}
            <input
              placeholder="Code value"
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value })}
              className="p-3 border rounded-md col-span-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Type Select */}
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="common">Common</option>
              <option value="unique">Unique</option>
            </select>

            {/* Limit Input — visible only for Common type */}
            {form.type === "common" && (
              <input
                type="number"
                placeholder="Limit"
                value={form.limit}
                onChange={(e) => setForm({ ...form, limit: e.target.value })}
                className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>

          {/* Expiry & Submit */}
          <div className="mt-4 flex items-center gap-3">
            <input
              type="date"
              value={form.expiry}
              onChange={(e) => setForm({ ...form, expiry: e.target.value })}
              className="p-3 border rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleCreate}
              className="px-5 py-2 rounded-md bg-slate-900 text-white hover:bg-slate-700 cursor-pointer transition-all"
            >
              Create Code
            </button>
          </div>
        </>
      )}
    </motion.form>
  );
}
