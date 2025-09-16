"use state";
import React from "react";
import { Dropdown } from "../Global/Dropdown";
import { dataQory } from "@/data/DataQory";

const Sidebar = ({
  setQoryIsOpen,
  qoryIsOpen,
  labelQory,
  Qory,
  setLabelQory,
  setQory,
}: {
  setQoryIsOpen: (value: boolean) => void;
  qoryIsOpen: boolean;
  labelQory: string;
  Qory: string;
  setLabelQory: (value: string) => void;
  setQory: (value: string) => void;
}) => {
  console?.log(Qory);

  return (
    <aside className="border-1 border-white/25 md:p-8  p-5 px-7  md:w-[30%] text-gray-100 rounded-lg md:h-170">
      <h2 className="md:text-2xl text-md font-semibold mb-5">Pilih Qari</h2>

      <div>
        {/* Qory  */}
        <div>
          <div className="flex items-center space-x-2 mt-1">
            <p className="text-sm">Qory :</p>
            <div
              onClick={() => {
                setQoryIsOpen(!qoryIsOpen);
              }}
              className="w-58 cursor-pointer"
            >
              <Dropdown label={labelQory} />
            </div>
          </div>

          <div
            className={`${
              !qoryIsOpen ? "hidden" : ""
            } ml-13 mt-2   rounded-lg border-1 scrollbar-thin scrollbar-thumb-white/15 scrollbar-track-white/1  absolute overflow-y-auto max-h-90 border-white/20  bg-[#0a0a0a] z-10`}
          >
            {dataQory.map((dataQory) => (
              <div
                onClick={() => {
                  setLabelQory(dataQory.nama);
                  setQoryIsOpen(false);
                  setQory(dataQory.id);
                }}
                className="py-2 cursor-pointer flex bg-[#0a0a0a]  justify-between hover:bg-white/11 px-5"
                key={dataQory.id}
              >
                {dataQory.nama}
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
