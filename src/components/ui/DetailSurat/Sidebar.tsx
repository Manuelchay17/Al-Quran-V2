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
        className="absolute inset-0 bg-black/80 md:hidden"
      />

      {/* Sidebar */}
      <div
        className="relative md:border-r-1 md:mt-7 bg-[#0a0a0a] border-1 border-white/50 md:border-0 h-150 md:h-300 mt-19 my-10
        w-86 mx-auto md:w-75 z-50 overflow-hidden"
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#0a0a0a] border-b-1 border-white/25 mb-5 w-full p-5">
          <div className="flex items-center justify-between">
            <h1 className="text-xl mb-2">Daftar Surat</h1>
            <div
              onClick={() => setSidebarOpen(false)}
              className="text-xl cursor-pointer md:hidden"
            >
              <RxCross2 />
            </div>
          </div>
          <div className="flex justify-center items-center border-1 border-white/50 text-white rounded-lg px-3 py-1">
            <CiSearch className="text-xl mr-2" />
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Cari surat..."
              className="bg-transparent w-full outline-none placeholder-white"
            />
          </div>
        </div>

        {/* Card Surat (scrollable content) */}
        <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-white/15 scrollbar-track-white/1 p-5 pt-0 -mt-1">
          <div className="grid gap-3">
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
                  } flex justify-between items-center rounded-lg px-6 py-5 `}
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
    </div>
  );
};

export default Sidebar;
