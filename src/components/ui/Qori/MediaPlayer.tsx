"use client";
import React, { useRef, useState } from "react";
import { FaPlay, FaStepForward, FaStepBackward, FaPause } from "react-icons/fa";
import { BsShuffle, BsArrowRepeat } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { IoVolumeMediumOutline } from "react-icons/io5";
import { DataSemuaSurat } from "@/types/ApiTypes/quran";
import { DataDetailSurat } from "@/types/ApiTypes/quran";

const MediaPlayer = ({
  setAudioIsOpen,
  isAudioOpen,
  Qory,
  dataDetailSurat,
  setNomor,
}: {
  setAudioIsOpen: (value: boolean) => void;
  isAudioOpen: boolean;
  dataSurat: DataSemuaSurat | undefined;
  Qory: string;
  dataDetailSurat: DataDetailSurat | undefined;
  setNomor: (value: number) => void;
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  console.log(dataDetailSurat);
  return (
    <div
      className={`${
        !isAudioOpen ? "hidden" : ""
      } border-white/20 border-y-1  bg-[#0a0a0a]  md:p-10 py-5 md:px-20 z-9999  fixed bottom-0 left-0 right-0  text-white  flex items-center justify-between rounded-lg`}
    >
      {/* Audio play */}
      <audio
        ref={audioRef}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        src={dataDetailSurat?.audioFull[Qory]}
      ></audio>
      {/* Track Info Section */}
      <div className="w-full flex flex-col items-center justify-center lg:flex-row lg:items-end">
        <div className="flex justify-between w-full px-12 md:px-8  ">
          <div className=" flex items-center jus md:space-x-4">
            <div className="bg-teal-600 p-3 rounded-full  hidden md:block">
              <p className="md:text-3xl">
                <IoVolumeMediumOutline />
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold">
                {dataDetailSurat?.namaLatin}
              </h3>
              <p className="text-sm text-gray-400 hidden md:block">
                {dataDetailSurat?.arti}
              </p>
            </div>
          </div>
          <div
            onClick={() => setAudioIsOpen(false)}
            className="flex items-center  justify-center space-x-4 w-7 h-7 text-gray-400 hover:bg-white/10 cursor-pointer md:p-3 rounded-full"
          >
            <div className="relative">
              <span className="md:text-2xl text-xl ">
                <RxCross1 />
              </span>
            </div>
          </div>
        </div>

        {/* Main Controls Section */}
        <div className="md:flex-1 mt-2  md:flex md:flex-col items-center md:mx-8 md:space-y-2">
          <div className="flex  items-center justify-center space-x-6 text-gray-400 mb-4">
            <BsShuffle className="text-lg cursor-pointer hover:text-white" />
            <FaStepBackward
              className="text-lg cursor-pointer hover:text-white"
              onClick={() => {
                if (!dataDetailSurat?.suratSebelumnya) return;
                setNomor(dataDetailSurat.suratSebelumnya.nomor);
              }}
            />
            <button
              onClick={togglePlay}
              className="bg-teal-600 p-4 rounded-full text-white cursor-pointer focus:outline-none"
            >
              {isPlaying ? <FaPause /> : <FaPlay className="text-lg" />}
            </button>
            <FaStepForward
              className="text-lg cursor-pointer hover:text-white"
              onClick={() => {
                if (!dataDetailSurat?.suratSelanjutnya) return;
                setNomor(dataDetailSurat.suratSelanjutnya.nomor);
              }}
            />
            <BsArrowRepeat
              className="text-lg cursor-pointer hover:text-white"
              onClick={() => {
                if (!audioRef.current) return;
                audioRef.current.currentTime = 0;
                audioRef.current.play();
                setIsPlaying(true);
              }}
            />
          </div>

          {/* Progress Bar */}
          <div className="md:w-[900px]  flex items-center space-x-4">
            <span className="text-xs text-gray-400">
              {formatTime(currentTime)}
            </span>
            <div
              className="flex-1 h-1 bg-white/20 rounded-full cursor-pointer"
              onClick={(e) => {
                if (!audioRef.current) return;
                const rect = (
                  e.currentTarget as HTMLDivElement
                ).getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const newTime = (clickX / rect.width) * duration;
                audioRef.current.currentTime = newTime;
                setCurrentTime(newTime);
              }}
            >
              <div
                className="h-1 bg-green-500 rounded-full"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-400">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Right-side Controls (Volume, etc.) */}
      </div>
    </div>
  );
};

export default MediaPlayer;
