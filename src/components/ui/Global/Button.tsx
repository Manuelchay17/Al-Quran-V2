import React from "react";
import Link from "next/link";
import { MdLogin } from "react-icons/md";

type buttonType = {
  text: string;
  href: string;
};

const Button = ({ text, href }: buttonType) => {
  return (
    <div>
      <Link href={href}>
        <button
          className={`px-3 border-1 py-1 rounded-md border-white/20 flex gap-2 items-center`}
        >
          <div className="text-md">
            <MdLogin />
          </div>{" "}
          {text}
        </button>
      </Link>
    </div>
  );
};

export default Button;
