import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

import HeroSection from "@/components/layouts/HeroSection";
export default function Home() {
  return (
    <div>
      <HeroSection />
    </div>
  );
}
