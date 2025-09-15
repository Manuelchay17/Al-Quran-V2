import React from "react";
import { motion } from "framer-motion";
type titleType = {
  title: string;
  deskripsi: string;
  sizeTitle: string;
  sizeDeskripi: string;
};

const Title = ({ title, deskripsi, sizeTitle, sizeDeskripi }: titleType) => {
  const letters = Array.from(title);
  return (
    <div className="flex flex-col items-center ">
      <h1
        className={`${sizeTitle} font-bold w-89 md:w-200 bg-gradient-to-r break-words from-green-400 to-blue-500 bg-clip-text text-transparent flex flex-wrap justify-center`}
      >
        {letters.map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: i * 0.05 }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </h1>
      <p
        className={`${sizeDeskripi} text-white/45 text-center w-100 md:w-250 px-3 md:max-w-xl mt-4`}
      >
        {deskripsi}
      </p>
    </div>
  );
};

export default Title;
