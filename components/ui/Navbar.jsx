"use client";

import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { toast } from "react-toastify";

export default function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await signOut({ redirect: false });
    toast.info("Logged out successfully!");
    router.push("/");
  };

  const handleSignIn = (role) => {
    router.push(`/auth/login?role=${role}`);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#0f172a] text-white flex justify-between items-center px-10 py-4 shadow-lg z-50">
      {/* Left section - Logo */}
      <h1
        onClick={() => router.push("/")}
        className="text-lg font-bold cursor-pointer hover:text-yellow-400 transition"
      >
        🔒 UNLOCK REWARDS
      </h1>

      {/* Middle section - Links */}
      <div className="flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
        <button
          onClick={() => router.push("/")}
          className="hover:text-yellow-400 transition"
        >
          Home
        </button>
        <button
          onClick={() => router.push("/redeem")}
          className="hover:text-yellow-400 transition"
        >
          Redeem
        </button>

        {user?.role === "admin" && (
          <button
            onClick={() => router.push("/admin")}
            className="hover:text-yellow-400 transition"
          >
            Admin
          </button>
        )}
      </div>

      {/* Right section - Auth Controls */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm text-gray-300">
              {user.name} ({user.role})
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => handleSignIn("user")}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-1 rounded-md font-medium transition"
            >
              User Sign In
            </button>
            <button
              onClick={() => handleSignIn("admin")}
              className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-1 rounded-md font-medium transition"
            >
              Admin Sign In
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
