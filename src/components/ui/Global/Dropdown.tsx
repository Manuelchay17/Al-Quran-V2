import React from "react";
import { FiChevronDown } from "react-icons/fi";

export const Dropdown = ({ label }: { label: string }) => {
  return (
    <div className="relative">
      <button className="w-full flex cursor-pointer justify-between items-center px-4 py-3 rounded-lg bg-black text-gray-200 border border-white/25 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all">
        <span className="text-center">{label}</span>
        <FiChevronDown className="text-gray-400" />
      </button>
    </div>
  );
};
