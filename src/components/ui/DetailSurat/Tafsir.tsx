"use client";

import { IoClose } from "react-icons/io5";
import { Ayat, DataDetailSurat } from "@/types/ApiTypes/quran";
import { MdOutlineLightbulb } from "react-icons/md";

import { useTafsir } from "@/Hooks/useTafsirSurat";

type Props = {
  ayat: Ayat[];
  dataTafsir: number | null;
  setIsOpen: (val: boolean) => void;
  isOpen: boolean;
  dataDetailSurat: DataDetailSurat;
};

export default function TafsirCard({
  ayat,
  dataTafsir,
  setIsOpen,
  isOpen,
  dataDetailSurat,
}: Props) {
  const { data } = useTafsir(dataTafsir);

  console.log(data);
  console.log(dataTafsir);
  console.log(ayat);

  const ayatYangDipilih = ayat.find((ayat) => ayat?.nomorAyat === dataTafsir);

  const tafsirAyat = data?.tafsir?.find(
    (tafsir) => tafsir.ayat === ayatYangDipilih?.nomorAyat
  );
  console.log(tafsirAyat);
  return (
    <div>
      <div
        className={`   fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300 ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="bg-[#111]  text-white w-full border-1 border-white/50 max-w-3xl rounded-2xl shadow-lg p-6 relative">
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-3xl cursor-pointer text-gray-400 hover:text-white"
          >
            <IoClose />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-5">
            <div className=" text-3xl border-white/30 border-2 p-3 rounded-full">
              <MdOutlineLightbulb />
            </div>
            <div>
              <h2 className="text-lg font-semibold">
                Tafsir {dataDetailSurat.namaLatin} Ayat {tafsirAyat?.ayat}
              </h2>
              <div className="flex gap-2 mt-1">
                <span className="px-3 py-1 text-xs rounded-md bg-white/10">
                  {dataDetailSurat.namaLatin}&apos;
                </span>
                <span className="px-3 py-1 text-xs rounded-md bg-white/10">
                  Ayat {tafsirAyat?.ayat}
                </span>
              </div>
            </div>
          </div>

          {/* Ayat */}
          <div className="bg-[#1b1b1b] rounded-xl p-5 text-xl text-center leading-relaxed mb-5">
            <p>{ayatYangDipilih?.teksArab}</p>
          </div>

          {/* Tafsir */}
          {tafsirAyat ? (
            <div
              className="space-y-4 max-h-100 overflow-y-auto scrollbar-thin scrollbar-thumb-white/15 
                   scrollbar-track-white/1 "
            >
              <p>{tafsirAyat.teks}</p>
            </div>
          ) : (
            <p className="text-gray-500">Tafsir belum tersedia</p>
          )}
        </div>
      </div>
    </div>
  );
}
