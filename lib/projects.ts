import type { Locale } from "./i18n";

export type ProjectKind = "web" | "mobile" | "cli";

export interface Project {
  id: string;
  name: string;
  year: string;
  kind: ProjectKind;
  summary: string;
  lead: string;
  repo: string;
  /** Paths screenshot di folder public, urutan = alur UI. Bisa lebih dari satu (galeri). */
  shots: string[];
  stack: string[];
  features: string[];
  notes: string[];
}

export const KIND_LABEL: Record<ProjectKind, string> = {
  web: "Web",
  mobile: "Mobile",
  cli: "CLI",
};

/** Data yang sama untuk semua bahasa. */
interface ProjectBase {
  id: string;
  name: string;
  year: string;
  kind: ProjectKind;
  repo: string;
  shots: string[];
  stack: string[];
}

/** Teks per bahasa. */
interface ProjectText {
  summary: string;
  lead: string;
  features: string[];
  notes: string[];
}

const BASE: ProjectBase[] = [
  {
    id: "matchcast",
    name: "Matchcast",
    year: "2026",
    kind: "web",
    repo: "https://github.com/gilsid/matchcast",
    shots: ["/shots/matchcast/1.webp", "/shots/matchcast/2.webp", "/shots/matchcast/3.webp"],
    stack: [
      "SvelteKit 2",
      "TypeScript",
      "Tailwind CSS 4",
      "shadcn-svelte",
      "Prisma 7",
      "PostgreSQL (Neon)",
      "Vitest",
      "Playwright",
    ],
  },
  {
    id: "novira",
    name: "Novira",
    year: "2026",
    kind: "web",
    repo: "https://github.com/ikn-fti-nasional/novira",
    shots: ["/shots/novira/1.webp", "/shots/novira/2.webp", "/shots/novira/3.webp"],
    stack: [
      "SvelteKit 2",
      "Svelte 5",
      "Tailwind CSS 4",
      "shadcn-svelte",
      "PostgreSQL",
      "Drizzle ORM",
      "Leaflet",
      "Vitest",
      "Playwright",
    ],
  },
  {
    id: "undangan-digital",
    name: "Undangan Digital",
    year: "2026",
    kind: "web",
    repo: "https://github.com/gilsid/undangan-digital",
    shots: [
      "/shots/undangan-digital/1.webp",
      "/shots/undangan-digital/2.webp",
      "/shots/undangan-digital/3.webp",
    ],
    stack: [
      "Next.js 16",
      "TypeScript",
      "Tailwind CSS 4",
      "shadcn/ui",
      "Prisma 7",
      "PostgreSQL",
      "NextAuth v5",
      "Framer Motion",
    ],
  },
  {
    id: "lazyauth",
    name: "LazyAuth",
    year: "2026",
    kind: "cli",
    repo: "https://github.com/gilsid/lazyauth",
    shots: ["/shots/lazyauth.webp"],
    stack: ["Rust", "ratatui", "crossterm", "Argon2id", "AES-256-GCM"],
  },
  {
    id: "plantcare",
    name: "PlantCare",
    year: "2026",
    kind: "mobile",
    repo: "https://github.com/gilsid/plantcare",
    shots: [
      "/shots/plantcare/1.webp",
      "/shots/plantcare/2.webp",
      "/shots/plantcare/3.webp",
      "/shots/plantcare/4.webp",
    ],
    stack: ["Flutter", "Dart", "Provider", "Hive CE", "flutter_local_notifications"],
  },
  {
    id: "nutrilensia",
    name: "Nutrilensia",
    year: "2026",
    kind: "mobile",
    repo: "https://github.com/nutrilensia/Mobile-Ceklabel",
    shots: [
      "/shots/nutrilensia/1.webp",
      "/shots/nutrilensia/2.webp",
      "/shots/nutrilensia/3.webp",
      "/shots/nutrilensia/4.webp",
      "/shots/nutrilensia/5.webp",
      "/shots/nutrilensia/6.webp",
      "/shots/nutrilensia/7.webp",
    ],
    stack: ["Flutter", "Dart"],
  },
];

