import React from "react";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
import { RxCross2 } from "react-icons/rx";
import { DataSemuaSurat } from "@/types/ApiTypes/quran";

const Sidebar = ({
  semuaDataSurat,
  setSearch,
  nomor,
  setSidebarOpen,
}: {
  semuaDataSurat: DataSemuaSurat;
  setSearch: (value: string) => void;
  nomor: string;
  setSidebarOpen: (value: boolean) => void;
}) => {
  return (
    <div className="fixed inset-0 z-50 md:static md:inset-auto">
      {/* Overlay */}
      <div
        onClick={() => setSidebarOpen(false)}
        className="absolute inset-0 bg-black/60 md:hidden"
      />

      {/* Sidebar */}
      <div
        className="relative md:border-r-1 md:mt-7 bg-[#0a0a0a] border-1 md:border-0 h-full md:h-300 mt-20   my-10
                   border-white/30 scrollbar-thin scrollbar-thumb-white/15 
                   scrollbar-track-white/1 overflow-y-auto 
                   w-93 mx-3 md:w-75 z-50"
      >
        <div className="sticky top-0 bg-[#0a0a0a]  border-b-1 border-white/25 w-full">
          <div className="flex items-center justify-between">
            <h1 className="text-xl mt-3 ml-5 mb-2">Daftar Surat</h1>
            <div
              onClick={() => setSidebarOpen(false)}
              className="mr-5 text-xl cursor-pointer md:hidden"
            >
              <RxCross2 />
            </div>
          </div>

          <div className="flex ml-5 justify-center items-center w-70 md:w-60 border-1 border-white/50 text-white rounded-lg px-3 py-1 mb-5">
            <CiSearch className="text-xl mr-2" />
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Cari surat..."
              className="bg-transparent w-full outline-none placeholder-white"
            />
          </div>
        </div>

        {/* Card Surat */}
        <div className="flex mt-5 justify-center gap-3 md:mt-3 md:h-170 flex-wrap pt-5">
          {semuaDataSurat.map((surat) => (
            <Link
              key={surat.nomor}
              href={`/DetailSurat/${surat.nomor}`}
              onClick={() => setSidebarOpen(false)}
            >
              <div
                className={`${
                  parseInt(nomor) === surat.nomor
                    ? `bg-green-400/10 border-l-3 border-green-500`
                    : "border-1 border-white/20"
                } w-75 md:w-70 flex justify-between items-center rounded-lg px-6 py-5 `}
              >
                <div className="flex items-center gap-4">
                  {/* Nomor */}
                  <div className="p-[2px] rounded-full bg-gradient-to-r from-green-400 to-blue-500">
                    <div className="flex items-center justify-center w-7 h-7 rounded-full bg-black text-white">
                      {surat.nomor}
                    </div>
                  </div>
                  {/* Nama */}
                  <div className="flex flex-col gap-1 items-start">
                    <h1 className="text-lg">{surat.namaLatin}</h1>
                    <p className="text-white/50 text-sm">({surat.arti})</p>
                  </div>
                </div>

                <div className="flex flex-col gap-1 items-center">
                  <h1 className="text-2xl">{surat.nama}</h1>
                  <p className="text-white/50 text-sm">
                    {surat.jumlahAyat} Ayat
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
