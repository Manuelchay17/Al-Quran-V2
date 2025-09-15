"use client";
import Title from "@/components/ui/Global/Title";
import MainContent from "@/components/ui/Qori/MainContent";
import Sidebar from "@/components/ui/Qori/Sidebar";
import React, { useState } from "react";
import MediaPlayer from "@/components/ui/Qori/MediaPlayer";
import { useDetailSurat, useSurat } from "@/Hooks/useSurat";

const AudioPage = () => {
  const [isAudioOpen, setAudioIsOpen] = useState<boolean>(false);
  const [qoryIsOpen, setQoryIsOpen] = useState<boolean>(false);
  const [labelQory, setLabelQory] = useState<string>("Abdulla Al-Juhanny");
  const [Qory, setQory] = useState<string>("01");
  const [nomor, setNomor] = useState<number>(1);

  // Fetch Semua Surat
  const { data: dataSurat, error } = useSurat();

  // Fetch Detail Semua Surat

  const { data: FetchDetailSurat, isLoading } = useDetailSurat({ nomor });

  if (isLoading) return <p>Loading Surat ...</p>;
  if (error) return <p>Terjadi kesalahan: {(error as Error).message}</p>;

  return (
    <div className="mt-7  md:w-screen ">
      <Title
        title="Audio Player"
        deskripsi="Dengarkan tilawah Al-Quran dari 5 qari terbaik dunia dengan kualitas audio tinggi"
        sizeDeskripi="md:text-md text-sm "
        sizeTitle="md:text-5xl text-3xl"
      />
      <div className="justify-center grid grid-cols-1 md:flex  pt-5 px-2 md:px-8 gap-8 bg-[#0d0d0d] text-white">
        <Sidebar
          labelQory={labelQory}
          setQoryIsOpen={setQoryIsOpen}
          qoryIsOpen={qoryIsOpen}
          Qory={Qory}
          setQory={setQory}
          setLabelQory={setLabelQory}
        />
        <MainContent
          SetNomor={setNomor}
          dataSurat={dataSurat ?? []}
          setAudioIsOpen={setAudioIsOpen}
        />
      </div>
      <MediaPlayer
        setNomor={setNomor}
        Qory={Qory}
        dataDetailSurat={FetchDetailSurat}
        dataSurat={dataSurat}
        setAudioIsOpen={setAudioIsOpen}
        isAudioOpen={isAudioOpen}
      />
    </div>
  );
};

export default AudioPage;
