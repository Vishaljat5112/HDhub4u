import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navItem =
  "px-3 py-1 rounded-md transition duration-200 hover:bg-[#2a2a2a] hover:text-white";


  return (
    <>
      {/* MAIN NAVBAR */}
      <div className="w-full bg-[#111] text-white border-b border-gray-800">
        <div className="max-w-350 mx-auto flex items-center justify-between px-4 py-3">

          {/* LEFT: Hamburger + 4K Button */}
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-white"
              onClick={() => setOpen(true)}
            >
              <Menu size={26} />
            </button>

            <div className="bg-yellow-500 text-black px-2 py-2 font-bold hover:scale-110 transition duration-100 rounded-md shadow">
              🎬 4KHDHub
            </div>
          </div>

          {/* CENTER MENU (Desktop) */}
          <div className="hidden md:flex gap-6 text-sm font-medium">
            <a href="#" className={`${navItem}`}>HDHub4u Home 🏠</a>
            <a href="#" className={`${navItem}`}>Bollywood</a>
            <a href="#" className={`${navItem}`}>Hollywood</a>
            <a href="#" className={`${navItem}`}>Hindi Dubbed</a>
            <a href="#" className={`${navItem}`}>South Hindi</a>
            <a href="#" className={`${navItem}`}>Web Series</a>
            <a href="#" className={`${navItem}`}>18+</a>
            <a href="#" className={`${navItem} flex items-center gap-1`}>
              GENRES <ChevronDown size={16} />
            </a>
            <a href="#" className={`${navItem} flex items-center gap-1`}>
              More <ChevronDown size={16} />
            </a>
          </div>

          {/* RIGHT SEARCH */}
          <div className="hidden md:block">
            <input
              type="text"
              placeholder="Search here..."
              className="bg-white text-black px-4 py-2 rounded-md w-64"
            />
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER */}
<div
  className={`fixed top-0 left-0 h-full w-80 bg-[#2b2b2b] text-white z-50 transform ${
    open ? "translate-x-0" : "-translate-x-full"
  } transition-transform duration-300 ease-in-out`}
>
  {/* Top Close Area */}
  <div className="p-4 border-b border-gray-700 flex justify-between items-center">
    <button onClick={() => setOpen(false)}>
      <X size={26} />
    </button>
  </div>

  {/* Search Box */}
  <div className="p-4">
    <input
      type="text"
      placeholder="Search here..."
      className="w-full px-4 py-2 rounded bg-white text-black"
    />
  </div>

  {/* Menu Links */}
  <div className="flex flex-col text-base">
    {[
      "HDHub4u Home 🏠",
      "Bollywood",
      "Hollywood",
      "Hindi Dubbed",
      "South Hindi",
      "Web Series",
      "18+",
      "GENRES ▾",
      "More ▾",
    ].map((item, index) => (
      <a
        key={index}
        href="#"
        className="px-5 py-4 border-b border-gray-700 hover:bg-gray-700 transition"
      >
        {item}
      </a>
    ))}
  </div>
</div>

{/* DARK OVERLAY */}
{open && (
  <div
    className="fixed inset-0 bg-black/60 z-40"
    onClick={() => setOpen(false)}
  ></div>
)}
    </>
  );
}
