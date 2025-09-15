"use client";

import { useSurat } from "@/Hooks/useSurat";
import Link from "next/link";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

const CardSurat = () => {
  const [showAll, setShowAll] = useState(false);
  const [search, setSearch] = useState("");

  const { data: dataSurat, isLoading, isError } = useSurat();

  if (isLoading) return <p>Loading Surat ...</p>;
  if (isError) return <p>Terjadi kesalahan!</p>;

  const filteredData = dataSurat?.filter((surat) =>
    surat.namaLatin.toLowerCase().includes(search.toLowerCase())
  );

  const displayData = showAll ? filteredData : filteredData?.slice(0, 6);

  const handleClick = () => setShowAll(!showAll);

  return (
    <div className="px-4 md:px-20">
      <div className="flex justify-center  mt-8 mb-9">
        <div className="relative w-full  max-w-2xl ">
          <CiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Cari surat..."
            className="w-full pl-12 pr-4 py-3 border border-white/50 text-gray-300 rounded-lg outline-none focus:border-white/90 transition-colors"
          />
        </div>
      </div>

      {filteredData?.length === 0 && (
        <p className="text-center text-gray-400">Tidak ada surat ditemukan.</p>
      )}

      <div className="grid grid-cols-1 md:px-15 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayData?.map((surat) => (
          <Link
            key={surat.nomor}
            href={`/DetailSurat/${surat.nomor}`}
            className="block"
          >
            <div className="border border-white/20 rounded-lg p-5 flex items-center justify-between transition-all duration-300 hover:scale-105 hover:bg-white/10">
              <div className="flex items-center gap-4">
                <div className="p-[2px] rounded-full bg-gradient-to-r from-green-400 to-blue-500">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white font-semibold">
                    {surat.nomor}
                  </div>
                </div>
                <div className="flex flex-col items-start">
                  <h1 className="text-lg font-semibold">{surat.namaLatin}</h1>
                  <p className="text-white/50 text-sm">{surat.arti}</p>
                </div>
              </div>

              <div className="flex flex-col items-end text-right">
                <h1 className="text-2xl">{surat.nama}</h1>
                <p className="text-white/50 text-sm mt-1">
                  {surat.jumlahAyat} Ayat
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {(filteredData ?? []).length > 6 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleClick}
            className="px-6 py-2 border border-white/50 cursor-pointer rounded-lg hover:bg-white/10 transition-colors"
          >
            {showAll ? "Tampilkan Lebih Sedikit" : "Lihat Semua"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CardSurat;
