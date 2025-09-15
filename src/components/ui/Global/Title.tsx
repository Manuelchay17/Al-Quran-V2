import React from "react";
import { motion } from "framer-motion";
type titleType = {
  title: string;
  deskripsi: string;
  sizeTitle: string;
  sizeDeskripi: string;
};

const Title = ({ title, deskripsi, sizeTitle, sizeDeskripi }: titleType) => {
  const words = title.split(" ");

  return (
    <div className="flex flex-col items-center">
      <h1
        className={`${sizeTitle} w-88 font-bold md:w-200 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent text-center leading-tight`}
      >
        {words.map((word, wi) => (
          <span key={wi} className="inline-block mr-2">
            {Array.from(word).map((char, ci) => (
              <motion.span
                key={ci}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: (wi * 5 + ci) * 0.05 }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </h1>

      <p
        className={`${sizeDeskripi} text-white/45 text-center w-90 md:w-250 px-3 md:max-w-xl mt-4`}
      >
        {deskripsi}
      </p>
    </div>
  );
};

export default Title;
