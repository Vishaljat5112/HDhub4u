import { useEffect } from "react";

const Modal = ({ children, onClose }) => {
  //  prevent body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center px-3 sm:px-6">

      {/* OVERLAY */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL BOX */}
      <div
        className="
          relative w-full max-w-5xl
          max-h-[90vh] overflow-y-auto
          bg-black text-white
          border border-gray-800
          rounded-2xl shadow-2xl
          p-4 sm:p-6
          animate-fadeIn
        "
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="
            absolute top-3 right-4
            text-2xl font-bold
            text-gray-400
            hover:text-yellow-500
            transition
          "
          aria-label="Close modal"
        >
          ×
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;