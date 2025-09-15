"use client";
import React, { useState } from "react";
import { SearchBar } from "@/components/ui/Doa/SearchBar";
import { Dropdown } from "@/components/ui/Global/Dropdown";
import { TDataDoa } from "@/types/ApiTypes/doa";
import { FaCheck } from "react-icons/fa";
import Title from "../Global/Title";

const Header = ({
  setSearchInput,
  data,
  setFilterKategori,
}: {
  setSearchInput: (value: string) => void;
  data: TDataDoa[];
  setFilterKategori: (value: string) => void;
}) => {
  const kategori = [...new Set(data.map((item) => item.grup))];
  const [isKategoriOpen, setIsKategoriOpen] = useState<boolean>(false);
  const [label, setLabel] = useState<string>("Semua Kategori");

  return (
    <div>
      <div className=" text-white px-3 md:px-9 py-10 ">
        {/* Header Section */}
        <div className="text-center mb-10">
          <Title
            sizeTitle=" text-3xl md:text-5xl"
            sizeDeskripi="text-sm md:text-lg"
            title="Kumpulan Doa Harian"
            deskripsi="Kumpulan doa-doa harian dalam Islam lengkap dengan teks Arab, transliterasi, dan terjemahan bahasa Indonesia"
          />
        </div>

        <div className="md:flex space-y-3 md:space-y-0 md:justify-center md:items-center md:space-x-2">
          {/* Search and Filter Section */}
          <div className="w-full lg:w-290">
            <SearchBar setSearchInput={setSearchInput} />
          </div>

          {/* Filter Kategori */}
          <div className="relative w-full lg:w-75">
            <div
              onClick={() => {
                setIsKategoriOpen(!isKategoriOpen);
              }}
            >
              <Dropdown label={label} />
            </div>

            <div
              className={`absolute top-full z-10 w-full mt-3 rounded-lg border-1 border-white/30 bg-black h-50 overflow-y-auto scrollbar-thin scrollbar-thumb-white/15 scrollbar-track-white/1 ${
                isKategoriOpen ? "block" : "hidden"
              }`}
            >
              <p
                onClick={() => {
                  setFilterKategori("");
                  setIsKategoriOpen(false);
                  setLabel("Semua Kategori");
                }}
                className="py-2  cursor-pointer hover:bg-white/7 px-5 flex justify-between"
              >
                Semua Kategori
                {label === "Semua Kategori" && (
                  <FaCheck className="text-green-500" />
                )}
              </p>
              {kategori.map((kategori, index) => (
                <div
                  onClick={() => {
                    setFilterKategori(kategori);
                    setIsKategoriOpen(false);
                    setLabel(kategori);
                  }}
                  key={index}
                  className="py-2 cursor-pointer flex justify-between hover:bg-white/7 px-5"
                >
                  <p>{kategori}</p>
                  {label === kategori && <FaCheck className="text-green-500" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
