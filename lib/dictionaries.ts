import type { Locale } from "./i18n";
import { SEMESTER } from "./site";

/** Semua teks antarmuka. Hanya data biasa, jadi aman dikirim ke client component. */
export interface Dictionary {
  meta: {
    title: string;
    template: string;
    description: string;
    shortDescription: string;
    ogLocale: string;
    og: { status: string; headline: string; stack: string };
  };
  ui: {
    skip: string;
    nav: {
      label: string;
      projects: string;
      about: string;
      github: string;
      themeLabel: string;
      dark: string;
      light: string;
      languageLabel: string;
    };
    hero: {
      status: string;
      title: string;
      lede: string;
      facts: { badge: string; text: string }[];
      contact: string;
    };
    home: {
      projects: string;
      filterLabel: string;
      filters: { all: string; web: string; mobile: string; cli: string };
      previewLabel: string;
      openDetail: string;
      other: string;
      dotfiles: string;
    };
    detail: {
      back: string;
      stack: string;
      features: string;
      notes: string;
      repo: string;
      previous: string;
      next: string;
      navLabel: string;
      shotAlt: string;
    };
    footer: {
      navigation: string;
      contact: string;
      downloadCv: string;
      status: string;
      statusLine: string;
      statusNote: string;
      backToTop: string;
    };
    notFound: { title: string; text: string; link: string; heading: string };
  };
  about: {
    metaTitle: string;
    metaDescription: string;
    label: string;
    title: string;
    summary: { label: string; paragraphs: string[] };
    ai: { label: string; paragraphs: string[] };
    education: {
      label: string;
      degree: string;
      period: string;
    };
    skills: { label: string; items: { label: string; value: string }[] };
    achievements: { label: string; items: { text: string; year: string }[] };
    certifications: { label: string; items: { text: string; year: string }[] };
  };
}

