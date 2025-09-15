import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <div>
      <Link
        href={"/"}
        className="font-bold cursor-pointer bg-gradient-to-r bg-clip-text text-transparent text-2xl from-green-400 to-blue-500"
      >
        Al-Quran
      </Link>
    </div>
  );
};

export default Logo;
