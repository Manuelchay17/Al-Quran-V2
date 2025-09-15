import { DataDetailSurat } from "@/types/ApiTypes/quran";
import { useQuery } from "@tanstack/react-query";

export const useTafsir = (nomor: number | null) => {
  return useQuery<DataDetailSurat>({
    queryKey: ["tafsir", nomor],
    queryFn: async () => {
      const res = await fetch(`https://equran.id/api/v2/tafsir/${nomor}`);
      if (!res.ok) throw new Error("Failed to fetch data");
      const json = await res.json();
      return json.data;
    },
    enabled: !!nomor,
  });
};
