import React, { useState, useRef } from "react";
import { FiPlay, FiPause, FiBookOpen } from "react-icons/fi";
import { DataDetailSurat } from "@/types/ApiTypes/quran";
import { IoIosArrowDown } from "react-icons/io";
import Dropdown from "./Dropdown";
import { FaArrowLeftLong } from "react-icons/fa6";
import { dataQory } from "@/data/DataQory";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";

type MainContentProps = {
  dataDetailSurat: DataDetailSurat;
  setDataTafsir: (nomorAyat: number) => void;
  setIsOpen: (val: boolean) => void;
  isOpen: boolean;
  setSideBarOpen: (val: boolean) => void;
};

const MainContent = ({
  dataDetailSurat,
  setDataTafsir,
  setIsOpen,
  setSideBarOpen,
}: MainContentProps) => {
  const [terjemahIsOpen, setTerjemahIsOpen] = useState<boolean>(false);
  const [ayatIsOpen, setAyatIsOpen] = useState<boolean>(false);

  const ayatListRef = useRef<HTMLDivElement | null>(null);
  const ayatRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const audioRefs = useRef<{ [key: number]: HTMLAudioElement | null }>({});

  const [playingAyat, setPlayingAyat] = useState<number | null>(null);

  const [labelQory, setLabelQory] = useState<string>("Abdullah Al-Juhany");
  const [qoryIsOpen, setQoryIsOpen] = useState<boolean>(false);
  const [qory, setQory] = useState<string>("01");

  const handleAyatClick = (nomorAyat: number) => {
    setAyatIsOpen(false);
    const targetAyat = ayatRefs.current[nomorAyat];
    const parentContainer = ayatListRef.current;

    if (targetAyat && parentContainer) {
      const targetRect = targetAyat.getBoundingClientRect();
      const parentRect = parentContainer.getBoundingClientRect();

      const offset = 5;
      const scrollPosition =
        targetRect.top - parentRect.top + parentContainer.scrollTop - offset;

      parentContainer.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  const togglePlay = (nomorAyat: number) => {
    const audio = audioRefs.current[nomorAyat];
    if (!audio) return;

    if (playingAyat === nomorAyat) {
      audio.pause();
      setPlayingAyat(null);
    } else {
      if (playingAyat && audioRefs.current[playingAyat]) {
        audioRefs.current[playingAyat]!.pause();
        audioRefs.current[playingAyat]!.currentTime = 0;
      }

      audio.play();
      setPlayingAyat(nomorAyat);

      const targetAyat = ayatRefs.current[nomorAyat];
      const parentContainer = ayatListRef.current;

      if (targetAyat && parentContainer) {
        const targetRect = targetAyat.getBoundingClientRect();
        const parentRect = parentContainer.getBoundingClientRect();

        const scrollPosition =
          targetRect.top - parentRect.top + parentContainer.scrollTop;

        parentContainer.scrollTo({
          top: scrollPosition,
          behavior: "smooth",
        });
      }
    }
  };

  const handleEnded = (nomorAyat: number) => {
    const nextAyat = nomorAyat + 1;
    if (nextAyat <= dataDetailSurat.ayat.length) {
      togglePlay(nextAyat);
    } else {
      setPlayingAyat(null);
    }
  };

  return (
    <div>
      <Link
        href={"/"}
        className="flex space-x-2 md:space-x-4 items-center mb-5 py-2 rounded-2xl justify-center cursor-pointer hover:bg-white/7  w-45 md:w-53"
      >
        <FaArrowLeftLong />
        <button className="cursor-pointer text-sm md:text-lg">
          Kembali Ke Beranda
        </button>
      </Link>

      {/* Header */}
      <div className="border-l-3 border-1 border-white/20 border-l-green-500 rounded-lg">
        <div className="bg-green-500/7 flex justify-between items-center rounded-lg px-6 py-5">
          <div className="flex items-center gap-4">
            <div
              onClick={() => setTerjemahIsOpen(!terjemahIsOpen)}
              className="hover:bg-white/7 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer"
            >
              <IoIosArrowDown />
            </div>
            <div className="flex flex-col gap-1 items-start">
              <h1 className="text-3xl">{dataDetailSurat.namaLatin}</h1>
              <p className="text-white/50 text-sm">({dataDetailSurat.arti})</p>
            </div>
          </div>
          <div className="flex flex-col gap-1 items-center">
            <h1 className="text-2xl">{dataDetailSurat.nama}</h1>
            <p className="text-white/50 text-sm">
              {dataDetailSurat.jumlahAyat} Ayat
            </p>
          </div>
        </div>
        <div
          className={` ${
            !terjemahIsOpen ? "hidden" : ""
          } text-white/60 p-5 rounded-b-2xl`}
        >
          <p dangerouslySetInnerHTML={{ __html: dataDetailSurat.deskripsi }} />
        </div>
      </div>

      {/* Fitur */}
      <div className="flex md:relative space-x">
        {/* Dropdown Ayat */}
        <div>
          <div className="flex ml-2 items-center space-x-1 mt-5 md:mr-3 w-40 md:w-46">
            <p className="text-sm">Ayat :</p>
            <div
              onClick={() => setAyatIsOpen(!ayatIsOpen)}
              className=" md:w-28 w-25 cursor-pointer"
            >
              <div className="text-sm">
                <Dropdown label="Semua" />
              </div>
            </div>
          </div>

          <div
            className={`${
              !ayatIsOpen ? "hidden" : ""
            } ml-12 w-28 rounded-lg border-1 scrollbar-thin scrollbar-thumb-white/15 scrollbar-track-white/1  absolute overflow-y-auto max-h-90 border-white/20 mt-1 bg-black z-10`}
          >
            {dataDetailSurat.ayat.map((ayat) => (
              <div
                className="py-2 cursor-pointer flex   justify-between hover:bg-white/11 px-5"
                key={ayat.nomorAyat}
                onClick={() => handleAyatClick(ayat.nomorAyat)}
              >
                Ayat {ayat.nomorAyat}
              </div>
            ))}
          </div>
        </div>
        {/* Qory  */}
        <div className="relative">
          <div className="flex items-center  mt-5  space-x-1">
            <p className="text-sm">Qory :</p>
            <div
              onClick={() => {
                setQoryIsOpen(!qoryIsOpen);
              }}
              className="md:w-45 w-32 cursor-pointer"
            >
              <div className="text-sm">
                <Dropdown
                  label={
                    <>
                      <span className="sm:hidden">
                        {labelQory.length > 8
                          ? `${labelQory.slice(0, 8)}...`
                          : labelQory}
                      </span>
                      <span className="hidden sm:inline">{labelQory}</span>
                    </>
                  }
                />
              </div>
            </div>
            <div
              className={`${
                !qoryIsOpen ? "hidden" : ""
              }   mt-2 top-12 right-0 md:w-58 w-37 rounded-lg border-1 scrollbar-thin scrollbar-thumb-white/15 scrollbar-track-white/1  absolute overflow-y-auto max-h-90 border-white/20  bg-black z-10`}
            >
              {dataQory.map((dataQory) => (
                <div
                  onClick={() => {
                    setLabelQory(dataQory.nama);
                    setQoryIsOpen(false);
                    setQory(dataQory.id);
                  }}
                  className="py-2 cursor-pointer flex   justify-between hover:bg-white/7 px-5"
                  key={dataQory.id}
                >
                  {dataQory.nama}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Buka Surat Lainya */}
      {}
      <div
        onClick={() => setSideBarOpen(true)}
        className=" md:hidden rounded-lg mt-5 hover:border-white/50 cursor-pointer flex items-center gap-2 justify-center text-center p-3 border-1 border-white/30 "
      >
        <RxHamburgerMenu size={20} />
        <p>Buka Surat Lain</p>
      </div>
      {/* Detail Surat */}
      <div
        ref={ayatListRef}
        className="flex pr-1 md:pr-3 flex-col gap-5 h-screen md:h-260 overflow-y-auto mt-6 scrollbar-hide scrollbar-thin scrollbar-thumb-white/15 scrollbar-track-white/1"
      >
        {dataDetailSurat.ayat.map((ayat) => (
          <div
            key={ayat.nomorAyat}
            ref={(el) => {
              ayatRefs.current[ayat.nomorAyat] = el;
            }}
            className=" border-white/30 border-1 rounded-lg px-7 py-5 md:p-10"
          >
            <div className="flex justify-between items-center w-full mb-10">
              <div className="p-[2px] rounded-full bg-gradient-to-r from-green-400 to-blue-500">
                <p className="flex items-center justify-center md:w-12 md:h-12 w-10 h-10 rounded-full bg-black text-white">
                  {ayat.nomorAyat}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setDataTafsir(ayat.nomorAyat);
                    setIsOpen(true);
                  }}
                  className="text-md  rounded-full flex items-center justify-center"
                >
                  <div className="border-white/40 border-1 flex  items-center px-3 py-2 rounded-3xl">
                    <p className="text-lg mr-1">
                      <FiBookOpen />
                    </p>
                    <p className="text-xs md:text-sm">Tafsir</p>
                  </div>
                </button>

                <button
                  onClick={() => togglePlay(ayat.nomorAyat)}
                  className="text-md  rounded-full flex items-center justify-center"
                >
                  <div className="border-white/40 border-1 flex  items-center px-3 py-2 rounded-3xl">
                    <p className="md:text-lg  mr-1">
                      {playingAyat === ayat.nomorAyat ? (
                        <FiPause />
                      ) : (
                        <FiPlay />
                      )}
                    </p>
                    <p className="text-xs md:text-sm ">Play</p>
                  </div>

                  <audio
                    ref={(el) => {
                      audioRefs.current[ayat.nomorAyat] = el;
                    }}
                    src={ayat.audio[qory]}
                    onEnded={() => handleEnded(ayat.nomorAyat)}
                  />
                </button>
              </div>
            </div>
            <div className="text-end mt-4 mb-10 text-2xl md:text-4xl">
              <p>{ayat.teksArab}</p>
            </div>
            <div className="flex-col flex gap-5 mb-3">
              <p className="text-white/50">{ayat.teksLatin}</p>
              <p>{ayat.teksIndonesia}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainContent;