const id: Dictionary = {
  meta: {
    title: "Gilang Nur Akbar | Portofolio",
    template: "%s | Gilang Nur Akbar",
    description: `Portofolio Gilang Nur Akbar: aplikasi web dan mobile, dibangun bersama AI agent. Mahasiswa TI semester ${SEMESTER}, terbuka untuk magang.`,
    shortDescription:
      "Aplikasi web dan mobile, dibangun bersama AI agent. Terbuka untuk magang.",
    ogLocale: "id_ID",
    og: {
      status: "Terbuka untuk magang · Kabupaten Bekasi",
      headline: "Aplikasi web dan mobile, dibangun bersama AI agent.",
      stack: "Next.js · SvelteKit · Flutter",
    },
  },
  ui: {
    skip: "Lewati ke konten",
    nav: {
      label: "Navigasi utama",
      projects: "Proyek",
      about: "Tentang",
      github: "GitHub",
      themeLabel: "Mode gelap",
      dark: "Gelap",
      light: "Terang",
      languageLabel: "Bahasa",
    },
    hero: {
      status: "Terbuka untuk magang · Kabupaten Bekasi",
      title: "Aplikasi web dan mobile, dibangun bersama AI agent.",
      contact: "Hubungi saya",
      lede: `Saya Gilang, mahasiswa Teknologi Informasi semester ${SEMESTER}. Saya memakai Claude Code, Opencode, T3Code, dan Antigravity untuk mempercepat coding, dan mencari tim magang yang bekerja dengan cara yang sama.`,
      facts: [
        {
          badge: "Juara 1",
          text: "Web & Mobile Application Showcase, 2026",
        },
        {
          badge: "Juara 2",
          text: "Lomba Web Development FTI Festival, 2026",
        },
      ],
    },
    home: {
      projects: "Proyek",
      filterLabel: "Filter proyek",
      filters: { all: "Semua", web: "Web", mobile: "Mobile", cli: "CLI" },
      previewLabel: "Pratinjau proyek",
      openDetail: "Buka detail →",
      other: "Proyek lain",
      dotfiles: "Linux dan konfigurasi",
    },
    detail: {
      back: "← Semua proyek",
      stack: "Stack",
      features: "Fitur utama",
      notes: "Catatan teknis",
      repo: "Kode di GitHub ↗",
      previous: "← Sebelumnya",
      next: "Berikutnya →",
      navLabel: "Navigasi proyek",
      shotAlt: "Screenshot",
    },
    footer: {
      navigation: "Navigasi",
      contact: "Kontak",
      downloadCv: "Unduh CV (PDF)",
      status: "Status",
      statusLine: "Terbuka untuk magang",
      statusNote: "Terutama frontend dan pengembangan web.",
      backToTop: "↑ Kembali ke atas",
    },
    notFound: {
      title: "Halaman tidak ditemukan",
      heading: "Halaman ini tidak ada.",
      text: "Tautannya mungkin salah ketik, atau proyeknya sudah dipindahkan.",
      link: "Kembali ke daftar proyek →",
    },
  },
  about: {
    metaTitle: "Tentang",
    metaDescription:
      "Tentang Gilang Nur Akbar: mahasiswa TI yang belajar dengan membangun produk, memakai AI agent, Next.js, SvelteKit, dan Flutter.",
    label: "Tentang",
    title: "Mahasiswa TI yang belajar dengan membangun produk.",
    summary: {
      label: "Ringkasan",
      paragraphs: [
        "Fokus saya di pengembangan web modern dengan Next.js dan SvelteKit, ditambah aplikasi mobile dengan Flutter. Proyek-proyek saya semuanya punya kode publik di GitHub.",
        "Saya mencari magang di perusahaan yang sudah menerapkan AI-assisted development dalam proses pengembangan produknya.",
      ],
    },
    ai: {
      label: "AI-assisted development",
      paragraphs: [
        "Saya mengembangkan aplikasi dengan bantuan AI agent: Claude Code, Opencode, T3Code, dan Antigravity.",
        "Pendekatan ini terdokumentasi di repo publik. Matchcast dan LazyAuth memuat AGENTS.md sebagai panduan proyek untuk agent, Matchcast mencatat keputusan arsitektur di docs/adr, dan kodenya diuji dengan Vitest dan Playwright yang berjalan di GitHub Actions.",
      ],
    },
    education: {
      label: "Pendidikan",
      degree:
        "S1 Teknologi Informasi, Universitas Bina Sarana Informatika, kampus Cikarang.",
      period: `2024 – 2028 · Semester ${SEMESTER} · IPK 3,93 dari 4,00`,
    },
    skills: {
      label: "Skill",
      items: [
        { label: "Bahasa", value: "HTML, CSS, PHP, JavaScript, TypeScript, Dart, Rust" },
        { label: "Framework", value: "Next.js, SvelteKit, Flutter, Tailwind CSS" },
        { label: "Basis data", value: "PostgreSQL, MySQL, Prisma, Drizzle" },
        { label: "Pengujian", value: "Vitest, Playwright" },
        { label: "Tools", value: "Git, GitHub, Emacs" },
        { label: "AI agent", value: "Claude Code, Opencode, T3Code, Antigravity" },
      ],
    },
    achievements: {
      label: "Prestasi",
      items: [
        { text: "Juara 1, Web & Mobile Application Showcase", year: "2026" },
        { text: "Juara 2, Lomba Web Development, FTI Festival", year: "2026" },
      ],
    },
    certifications: {
      label: "Sertifikasi",
      items: [
        { text: "Uji Kompetensi Berbasis Industri, Sistem Basis Data", year: "2026" },
        { text: "Webinar Nasional Cyber Security, FTI Festival", year: "2026" },
        { text: "Seminar & Workshop Software Engineer", year: "2024" },
      ],
    },
  },
};

