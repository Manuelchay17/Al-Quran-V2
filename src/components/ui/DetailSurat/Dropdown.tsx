import React from "react";
import { FiChevronDown } from "react-icons/fi";

const Dropdown = ({ label }: { label: string | React.ReactNode }) => {
  return (
    <div className="relative">
      <button
        onClick={() => {}}
        className="w-full flex justify-between items-center px-4 py-1 rounded-lg bg-black text-gray-200 border border-white/25 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
      >
        <span className="text-center">{label}</span>
        <FiChevronDown className="text-gray-400" />
      </button>
    </div>
  );
};

export default Dropdown;
