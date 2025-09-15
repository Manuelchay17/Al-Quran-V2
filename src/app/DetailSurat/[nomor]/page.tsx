"use client";

import { useParams } from "next/navigation";
import React, { useState } from "react";
import TafsirCard from "@/components/ui/DetailSurat/Tafsir";
import Sidebar from "@/components/ui/DetailSurat/Sidebar";
import MainContent from "@/components/ui/DetailSurat/MainContent";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import Link from "next/link";
import { useSurat, useDetailSurat } from "@/Hooks/useSurat";

const DetailSurat = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [dataTafsir, setDataTafsir] = useState<number | null>(null);
  const params = useParams();
  const nomor = (params.nomor as string) ?? "";

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [sidebarOpen, setsidebarOpen] = useState<boolean>(false);

  console.log(dataTafsir);
  // Fetch detail surat
  const {
    data: dataDetailSurat,
    isLoading: loadingDetailSurat,
    isError: errorDetailSurat,
    error,
  } = useDetailSurat({ nomor });

  // Fetch semua surat
  const {
    data: dataSemuaSurat,
    isLoading: loadingSemuaSurat,
    isError: ErrorSemuaSurat,
  } = useSurat();

  console.log(dataDetailSurat);
  if (loadingSemuaSurat) return <p>Sedang loading....</p>;
  if (loadingDetailSurat) return <p>Surat Sedang dimuat...</p>;
  if (errorDetailSurat) return <p>gagal mendapatkan detail surat</p>;
  if (ErrorSemuaSurat) return <p>gagal mendapatkan data semua surat</p>;

  const filteredData = dataSemuaSurat?.filter((dataSemuaSurat) =>
    dataSemuaSurat.namaLatin.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="md:px-20 px-2 flex flex-col  ">
      {/* Sidebar */}
      <div className=" md:flex   ">
        {/* Left */}

        <div
          className={` ${
            sidebarOpen ? "block" : "hidden"
          } md:block                          `}
        >
          <Sidebar
            setSidebarOpen={setsidebarOpen}
            semuaDataSurat={filteredData ?? []}
            setSearch={setSearchInput}
            nomor={nomor}
          />
        </div>

        {/* Right */}
        <div className="md:ml-10  flex-1 w-full mt-5">
          {dataDetailSurat && (
            <MainContent
              setSideBarOpen={setsidebarOpen}
              dataDetailSurat={dataDetailSurat}
              setDataTafsir={setDataTafsir}
              setIsOpen={setIsOpen}
              isOpen={isOpen}
            />
          )}
        </div>
      </div>
      {/* Button Navigasi Surat */}
      {!sidebarOpen && (
        <div className="flex px-5 pt-3 md:py-5 justify-end">
          <div className="flex justify-between">
            {dataDetailSurat?.suratSebelumnya !== false && (
              <Link href={`${dataDetailSurat?.suratSebelumnya.nomor}`}>
                <button className="rounded-lg border-1 border-white/30 w-45 cursor-pointer hover:border-white/50 flex justify-center gap-2 items-center h-8 mx-4">
                  <FaArrowLeft /> Surat Sebelumnya
                </button>
              </Link>
            )}

            {dataDetailSurat?.suratSelanjutnya && (
              <Link href={`${dataDetailSurat?.suratSelanjutnya.nomor}`}>
                <button className="rounded-lg border-1 border-white/30 w-45 text-sm  cursor-pointer hover:border-white/50 h-8 mx-2 md:mx-4 flex justify-center gap-2 items-center">
                  Surat Selanjutnya <FaArrowRight />
                </button>
              </Link>
            )}
          </div>
        </div>
      )}

      {dataDetailSurat && (
        <TafsirCard
          ayat={dataDetailSurat.ayat}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          dataTafsir={dataTafsir}
          dataDetailSurat={dataDetailSurat}
        />
      )}
    </div>
  );
};

export default DetailSurat;