const TEXT: Record<Locale, Record<string, ProjectText>> = {
  id: {
    matchcast: {
      summary: "Bracket, skor, dan halaman publik untuk turnamen amatir.",
      lead: "Platform untuk penyelenggara turnamen amatir. Penyelenggara membuat bracket dan mencatat skor, penonton membuka hasilnya lewat tautan publik tanpa perlu login.",
      features: [
        "Penyelenggara membuat turnamen, menambah tim, dan menghasilkan bracket.",
        "Halaman publik memperbarui skor otomatis setiap 12 detik, tanpa login.",
        "Pemenang maju ke babak berikutnya secara otomatis.",
      ],
      notes: [
        "Fullstack di SvelteKit, dengan route API sendiri di src/routes/api.",
        "Auth memakai JWT di cookie httpOnly, password di-hash dengan bcryptjs.",
        "Diuji dengan Vitest dan Playwright, dijalankan di GitHub Actions.",
        "Keputusan arsitektur dicatat di docs/adr, aturan kerja untuk agent di AGENTS.md.",
      ],
    },
    novira: {
      summary: "Dashboard kebersihan kota dari 290 CCTV publik Bandung.",
      lead: "Dashboard pemantauan kebersihan kota yang mengubah jaringan CCTV menjadi sensor sampah. Sistem menilai tiap insiden, menjalankan SLA, dan meranking kelurahan.",
      features: [
        "Pemantauan langsung 290 kamera publik Kota Bandung, dengan pemutaran HLS dan MP4.",
        "Skor prioritas 0 sampai 100 dari jenis sampah, durasi, sensitivitas lokasi, dan kekambuhan.",
        "SLA bertahap 12, 24, dan 48 jam, lengkap dengan penugasan petugas lapangan.",
        "Laporan warga anonim dengan kode pelacakan, dan peringkat kebersihan per kelurahan.",
      ],
      notes: [
        "Enam jenis pengguna dengan kontrol akses berbasis peran dan audit log.",
        "Sesi berbasis cookie, password di-hash dengan Argon2id.",
        "Deteksi sampah memakai YOLOv8 sebagai layanan terpisah yang dipanggil lewat API.",
        "Peta memakai Leaflet dan OpenStreetMap, diuji dengan Vitest dan Playwright.",
      ],
    },
    "undangan-digital": {
      summary: "Undangan pernikahan online dengan dashboard per pasangan.",
      lead: "Website untuk membuat dan mengelola undangan pernikahan digital. Setiap pasangan punya dashboard sendiri, dan tamu menerima tautan personal lewat WhatsApp.",
      features: [
        "Empat tema undangan: Elegant, Rustic, Minimalist, dan Foil Blueprint.",
        "Daftar tamu dengan impor CSV sampai 1.000 baris dan tautan personal per tamu.",
        "RSVP dan ucapan tamu, dilindungi pembatasan laju.",
        "Pelacakan pembukaan undangan lewat kode unik, dan superadmin yang bisa menonaktifkan atau menghapus akun.",
      ],
      notes: [
        "Next.js 16 dengan App Router, dibagi per route group untuk halaman publik, pasangan, dan superadmin.",
        "Prisma 7 dengan migrasi yang tercatat di repo.",
        "Penanganan error API terpusat di lib/api-error.ts, plus header keamanan.",
      ],
    },
    lazyauth: {
      summary: "Authenticator TOTP offline yang berjalan di terminal.",
      lead: "Authenticator TOTP di terminal yang tidak membuat koneksi jaringan sama sekali. Kodenya mengikuti RFC 6238, jadi cocok dipakai untuk GitHub, Google, dan AWS.",
      features: [
        "Kode TOTP dengan hitung mundur langsung di antarmuka terminal bertema Gruvbox.",
        "Navigasi keyboard ala vim (hjkl).",
        "Impor akun lewat URI otpauth://, dengan pilihan algoritma, jumlah digit, dan periode.",
      ],
      notes: [
        "Rahasia disimpan di vault terenkripsi lokal dengan Argon2id dan AES-256-GCM.",
        "HMAC-SHA1, SHA256, dan SHA512 ditulis sendiri, diuji dengan vektor uji RFC.",
        "Memori rahasia dibersihkan dengan Zeroizing dan ZeroizeOnDrop.",
        "Dicek dengan clippy dan fmt, mendukung NO_COLOR dan terminal kecil.",
      ],
    },
    plantcare: {
      summary: "Pengingat jadwal siram dan pupuk, tersimpan di perangkat.",
      lead: "Aplikasi perawatan tanaman supaya jadwalnya tidak terlewat. Setiap tanaman dicatat lengkap dengan foto, jenis, lokasi, dan catatan.",
      features: [
        "Jadwal perawatan yang bisa diatur sendiri, termasuk menyiram dan memberi pupuk.",
        "Skor kesehatan otomatis dengan indikator tren, dan notifikasi untuk tugas yang terlambat.",
        "Diari pertumbuhan dengan perbandingan foto sebelum dan sesudah.",
        "Tag, aksi geser, aksi massal, penghitung streak, dan mode gelap.",
      ],
      notes: [
        "Offline-first: data tersimpan di perangkat dengan Hive CE.",
        "State dikelola dengan Provider, notifikasi lokal mengikuti zona waktu perangkat.",
        "Format tanggal mengikuti locale.",
      ],
    },
    nutrilensia: {
      summary: "Scan label nutrisi lewat kamera, hasilnya langsung dinilai.",
      lead: "Aplikasi mobile untuk memindai label nutrisi lewat kamera. Hasilnya tampil langsung sebagai nilai gizi, grade, dan penjelasan.",
      features: [
        "Hasil scan tersimpan di riwayat, bisa dibandingkan antar produk, dan dirangkum dalam laporan mingguan.",
        "Quiz edukasi dan pemantau risiko kesehatan.",
        "Mode keluarga.",
      ],
      notes: [
        "Flutter dan Dart untuk Android dan iOS.",
        "Repo memiliki folder tes dan workflow CI.",
        "Proyek kolaborasi di organisasi nutrilensia.",
      ],
    },
  },
  en: {
    matchcast: {
      summary: "Brackets, scores, and public pages for amateur tournaments.",
      lead: "A platform for amateur tournament organizers. Organizers build brackets and record scores, and spectators follow results through a public link without logging in.",
      features: [
        "Organizers create tournaments, add teams, and generate brackets.",
        "The public page refreshes scores automatically every 12 seconds, no login needed.",
        "Winners advance to the next round automatically.",
      ],
      notes: [
        "Full-stack in SvelteKit, with its own API routes in src/routes/api.",
        "Auth uses a JWT in an httpOnly cookie, and passwords are hashed with bcryptjs.",
        "Tested with Vitest and Playwright, running on GitHub Actions.",
        "Architecture decisions are recorded in docs/adr, and working rules for agents in AGENTS.md.",
      ],
    },
    novira: {
      summary: "A city cleanliness dashboard built on 290 public CCTV cameras in Bandung.",
      lead: "A city cleanliness monitoring dashboard that turns a CCTV network into a litter sensor. The system scores each incident, enforces SLAs, and ranks urban villages (kelurahan).",
      features: [
        "Live monitoring of 290 public cameras in Bandung, with HLS and MP4 playback.",
        "A 0 to 100 priority score based on waste type, duration, location sensitivity, and recurrence.",
        "Tiered 12, 24, and 48 hour SLAs, with field officer assignment.",
        "Anonymous citizen reports with a tracking code, and a cleanliness ranking per kelurahan.",
      ],
      notes: [
        "Six user roles with role-based access control and an audit log.",
        "Cookie-based sessions, with passwords hashed using Argon2id.",
        "Waste detection uses YOLOv8 as a separate service called over an API.",
        "Maps use Leaflet and OpenStreetMap, tested with Vitest and Playwright.",
      ],
    },
    "undangan-digital": {
      summary: "Online wedding invitations with a dashboard for each couple.",
      lead: "A website for creating and managing digital wedding invitations. Each couple gets their own dashboard, and guests receive a personal link through WhatsApp.",
      features: [
        "Four invitation themes: Elegant, Rustic, Minimalist, and Foil Blueprint.",
        "A guest list with CSV import up to 1,000 rows and a personal link for each guest.",
        "RSVPs and guest wishes, protected by rate limiting.",
        "Invitation open tracking through unique codes, and a superadmin who can deactivate or delete accounts.",
      ],
      notes: [
        "Next.js 16 with the App Router, split into route groups for public pages, couples, and superadmin.",
        "Prisma 7 with migrations tracked in the repo.",
        "API error handling is centralized in lib/api-error.ts, plus security headers.",
      ],
    },
    lazyauth: {
      summary: "An offline TOTP authenticator that runs in the terminal.",
      lead: "A terminal TOTP authenticator that makes no network connections at all. Codes follow RFC 6238, so it works with GitHub, Google, and AWS.",
      features: [
        "TOTP codes with a live countdown in a Gruvbox-themed terminal interface.",
        "Vim-style keyboard navigation (hjkl).",
        "Account import through otpauth:// URIs, with a choice of algorithm, digit count, and period.",
      ],
      notes: [
        "Secrets are stored in a local encrypted vault with Argon2id and AES-256-GCM.",
        "HMAC-SHA1, SHA256, and SHA512 are implemented from scratch and tested against RFC test vectors.",
        "Secret memory is wiped with Zeroizing and ZeroizeOnDrop.",
        "Checked with clippy and fmt, and supports NO_COLOR and small terminals.",
      ],
    },
    plantcare: {
      summary: "Watering and fertilizing reminders, stored on the device.",
      lead: "A plant care app so no schedule gets missed. Each plant is recorded with its photo, type, location, and notes.",
      features: [
        "Customizable care schedules, including watering and fertilizing.",
        "An automatic health score with a trend indicator, and notifications for overdue tasks.",
        "A growth diary with before-and-after photo comparison.",
        "Tags, swipe actions, bulk actions, a streak counter, and dark mode.",
      ],
      notes: [
        "Offline-first: data is stored on the device with Hive CE.",
        "State is managed with Provider, and local notifications follow the device time zone.",
        "Date formats follow the locale.",
      ],
    },
    nutrilensia: {
      summary: "Scan nutrition labels with the camera and get an instant rating.",
      lead: "A mobile app that scans nutrition labels through the camera. Results appear right away as nutrition values, a grade, and an explanation.",
      features: [
        "Scan results are saved to a history, can be compared across products, and are summarized in a weekly report.",
        "An educational quiz and a health risk monitor.",
        "Family mode.",
      ],
      notes: [
        "Flutter and Dart for Android and iOS.",
        "The repo has a test folder and a CI workflow.",
        "A collaborative project in the nutrilensia organization.",
      ],
    },
  },
};

