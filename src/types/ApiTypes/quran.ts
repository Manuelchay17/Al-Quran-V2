export interface AudioFull {
  [key: string]: string;
}
export interface Ayat {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
  audio: AudioFull;
}

export interface SuratBase {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  deskripsi: string;
  audioFull: AudioFull;
}
export interface Tafsir {
  ayat: number;
  teks: string;
}

export interface DataDetailSurat extends SuratBase {
  suratSebelumnya:
    | false
    | {
        // kalau ga ada, jadi false
        nomor: number;
        nama: string;
        namaLatin: string;
        jumlahAyat: number;
      };
  suratSelanjutnya: {
    nomor: number;
    nama: string;
    namaLatin: string;
    jumlahAyat: number;
  };
  tafsir: Tafsir[];
}

export type DataSemuaSurat = SuratBase[];

export interface DataDetailSurat extends SuratBase {
  ayat: Ayat[];
}
