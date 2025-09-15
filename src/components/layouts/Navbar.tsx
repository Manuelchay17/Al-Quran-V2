"use client";
import React, { useState } from "react";
import Logo from "../ui/Navbar/Logo";
import NavbarButton from "../ui/Navbar/NavbarButton";
import NavbarFitur from "@/data/Navbar";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { div } from "framer-motion/client";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:px-20 px-6 border-b border-white/20 relative z-[100]">
      <div className="flex justify-between py-2 items-center">
        {/* Logo */}
        <Logo />

        {/* Tombol Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 rounded-md hover:bg-white/10"
          >
            <RxHamburgerMenu size={24} />
          </button>
        </div>

        {/* Drawer Menu */}
        <div
          className={`
            flex flex-col md:flex-row gap-3 bg-[#0a0a0a] md:bg-transparent
            fixed md:relative top-0 right-0 h-full md:h-auto w-[65%] md:w-auto
            p-6 md:p-0 transition-transform duration-300 z-[200] 
            ${isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}
          `}
        >
          {/* Header di mobile */}
          <div className="flex md:hidden justify-between items-center mb-4">
            <p className="text-lg font-semibold">Menu</p>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-md hover:bg-white/10"
            >
              <RxCross2 size={24} />
            </button>
          </div>

          {NavbarFitur.map((data, index) => (
            <div key={index} onClick={() => setIsOpen(false)}>
              <NavbarButton
                key={index}
                text={data.text}
                icon={data.icon}
                href={data.href}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-[150] md:hidden"
        />
      )}
    </div>
  );
};

export default Navbar;
