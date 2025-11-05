"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import GenerateForm from "@/components/admin/GenerateForm";
import CodeTable from "@/components/admin/CodeTable";
import RedemptionTable from "@/components/admin/RedemptionTable";

export default function AdminClient() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      router.push("/auth/login?role=admin");
      return;
    }

    if (session?.user?.role !== "admin") {
      router.push("/");
      return;
    }

    setAllowed(true);
  }, [session, status, router]);

  if (status === "loading" || !allowed) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-gray-600">
        Loading Admin Dashboard...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-6 space-y-10 overflow-y-auto">
        <section id="dashboard">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mb-8">Welcome to your admin dashboard.</p>
        </section>

        <section id="generate-code">
          <GenerateForm />
        </section>

        <section>
          <CodeTable />
        </section>

        <section id="redemption-history">
          <RedemptionTable />
        </section>
      </main>
    </div>
  );
}
