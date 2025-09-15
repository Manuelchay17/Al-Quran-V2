import React from "react";
import { DataSemuaSurat } from "@/types/ApiTypes/quran";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";

const MainContent = ({
  dataSurat,
  setAudioIsOpen,
  SetNomor,
}: {
  dataSurat: DataSemuaSurat;
  setAudioIsOpen: (value: boolean) => void;
  SetNomor: (value: number) => void;
}) => {
  console.log(dataSurat);
  return (
    <main>
      <div className="flex-grow text-gray-100  ">
        <div className="border-white/25 border-1 p-5 md:p-8 rounded-lg h-140 md-full">
          <div className="flex justify-between items-center mb-8">
            <h2 className="md:text-xl font-medium flex items-center gap-2">
              <span role="img" aria-label="music-note"></span>
              <IoMusicalNotesOutline />
              Daftar Surat Al-Quran
            </h2>
            <span className="bg-[#3b3b3b] text-gray-400 px-3 py-1 rounded-full text-xs">
              114 Surat
            </span>
          </div>
          {/* DaftarSurat */}
          <div className="space-y-4 mb-8 max-h-110 scrollbar-thin scrollbar-thumb-white/15 scrollbar-track-white/1 overflow-y-auto">
            {dataSurat.map((surat) => (
              <div
                onClick={() => {
                  setAudioIsOpen(true);
                  SetNomor(surat.nomor);
                }}
                key={surat.nomor}
                className="flex items-center  gap-4 p-3  rounded-lg border-b-1 border-white/25 cursor-pointer hover:bg-[#222] transition-colors"
              >
                <div className="text-gray-400 w-6 text-center">
                  {surat.nomor}
                </div>
                <div className="flex-grow">
                  <p className="md:text-xl text-white">{surat.namaLatin}</p>
                  <p className="text-xs md:text-sm text-white/50">
                    {surat.arti}
                  </p>
                  <div className="flex gap-4 text-xs text-white/50 mt-1">
                    <span className="flex items-center gap-1">
                      <IoLocationOutline /> {surat.tempatTurun}
                    </span>
                    <span className="flex items-center gap-1">
                      {surat.nomor} ayat
                    </span>
                  </div>
                </div>
                <div className=" text-2xl md:text-3xl font-amiri font-bold text-white/50">
                  {surat.nama}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-1 border-white/25 px-2 py-4 md:p-6 rounded-lg text-center mt-5">
          <h3 className="md:text-lg font-semibold mb-2 text-white">
            Kualitas Audio Tinggi
          </h3>
          <p className="md:text-sm text-xs text-white/50">
            Nikmati tilawah Al-Quran dengan kualitas audio terbaik dari 5 qari
            pilihan dunia. Klik pada surat untuk memulai pemutaran.
          </p>
        </div>
      </div>
    </main>
  );
};

export default MainContent;
