"use client";
import DoaCard from "@/components/ui/Doa/DoaCard";
import Header from "@/components/ui/Doa/Header";
import React, { useState } from "react";
import { TDataDoa } from "@/types/ApiTypes/doa";
import { useQuery } from "@tanstack/react-query";

const DoaPage = () => {
  const [searchInput, setSearchInput] = useState<string>(" ");
  const [filterKategori, setFilterKategori] = useState<string>("");

  // Fetch Api
  const { data, isLoading, isError } = useQuery<TDataDoa[]>({
    queryKey: ["Doa"],
    queryFn: async (): Promise<TDataDoa[]> => {
      const res = await fetch("https://equran.id/api/doa");
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      return json.data;
    },
  });

  if (isError) return <p className="text-red-500">Terjadi kesalahan!</p>;
  if (isLoading) return <p>Sedang loading...</p>;
  if (!data) return <p>data kosong</p>;
  return (
    <div className="md:w-350 md:mx-auto   grid grid-cols-1">
      <Header
        data={data}
        setSearchInput={setSearchInput}
        setFilterKategori={setFilterKategori}
      />
      <DoaCard
        filterKategori={filterKategori}
        data={data}
        searchInput={searchInput}
      />
    </div>
  );
};

export default DoaPage;
