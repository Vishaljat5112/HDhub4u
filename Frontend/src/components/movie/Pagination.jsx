import { ChevronRight } from "lucide-react";

export default function Pagination() {
  const base =
    "px-5 py-2 border border-gray-500 text-sm font-medium transition duration-200";

  return (
    <div className="flex justify-center mt-12 mb-20 bg-black">
      <div className="flex">

        {/* Active Page */}
        <button className={`${base} bg-blue-600 text-white border-blue-600`}>
          1
        </button>

        {/* Normal Pages */}
        <button className={`${base} bg-[#1b1b1b] text-white hover:bg-orange-500 hover:border-white`}>
          2
        </button>

        <button className={`${base} bg-[#1b1b1b] text-white hover:bg-orange-500 hover:border-white`}>
          3
        </button>

        {/* Dots Highlight */}
        <button className={`${base} bg-[#1b1b1b] text-white hover:bg-orange-500  hover:border-white`}>
          ...
        </button>

        <button className={`${base} bg-[#1b1b1b] text-white hover:bg-orange-500 hover:border-white`}>
          947
        </button>

        {/* Next */}
        <button className={`${base} bg-[#1b1b1b] text-white hover:bg-orange-500  hover:border-white flex items-center gap-1`}>
          Next <ChevronRight size={16} />
        </button>

      </div>
    </div>
  );
}