export interface LinkItem {
  name: string;
  href: string;
  desc: string;
}

const OTHER: Record<Locale, LinkItem[]> = {
  id: [
    {
      name: "namid",
      href: "https://github.com/gilsid/namid",
      desc: "Tool rename file massal berbasis Rust, dengan mode TUI, dry-run, dan undo.",
    },
    {
      name: "BookingKu",
      href: "https://github.com/gilsid/bookingku",
      desc: "Aplikasi booking lapangan futsal dengan Flutter. Datanya masih simulasi.",
    },
    {
      name: "Perpustakaan Digital",
      href: "https://github.com/gilsid/Perpustakaan-Digital",
      desc: "Perpustakaan online dengan PHP, proyek belajar.",
    },
  ],
  en: [
    {
      name: "namid",
      href: "https://github.com/gilsid/namid",
      desc: "A Rust bulk file renamer with a TUI mode, dry-run, and undo.",
    },
    {
      name: "BookingKu",
      href: "https://github.com/gilsid/bookingku",
      desc: "A futsal court booking app in Flutter. The data is still simulated.",
    },
    {
      name: "Perpustakaan Digital",
      href: "https://github.com/gilsid/Perpustakaan-Digital",
      desc: "An online library in PHP, a learning project.",
    },
  ],
};

