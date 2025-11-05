"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AuthPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Redirect on successful login
  useEffect(() => {
    if (status === "authenticated") {
      const role = session?.user?.role;
      if (role === "admin") router.push("/admin");
      else router.push("/redeem");
    }
  }, [status, session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (result.error) toast.error(result.error);
    else toast.success("Login successful!");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-100 via-white to-slate-200 pt-24 pb-10">
      <div className="glass p-8 w-96 text-center rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-slate-800">Sign In</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="bg-[#0f172a] text-white py-2 rounded-md hover:bg-[#1e293b] transition"
          >
            Sign In
          </button>
          <p className="mt-4 text-sm text-gray-600">
            Don’t have an account?{" "}
            <span
              onClick={() => router.push("/auth/signup")}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Create one
            </span>
          </p>
        </form>
      </div>
    </main>
  );
}
