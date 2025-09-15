"use client";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

export const SearchBar = ({
  setSearchInput,
}: {
  setSearchInput: (value: string) => void;
}) => {
  return (
    <div className="relative">
      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        onChange={(e) => setSearchInput(e.target.value)}
        type="text"
        placeholder="Cari doa berdasarkan nama, isi, atau kategori..."
        className="w-full pl-12 pr-4 py-3 rounded-lg bg-black text-gray-200 border border-white/25 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
      />
    </div>
  );
};
