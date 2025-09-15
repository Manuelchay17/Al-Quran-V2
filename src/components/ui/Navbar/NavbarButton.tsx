"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type ButtonProps = {
  text: string;
  icon: React.ReactNode;
  href: string;
};

const NavbarButton = ({ text, icon, href }: ButtonProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <div>
      <Link href={href}>
        <button
          className={`px-3 rounded-md ${
            isActive ? "bg-white/10" : ""
          } hover:bg-white/10 py-1`}
        >
          <div className="flex items-center gap-2">
            <div className="text-md">{icon}</div>
            {text}
          </div>
        </button>
      </Link>
    </div>
  );
};

export default NavbarButton;
