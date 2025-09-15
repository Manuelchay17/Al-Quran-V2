import { useQuery } from "@tanstack/react-query";
import { DataDetailSurat, DataSemuaSurat } from "@/types/ApiTypes/quran";
export const useSurat = () => {
  return useQuery<DataSemuaSurat>({
    queryKey: ["data-semua-surat"],
    queryFn: async () => {
      const res = await fetch("https://equran.id/api/v2/surat");
      if (!res.ok) throw new Error("Failed to fetch data");
      const json = await res.json();
      return json.data;
    },
  });
};

export const useDetailSurat = ({ nomor }: { nomor?: number | string }) => {
  return useQuery<DataDetailSurat>({
    queryKey: ["surat", nomor],
    queryFn: async () => {
      const res = await fetch(`https://equran.id/api/v2/surat/${nomor}`);
      if (!res.ok) throw new Error("gagal mendapatkan data");

      const json = await res.json();
      return json.data;
    },
    enabled: !!nomor,
  });
};
