"use client";
import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { TDataDoa } from "@/types/ApiTypes/doa";
import { useParams } from "next/navigation";
import { IoBookOutline } from "react-icons/io5";
import Link from "next/link";

const DetailDoa = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery<TDataDoa>({
    queryKey: ["detail-Doa"],
    queryFn: async (): Promise<TDataDoa> => {
      const res = await fetch(`https://equran.id/api/doa/${id}`);
      const json = await res.json();
      return json.data;
    },
  });

  // Fetch Api
  const {
    data: dataSemuaSurat,
    isLoading: isLoadingSemuaSurat,
    isError: isErrorSemuaSurat,
  } = useQuery<TDataDoa[]>({
    queryKey: ["Doa"],
    queryFn: async (): Promise<TDataDoa[]> => {
      const res = await fetch("https://equran.id/api/doa");
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      return json.data;
    },
  });

  if (isErrorSemuaSurat)
    return <p className="text-red-500">Terjadi kesalahan!</p>;
  if (isLoadingSemuaSurat) return <p>Sedang loading...</p>;
  if (!dataSemuaSurat) return <p>data kosong</p>;
  if (isError) return <p className="text-red-500">Terjadi kesalahan!</p>;
  if (isLoading) return <p>Sedang loading...</p>;
  if (!data) return <p>data kosong</p>;
  console.log(data);
  const suratSejenis = dataSemuaSurat.filter(
    (dataSemuaSurat) => dataSemuaSurat.grup === data.grup
  );

  console.log(suratSejenis);
  return (
    <div className="  text-white min-h-screen font-sans p-2 flex flex-col mt-4 ">
      <Link
        href={"/Doa"}
        className="flex w-fit  items-center text-start md:ml-120 space-x-3 py-1 px-3 md:mx-auto hover:bg-white/7 rounded-lg"
      >
        <FaArrowLeft />
        <button className="  ">Kehalaman surat</button>
      </Link>
      <div className="max-w-4xl mt-5 mx-auto space-y-4 border-1 border-white/30 rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="flex bg-green-500/7   items-center justify-between  px-8 py-5 md:p-8 ">
          <div className="flex  items-center space-x-3">
            <div className="w-11 h-11 aspect-square  min-w-[44px] text-2xl bg-green-500/10 rounded-full  flex justify-center items-center text-[#3CB371]">
              <IoBookOutline />
            </div>

            <div className="flex flex-col space-y-2 md:px-3 justify-center ">
              <div className="flex items-center space-x-2">
                <h1 className="md:text-2xl text-xl font-bold ">{data.nama}</h1>
              </div>
              <div className="flex items-center  space-x-2 ">
                <div className="flex flex-wrap gap-2">
                  <span className="bg-white/7 text-[11px] px-2 py-1 rounded-full border border-gray-600">
                    {data.grup}
                  </span>
                  {data.tag.map((tag, index) => (
                    <div
                      key={index}
                      className="flex justify-center items-center"
                    >
                      <span className=" text-[11px]  px-2 py-1 rounded-full border border-gray-600">
                        {tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-300"></div>
        </div>

        {/* Main Content */}
        <div className="pb-4 px-5 md:px-7 space-y-6">
          {/* Teks Arab Section */}
          <div>
            <h3 className="text-lg font-semibold text-[#3CB371] mb-2 text-center">
              Teks Arab
            </h3>
            <p
              className="text-2xl text-right leading-loose font-amiri bg-white/4 rounded-2xl p-5"
              style={{ direction: "rtl" }}
            >
              {data.ar}
            </p>
          </div>

          {/* Terjemahan Section */}
          <div>
            <h3 className="text-lg font-semibold text-[#3CB371] mb-2">Latin</h3>
            <p className="text-base leading-relaxed bg-white/4 rounded-2xl p-5">
              {data.tr}
            </p>
          </div>
          {/* Arti */}
          <div>
            <h3 className="text-lg font-semibold text-[#3CB371] mb-2">
              Terjemahan
            </h3>
            <p className="text-base leading-relaxed bg-white/4 rounded-2xl p-5">
              {data.idn}
            </p>
          </div>

          {/* Keterangan & dalil */}
          <div>
            <h3 className="text-lg font-semibold text-[#3CB371] mb-2">
              Terjemahan
            </h3>
            <p className="text-base leading-relaxed bg-white/4 rounded-2xl p-5">
              {data.tentang}
            </p>
          </div>
        </div>
      </div>

      {/* Button Navigation */}

      <div className="md:p-5 text-white font-sans md:w-4xl mx-auto mt-10">
        <h2 className="md:text-2xl text-xl text-center font-semibold mb-6">
          Doa Lainnya dalam Kategori {data.grup}
        </h2>
        {suratSejenis.map((doaSejenis) => (
          <Link key={doaSejenis.id} href={`/Doa/${doaSejenis.id}`}>
            <div className="space-y-4 mb-5">
              <div className="flex items-center p-4  border-1 border-white/30 rounded-lg shadow-sm">
                <div className="bg-green-500/15 w-11 h-11 flex items-center justify-center rounded-full mr-4 flex-shrink-0">
                  <span className="text-green-500 text-xl">
                    <IoBookOutline />
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-lg mb-1">
                    {doaSejenis.nama}
                  </h4>
                  <p className="text-sm text-white/50">
                    {doaSejenis.idn.length > 100
                      ? doaSejenis.idn.slice(0, 100) + "..."
                      : doaSejenis.idn}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DetailDoa;
