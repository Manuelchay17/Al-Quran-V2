"use client";
import CardSurat from "@/components/ui/Global/CardSurat";
import Title from "@/components/ui/Global/Title";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="my-5 ">
        <Title
          title="Daftar Surat"
          sizeTitle="text-3xl md:text-5xl"
          deskripsi="Daftar Surat Dengan , transliterasi, dan terjemahan bahasa Indonesia"
          sizeDeskripi="text-md"
        />
      </div>

      <CardSurat limit={12} />
    </div>
  );
};

export default page;
