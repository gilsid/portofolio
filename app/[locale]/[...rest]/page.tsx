import { notFound } from "next/navigation";

/* Semua alamat di bawah /id atau /en yang tidak dikenal berakhir di sini,
   supaya halaman 404 tampil lengkap dengan header, footer, dan bahasanya. */
export default function CatchAll() {
  notFound();
}
