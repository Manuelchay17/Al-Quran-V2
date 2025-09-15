"use client";

import Link from "next/link";
import React from "react";
import { FiBookOpen, FiShare2 } from "react-icons/fi";
import { TDataDoa } from "@/types/ApiTypes/doa";
import AOS from "aos";
import "aos/dist/aos.css";
// ..
AOS.init();

const DoaCard = ({
  searchInput,
  data,
  filterKategori,
}: {
  searchInput: string;
  data: TDataDoa[];
  filterKategori: string;
}) => {
  const displayData = data.filter((data) =>
    data.grup.toLowerCase().includes(filterKategori.toLowerCase())
  );

  const searchData = displayData.filter((data) =>
    data.nama.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="md:flex grid grid-cols-1 md:flex-wrap justify-center gap-7 max-w-400 mx-auto">
      {searchData.map((doa: TDataDoa) => (
        <div
          data-aos="fade-up"
          data-aos-delay="20"
          data-aos-duration="800"
          key={doa.id}
          className="md:w-md w-90 mx-5 md:mx-0 transition-all duration-300 hover:scale-105  justify-between  flex-col flex rounded-lg shadow-lg p-6 text-gray-200 border border-white/20"
        >
          {/* Header */}
          <h2 className="text-2xl pb-5 text-center mb-5 border-b-1 border-white/30 font-bold text-green-400">
            {doa.nama}
          </h2>

          {/* Konten Doa  */}
          <p className="text-sm text-center leading-relaxed mb-4 break-words whitespace-pre-line scrollbar-thin scrollbar-thumb-white/15 scrollbar-track-white/1  overflow-y-auto  h-23">
            <span className="font-semibold text-gray-400">{doa.tentang}</span>
          </p>

          {/* Tombol Aksi */}
          <div className="flex justify-center space-x-4">
            <Link href={`Doa/${doa.id}`}>
              <button className="cursor-pointer flex-1 w-80 flex items-center justify-center font-bold bg-green-600   px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                <FiBookOpen className="mr-2 font-bold text-xl" />
                Baca
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DoaCard;
