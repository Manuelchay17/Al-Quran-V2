import { IoHomeOutline, IoBookOutline, IoVolumeHigh } from "react-icons/io5";
import { BiBookAlt } from "react-icons/bi";
const NavbarFitur = [
  {
    text: "Beranda",
    href: "/",
    icon: <IoHomeOutline />,
  },
  {
    text: "Surat",
    href: "/Surat",
    icon: <BiBookAlt />,
  },
  {
    text: "Doa",
    href: "/Doa",
    icon: <IoBookOutline />,
  },
  {
    text: "Audio Player",
    href: "/Audio-Player",
    icon: <IoVolumeHigh />,
  },
];
export default NavbarFitur;
