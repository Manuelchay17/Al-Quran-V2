"use client";
import React from "react";
import Title from "../ui/Global/Title";
import Card from "../ui/Global/Card";

import CardSurat from "../ui/Global/CardSurat";
import { useState } from "react";

const HeroSection = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center pt-20 pb-10">
        <Title
          sizeTitle="md:text-5xl text-3xl"
          sizeDeskripi="md:text-lg"
          title="Al Quran Digital Bahasa Indonesia"
          deskripsi="Baca, dengarkan, dan pelajari Al-Quran dengan terjemahan bahasa Indonesia, audio berkualitas tinggi, dan tafsir yang lengkap"
        />
      </div>

      <div className="md:flex flex-col md:h-auto h-auto  md:px-20">
        <Card />
      </div>

      <div className="mt-16">
        <h1 className="md:text-3xl text-2xl text-center">
          Cari Surat Al-Quran
        </h1>
        <p className="md:text-lg text-md text-white/50 text-center mt-2">
          Cari berdasarkan nama surat, nomor, atau arti
        </p>
        <CardSurat />
      </div>
    </div>
  );
};

export default HeroSection;
