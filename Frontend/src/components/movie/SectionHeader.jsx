import { Flame } from "lucide-react";

export default function SectionHeader({ title }) {
  return (
    <div className="px-2 mb-4">
      <div className="flex items-center gap-2 bg-linear-to-b from-[#1c1c1c] to-[#111] rounded-md px-4 py-3 border border-gray-800 shadow">
        <Flame className="text-yellow-400" size={22} />
        <h2 className="text-white text-lg md:text-xl font-semibold tracking-wide">
          {title}
        </h2>
      </div>
    </div>
  );
}