const DOTFILES: Record<Locale, LinkItem[]> = {
  id: [
    {
      name: "new-dotfiles",
      href: "https://github.com/gilsid/new-dotfiles",
      desc: "Dotfiles untuk desktop Linux.",
    },
    {
      name: "waybar",
      href: "https://github.com/gilsid/waybar",
      desc: "Konfigurasi status bar.",
    },
    {
      name: "rofi",
      href: "https://github.com/gilsid/rofi",
      desc: "Konfigurasi peluncur aplikasi.",
    },
  ],
  en: [
    {
      name: "new-dotfiles",
      href: "https://github.com/gilsid/new-dotfiles",
      desc: "Dotfiles for my Linux desktop.",
    },
    {
      name: "waybar",
      href: "https://github.com/gilsid/waybar",
      desc: "Status bar configuration.",
    },
    {
      name: "rofi",
      href: "https://github.com/gilsid/rofi",
      desc: "Application launcher configuration.",
    },
  ],
};

export const PROJECT_IDS = BASE.map((p) => p.id);

export function getProjects(locale: Locale): Project[] {
  return BASE.map((b) => ({ ...b, ...TEXT[locale][b.id] }));
}

export function getProject(locale: Locale, id: string): Project | undefined {
  return getProjects(locale).find((p) => p.id === id);
}

export function getPrevNext(
  locale: Locale,
  id: string
): { prev: Project; next: Project } {
  const list = getProjects(locale);
  const idx = Math.max(
    0,
    list.findIndex((p) => p.id === id)
  );
  return {
    prev: list[(idx + list.length - 1) % list.length],
    next: list[(idx + 1) % list.length],
  };
}

export function getOtherProjects(locale: Locale): LinkItem[] {
  return OTHER[locale];
}

export function getDotfiles(locale: Locale): LinkItem[] {
  return DOTFILES[locale];
}
