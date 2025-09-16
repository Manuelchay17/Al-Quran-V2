import React from "react";
import HeroFiture from "@/data/HeroFitur";

const Card = () => {
  return (
    <div className="w-full   mt-10 px-4 md:px-20">
      <div className="grid grid-cols-1 md:flex md:justify-center  gap-4">
        {HeroFiture.map((fitur, index) => (
          <div
            key={index}
            className="border md:w-100 border-white/20 rounded-lg p-5 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105"
          >
            <div className="text-2xl bg-gradient-to-r from-green-400 to-blue-500 p-3 rounded-full text-black font-bold">
              {fitur.icon}
            </div>
            <h1 className="mt-4 font-semibold">{fitur.title}</h1>
            <p className="text-sm text-white/50 mt-1">{fitur.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
