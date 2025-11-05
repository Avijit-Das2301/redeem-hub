"use client";
export const dynamic = "force-dynamic";

import { useState } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

export default function RedeemPage() {
  const { data: session, status } = useSession();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRedeem = async () => {
    if (!session) return toast.error("Please sign in first!");

    setLoading(true);
    try {
      const res = await fetch("/api/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: session.user.name, code }),
      });

      const data = await res.json();
      res.ok ? toast.success(data.message) : toast.error(data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-slate-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-[90%] max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-6 text-slate-800">
          Redeem Your Code
        </h2>

        <input
          type="text"
          placeholder="Enter your code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full p-3 border rounded-md mb-4"
        />

        <button
          onClick={handleRedeem}
          disabled={loading}
          className="bg-yellow-400 px-5 py-2 rounded-md font-medium w-full"
        >
          {loading ? "Redeeming..." : "Redeem"}
        </button>

        <p className="text-gray-500 mt-3 text-sm">
          Tip: try <b>WELCOME2025</b>
        </p>
      </div>
    </main>
  );
}
