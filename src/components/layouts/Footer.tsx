import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className=" w-full rounded-lg shadow-sm mb-5 mt-5 ">
        <div className="w-full max-w-screen-xl mx-auto text-center">
          <hr className=" pt-5 border-white/30 sm:mx-auto  " />
          <span className="block text-sm  sm:text-center dark:text-white">
            © 2025{" "}
            <a href="https://flowbite.com/" className="hover:underline">
              ArifMiftahul™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