const en: Dictionary = {
  meta: {
    title: "Gilang Nur Akbar | Portfolio",
    template: "%s | Gilang Nur Akbar",
    description: `Portfolio of Gilang Nur Akbar: web and mobile apps built with AI agents. Semester ${SEMESTER} Information Technology student, open to internships.`,
    shortDescription:
      "Web and mobile apps built with AI agents. Open to internships.",
    ogLocale: "en_US",
    og: {
      status: "Open to internships · Bekasi Regency, Indonesia",
      headline: "Web and mobile apps, built with AI agents.",
      stack: "Next.js · SvelteKit · Flutter",
    },
  },
  ui: {
    skip: "Skip to content",
    nav: {
      label: "Main navigation",
      projects: "Projects",
      about: "About",
      github: "GitHub",
      themeLabel: "Dark mode",
      dark: "Dark",
      light: "Light",
      languageLabel: "Language",
    },
    hero: {
      status: "Open to internships · Bekasi Regency, Indonesia",
      title: "Web and mobile apps, built with AI agents.",
      contact: "Get in touch",
      lede: `I'm Gilang, a semester ${SEMESTER} Information Technology student. I use Claude Code, Opencode, T3Code, and Antigravity to speed up development, and I'm looking for an internship on a team that works the same way.`,
      facts: [
        {
          badge: "1st place",
          text: "Web & Mobile Application Showcase, 2026",
        },
        {
          badge: "2nd place",
          text: "Web Development Competition, FTI Festival, 2026",
        },
      ],
    },
    home: {
      projects: "Projects",
      filterLabel: "Filter projects",
      filters: { all: "All", web: "Web", mobile: "Mobile", cli: "CLI" },
      previewLabel: "Project preview",
      openDetail: "View details →",
      other: "Other projects",
      dotfiles: "Linux and configuration",
    },
    detail: {
      back: "← All projects",
      stack: "Stack",
      features: "Key features",
      notes: "Technical notes",
      repo: "Code on GitHub ↗",
      previous: "← Previous",
      next: "Next →",
      navLabel: "Project navigation",
      shotAlt: "Screenshot of",
    },
    footer: {
      navigation: "Navigation",
      contact: "Contact",
      downloadCv: "Download CV (PDF)",
      status: "Status",
      statusLine: "Open to internships",
      statusNote: "Mainly frontend and web development.",
      backToTop: "↑ Back to top",
    },
    notFound: {
      title: "Page not found",
      heading: "This page doesn't exist.",
      text: "The link may be mistyped, or the project may have moved.",
      link: "Back to the project list →",
    },
  },
  about: {
    metaTitle: "About",
    metaDescription:
      "About Gilang Nur Akbar: an IT student who learns by building products with AI agents, Next.js, SvelteKit, and Flutter.",
    label: "About",
    title: "An IT student who learns by building products.",
    summary: {
      label: "Summary",
      paragraphs: [
        "I focus on modern web development with Next.js and SvelteKit, plus mobile apps with Flutter. All of my projects have public code on GitHub.",
        "I'm looking for an internship at a company that already uses AI-assisted development in its product workflow.",
      ],
    },
    ai: {
      label: "AI-assisted development",
      paragraphs: [
        "I build applications with the help of AI agents: Claude Code, Opencode, T3Code, and Antigravity.",
        "This approach is documented in my public repositories. Matchcast and LazyAuth include an AGENTS.md as project guidance for agents, Matchcast records its architecture decisions in docs/adr, and its code is tested with Vitest and Playwright running on GitHub Actions.",
      ],
    },
    education: {
      label: "Education",
      degree:
        "B.Sc. in Information Technology, Universitas Bina Sarana Informatika, Cikarang campus.",
      period: `2024 – 2028 · Semester ${SEMESTER} · GPA 3.93 / 4.00`,
    },
    skills: {
      label: "Skills",
      items: [
        { label: "Languages", value: "HTML, CSS, PHP, JavaScript, TypeScript, Dart, Rust" },
        { label: "Frameworks", value: "Next.js, SvelteKit, Flutter, Tailwind CSS" },
        { label: "Databases", value: "PostgreSQL, MySQL, Prisma, Drizzle" },
        { label: "Testing", value: "Vitest, Playwright" },
        { label: "Tools", value: "Git, GitHub, Emacs" },
        { label: "AI agents", value: "Claude Code, Opencode, T3Code, Antigravity" },
      ],
    },
    achievements: {
      label: "Achievements",
      items: [
        { text: "1st place, Web & Mobile Application Showcase", year: "2026" },
        { text: "2nd place, Web Development Competition, FTI Festival", year: "2026" },
      ],
    },
    certifications: {
      label: "Certifications",
      items: [
        { text: "Industry-Based Competency Test, Database Systems", year: "2026" },
        { text: "National Cyber Security Webinar, FTI Festival", year: "2026" },
        { text: "Software Engineer Seminar & Workshop", year: "2024" },
      ],
    },
  },
};

const DICTIONARIES: Record<Locale, Dictionary> = { id, en };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}
