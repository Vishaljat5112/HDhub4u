import { useState } from "react";
import { Menu, X } from "lucide-react";
import hdlogo from "../../assets/images/hdhub4ulogo.png";

export default function TopStrip() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full bg-black text-white border-b border-gray-800">
      <div className="max-w-350 mx-auto flex items-center justify-between px-4 py-2.5">

        {/* LEFT SIDE (Mobile Menu + Logo) */}
        <div className="flex items-center gap-3">
          {/* Hamburger for mobile */}
          <button
            className="md:hidden text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>

          {/* Logo */}
          <img
            src= {hdlogo}
            alt="HDHub4u"
            className="h-15 object-contain"
          />
        </div>

        {/* RIGHT SIDE LINKS (Desktop) */}
        <div className="hidden md:flex gap-8 text-lg font-medium">
          <a href="#" className="hover:bg-gray-800 rounded transition">
            Disclaimer
          </a>
          <a href="#" className="hover:bg-gray-800  rounded transition">
            How To Download ?
          </a>
          <a href="#" className="hover:bg-gray-800  rounded transition">
            Join Our Group !
          </a>
          <a href="#" className="hover:bg-gray-800  rounded transition">
            Movie Request Page
          </a>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {open && (
        <div className="md:hidden bg-black border-t border-gray-800 px-4 pb-4 flex flex-col gap-3 text-sm">
          <a href="#" className="hover:text-blue-400 transition">
            Disclaimer
          </a>
          <a href="#" className="hover:text-blue-400 transition">
            How To Download ?
          </a>
          <a href="#" className="hover:text-blue-400 transition">
            Join Our Group !
          </a>
          <a href="#" className="hover:text-blue-400 transition">
            Movie Request Page
          </a>
        </div>
      )}
    </div>
  );
}
