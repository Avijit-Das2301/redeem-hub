"use client";
export default function Skeleton({ rows = 4 }) {
  return (
    <div className="animate-pulse space-y-3 p-4 bg-white/60 rounded-lg">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-4 bg-gray-300 rounded w-full" />
      ))}
    </div>
  );
}
