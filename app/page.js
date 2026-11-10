'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Rocket, Shield, ExternalLink, RotateCcw, Maximize2, Minimize2,
  BookOpen, Zap, Search, Award, ChevronRight, ChevronLeft, GraduationCap,
  DollarSign, Wallet, ShieldCheck, Trophy, RefreshCw, Info,
  Check, X, Sparkles, Lightbulb, Play, Tv, Download, Pause
} from 'lucide-react';

// Data Games Showcase (IPS Literasi Finansial & Pengenalan Rupiah)
const GAMES = {
  space: {
    key: 'space',
    title: 'Aerostrike: Galactic Dogfight (IPS Finansial)',
    desc: 'Arcade Space Combat & Dogfight Quiz Multi-Touch Simultan 2-4 Tim Siswa SMP dengan 20 Soal HOTS IPS Literasi Finansial & Pengenalan Rupiah.',
    file: '/space_shooter.html',
    badge: 'VECTOR DOGFIGHT',
    teamBadge: 'MULTI-TOUCH 2–4 TIM',
    category: 'IPS & Finansial'
  },
  zombie: {
    key: 'zombie',
    title: 'Zombie Outbreak: Tactical Defense (IPS Finansial)',
    desc: 'Arcade Zombie Base Defense & Tactical Quiz Multi-Touch Simultan 2-4 Tim dengan 20 Soal HOTS Baru IPS Literasi Finansial & Pengenalan Rupiah.',
    file: '/zombie_defense.html',
    badge: 'SURVIVAL BARRICADE',
    teamBadge: 'MULTI-TOUCH 2–4 TIM',
    category: 'IPS & Finansial'
  },
  runner: {
    key: 'runner',
    title: 'Finance Run: Squad Escape (IPS Literasi Keuangan)',
    desc: 'Endless Runner Quiz Multi-Touch Simultan 2-4 Tim Siswa SMP Kelas 9 dengan Light Mode Theme & 40 Soal HOTS IPS Literasi Keuangan.',
    file: '/runner_game.html',
    badge: 'ENDLESS RUNNER 🏃',
    teamBadge: 'MULTI-TOUCH 2–4 TIM',
    category: 'IPS & Finansial'
  }
};

// Data Slide Presentasi Modul CBP External (22 Slide HD)
const SLIDES_LIST = Array.from({ length: 22 }, (_, idx) => {
  const slideNum = String(idx + 1).padStart(2, '0');
  return {
    id: idx + 1,
    title: `Slide ${idx + 1}: Modul CBP Rupiah`,
    image: `/slides/slide_${slideNum}.png`
  };
});

// Data Modul Materi Pembelajaran IPS Literasi Finansial
const MATERI_LIST = [
  {
    id: 'm1',
    category: 'Rupiah & Keaslian',
    title: 'Pengenalan & Ciri Keaslian Uang Rupiah TE 2022',
    icon: DollarSign,
    color: '#38BDF8',
    summary: 'Memahami metode 3D (Dilihat, Diraba, Diterawang), unsur pengaman canggih, dan fitur aksesibilitas penyandang tunanetra.',
    details: {
      poin: [
        { title: 'Metode 3D (Dilihat)', desc: 'Gambar pahlawan nasional, warna cerah kontras, benang pengaman (security thread) yang berubah warna saat dimiringkan, dan Rectoverso (logo BI saling isi).' },
        { title: 'Metode 3D (Diraba)', desc: 'Cetakan Intaglio menghasilkan tekstur kasar pada gambar pahlawan, angka nominal, lambang garuda, serta Kode Tunanetra (Tactile Code) di tepi kanan-kiri.' },
        { title: 'Metode 3D (Diterawang)', desc: 'Tanda Air (Watermark) dan Electrotype berupa gambar pahlawan dan ornamen terlihat jelas saat dihadapkan pada cahaya.' },
        { title: 'Inovasi Selisih Ukuran TE 2022', desc: 'Setiap pecahan uang kertas baru memiliki selisih panjang 5 mm. Semakin kecil nilai nominal, semakin pendek ukuran fisiknya untuk membantu kawan difabel netra.' }
      ],
      tips: 'Selalu ingat 3D sebelum menerima uang kembalian untuk terhindar dari peredaran uang palsu!',
      ref: 'UU No. 7 Tahun 2011 tentang Mata Uang & Kebijakan Bank Indonesia'
    }
  },
  {
    id: 'm2',
    category: 'Literasi Finansial',
    title: 'Manajemen Keuangan & Anggaran 50/30/20',
    icon: Wallet,
    color: '#F59E0B',
    summary: 'Panduan pembagian pendapatan pribadi secara rasional untuk kebutuhan esensial, keinginan, dan tabungan masa depan.',
    details: {
      poin: [
        { title: '50% Kebutuhan Pokok (Needs)', desc: 'Alokasi wajib untuk kelangsungan hidup: makanan gizi seimbang, tempat tinggal, transportasi sekolah/kerja, serta tagihan listrik & air.' },
        { title: '30% Keinginan (Wants)', desc: 'Alokasi opsional untuk kualitas hidup & hiburan: hobi, rekreasi, langganan media, dan belanja barang non-esensial.' },
        { title: '20% Tabungan & Investasi (Savings)', desc: 'Alokasi dana darurat (emergency fund), tabungan pendidikan, dan investasi instrumen resmi untuk menghadapi inflasi.' },
        { title: 'Memahami Inflasi & Daya Beli', desc: 'Penurunan nilai tukar riil uang seiring kenaikan harga barang umum. Tabungan & investasi bijak membantu menjaga nilai riil Rupiah.' }
      ],
      tips: 'Dahulukan Kebutuhan (Needs) di atas Keinginan (Wants) untuk terhindar dari perilaku konsumtif berlebihan!',
      ref: 'Materi Literasi Keuangan SMP Kurikulum Merdeka - Fase D'
    }
  },
  {
    id: 'm3',
    category: 'QRIS & Nontunai',
    title: 'Sistem Pembayaran Digital & QRIS',
    icon: Zap,
    color: '#10B981',
    summary: 'Transformasi transaksi dari uang kartal fisik menuju pembayaran digital aman, cepat, dan efisien dengan standar QRIS.',
    details: {
      poin: [
        { title: 'Apa itu QRIS?', desc: 'Quick Response Code Indonesian Standard yang diluncurkan Bank Indonesia & ASPI untuk menyatukan seluruh pembayaran berbasis QR Code di Indonesia.' },
        { title: 'Manfaat bagi Konsumen', desc: 'Praktis tanpa membawa uang tunai banyak, terhindar dari risiko uang palsu, kembalian pas, dan riwayat transaksi tercatat otomatis.' },
        { title: 'Manfaat bagi UMKM', desc: 'Memudahkan rekapitulasi keuangan harian, membangun credit scoring untuk akses perbankan, dan mencegah pencurian uang tunai.' },
        { title: 'Uang Kartal vs Uang Giral vs Digital', desc: 'Uang kartal (kertas/logam), uang giral (cek/bilyet giro), uang digital/elektronik (saldo e-wallet/m-banking).' }
      ],
      tips: 'Pastikan selalu mengecek nama merchant/toko yang tertera di layar sebelum memasukkan PIN QRIS!',
      ref: 'Standar Nasional Pembayaran Digital - Bank Indonesia'
    }
  },
  {
    id: 'm4',
    category: 'OJK & Investasi',
    title: 'Legalitas Investasi & Perlindungan Konsumen OJK',
    icon: ShieldCheck,
    color: '#A855F7',
    summary: 'Mengenal peran OJK serta prinsip 2L (Legal & Logis) untuk membentengi diri dari kejahatan keuangan dan skema Ponzi.',
    details: {
      poin: [
        { title: 'Peran Utama OJK', desc: 'Otoritas Jasa Keuangan bertugas mengatur, mengawasi, dan melindungi konsumen di sektor perbankan, pasar modal, industri keuangan non-bank, dan fintech.' },
        { title: 'Prinsip 2L (Legal)', desc: 'Cek apakah lembaga atau produk keuangan memiliki izin resmi dari OJK melalui Kontak OJK 157, Whatsapp 081-157-157-157, atau situs ojk.go.id.' },
        { title: 'Prinsip 2L (Logis)', desc: 'Evaluasi rasionalitas imbal hasil yang ditawarkan. Jika menawarkan keuntungan tinggi tanpa risiko sama sekali, hampir dipastikan penipuan.' },
        { title: 'Bahaya Skema Ponzi', desc: 'Penipuan investasi bodong di mana imbal hasil investor lama dibayar dari uang pendaftaran investor baru, bukan dari kegiatan bisnis riil.' }
      ],
      tips: 'Ingat! High Return = High Risk. Jangan tergiur klaim investasi tanpa risiko!',
      ref: 'Satgas Pasti (Pemberantasan Aktivitas Keuangan Ilegal) OJK'
    }
  },
  {
    id: 'm5',
    category: 'Cinta Bangga Paham Rupiah',
    title: 'Gerakan Cinta, Bangga, Paham Rupiah (CBP)',
    icon: Award,
    color: '#F43F5E',
    summary: 'Penguatan nilai kedaulatan bangsa melalui perlakuan bijak terhadap Rupiah sebagai simbol negara Indonesia.',
    details: {
      poin: [
        { title: 'Cinta Rupiah (Mengenali & Merawat)', desc: 'Mengenali ciri keaslian dan merawat fisik Rupiah dengan prinsip 5 Jangan: Jangan Dilipat, Jangan Diremas, Jangan Dicoret, Jangan Dibasahi, Jangan Distapler.' },
        { title: 'Bangga Rupiah (Simbol Kedaulatan)', desc: 'Bangga menggunakan Rupiah sebagai satu-satunya alat pembayaran yang sah di seluruh wilayah NKRI sesuai UU No. 7 Tahun 2011.' },
        { title: 'Paham Rupiah (Bijak Transaksi)', desc: 'Memahami fungsi Rupiah dalam perekonomian: bertransaksi secara bijak, berbelanja sesuai kebutuhan, serta rutin menabung & berinvestasi.' }
      ],
      tips: 'Merawat Rupiah berarti menjaga kehormatan simbol kedaulatan Negara Kesatuan Republik Indonesia!',
      ref: 'Edukasi Kebijakan Rupiah - Bank Indonesia'
    }
  }
];

// Data Kuis Flashcard HOTS IPS Literasi Finansial
const QUIZ_QUESTIONS = [
  {
    id: 1,
    topic: 'Ciri Keaslian Rupiah',
    level: 'HOTS (C4 Analisis)',
    question: 'Kasir toko menerima uang kertas Rupiah emisi baru. Saat memverifikasi dengan teknik 3D (Diraba), kasir merasakan adanya tekstur garis-garis kasar khusus di bagian tepi kanan dan kiri. Fitur tersebut dirancang khusus oleh Bank Indonesia dengan tujuan...',
    options: [
      { letter: 'A', text: 'Meningkatkan estetika seni lukis gambar pahlawan pada kertas uang.' },
      { letter: 'B', text: 'Memberikan penanda khusus (Tactile Code) bagi penyandang tunanetra.' },
      { letter: 'C', text: 'Menandakan bahwa uang tersebut dicetak menggunakan tinta emas murni.' },
      { letter: 'D', text: 'Menghasilkan bunyi khusus saat uang dikibas-kibaskan di udara.' }
    ],
    correct: 'B',
    explanation: 'Tekstur garis timbul pada bagian tepi uang kertas TE 2022 adalah Tactile Code (Kode Tunanetra) yang dicetak dengan teknik cetak intaglio agar penyandang disabilitas netra dapat mengenali pecahan uang dengan diraba.'
  },
  {
    id: 2,
    topic: 'Sistem Pembayaran QRIS',
    level: 'HOTS (C5 Evaluasi)',
    question: 'Sebuah UMKM kuliner beralih dari pembayaran tunai ke sistem QRIS. Setelah 3 bulan, pemilik toko mencatat rekapitulasi penjualan menjadi jauh lebih tertata dan terhindar dari kerugian akibat uang kembalian yang kurang. Evaluasi terbaik mengenai dampak penggunaan QRIS adalah...',
    options: [
      { letter: 'A', text: 'QRIS menaikkan harga jual barang secara otomatis dua kali lipat.' },
      { letter: 'B', text: 'QRIS meningkatkan efisiensi operasional dan membantu membangun pencatatan transaksi yang transparan.' },
      { letter: 'C', text: 'QRIS mewajibkan pembeli untuk memiliki rekening bank luar negeri.' },
      { letter: 'D', text: 'QRIS menghilangkan kebutuhan jaringan internet bagi pedagang dan pembeli.' }
    ],
    correct: 'B',
    explanation: 'QRIS memberikan keuntungan transparansi pencatatan transaksi otomatis, mencegah uang kembalian tidak pas/uang palsu, serta membangun riwayat keuangan (credit scoring) UMKM.'
  },
  {
    id: 3,
    topic: 'Manajemen Keuangan 50/30/20',
    level: 'HOTS (C6 Kreasi)',
    question: 'Andi menerima uang saku bulanan sebesar Rp 500.000. Jika Andi menerapkan formula manajemen keuangan rasional 50/30/20, berapakah jumlah alokasi dana maksimal yang seharusnya dia gunakan khusus untuk hobi dan hiburan (Keinginan)?',
    options: [
      { letter: 'A', text: 'Rp 250.000 (50%)' },
      { letter: 'B', text: 'Rp 150.000 (30%)' },
      { letter: 'C', text: 'Rp 100.000 (20%)' },
      { letter: 'D', text: 'Rp 50.000 (10%)' }
    ],
    correct: 'B',
    explanation: 'Dalam aturan 50/30/20: 50% untuk Kebutuhan Pokok (Rp250.000), 30% untuk Keinginan/Hiburan (30% x Rp500.000 = Rp150.000), dan 20% untuk Tabungan (Rp100.000).'
  },
  {
    id: 4,
    topic: 'Legalitas Investasi OJK',
    level: 'HOTS (C5 Evaluasi)',
    question: 'Rina ditawari investasi online yang menjanjikan keuntungan pasti 50% setiap bulan tanpa risiko rugi, serta wajib merekrut 3 anggota baru untuk cair. Berdasarkan prinsip OJK, investasi tersebut dikategorikan sebagai...',
    options: [
      { letter: 'A', text: 'Investasi Legal karena menjanjikan persentase keuntungan yang terukur.' },
      { letter: 'B', text: 'Investasi Bodong Skema Ponzi karena tidak logis dan bergantung pada perekrutan anggota baru.' },
      { letter: 'C', text: 'Surat Berharga Negara (SBN) yang dijamin penuh oleh Bank Indonesia.' },
      { letter: 'D', text: 'Produk tabungan emas berjangka berizin resmi OJK.' }
    ],
    correct: 'B',
    explanation: 'Skema Ponzi ditandai dengan janji untung besar tanpa risiko (tidak logis) dan kewajiban merekrut anggota baru untuk membayar keuntungan anggota lama.'
  },
  {
    id: 5,
    topic: 'Cinta Bangga Paham Rupiah',
    level: 'HOTS (C4 Analisis)',
    question: 'Di sebuah destinasi wisata lokal, pengelola mewajibkan wisatawan membayar tiket menggunakan mata uang asing dan menolak Rupiah. Berdasarkan UU No. 7 Tahun 2011 tentang Mata Uang, tindakan pengelola tersebut...',
    options: [
      { letter: 'A', text: 'Dibenarkan demi meningkatkan pendapatan devisa sektor pariwisata.' },
      { letter: 'B', text: 'Melanggar hukum karena menolak Rupiah sebagai alat pembayaran sah di wilayah NKRI.' },
      { letter: 'C', text: 'Sah selama disepakati bersama oleh pengelola dan wisatawan.' },
      { letter: 'D', text: 'Boleh dilakukan khusus untuk transaksi di atas Rp 10.000.000.' }
    ],
    correct: 'B',
    explanation: 'Sesuai UU No. 7 Tahun 2011 tentang Mata Uang, Rupiah adalah satu-satunya alat pembayaran yang sah di seluruh Wilayah NKRI dan wajib digunakan dalam setiap transaksi.'
  }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('game'); // 'game' | 'slide' | 'materi' | 'kuis' | 'panduan'
  const [activeGameKey, setActiveGameKey] = useState('space');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedMateriCategory, setSelectedMateriCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [materiModal, setMateriModal] = useState(null);

  // State Presentation Slide Deck Viewer
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const slideContainerRef = useRef(null);

  // State Kuis Interaktif
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const iframeRef = useRef(null);
  const containerRef = useRef(null);

  const currentGame = GAMES[activeGameKey];

  const handleSwitchGame = (key) => {
    setActiveGameKey(key);
    setActiveTab('game');
  };

  const reloadGame = () => {
    if (iframeRef.current) {
      iframeRef.current.src = currentGame.file;
    }
  };

  const toggleFullscreen = () => {
    const elem = containerRef.current;
    if (!elem) return;
    if (!document.fullscreenElement) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const toggleSlideFullscreen = () => {
    const elem = slideContainerRef.current;
    if (!elem) return;
    if (!document.fullscreenElement) {
      if (elem.requestFullscreen) elem.requestFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Slide AutoPlay interval
  useEffect(() => {
    let timer = null;
    if (isAutoPlay && activeTab === 'slide') {
      timer = setInterval(() => {
        setCurrentSlideIndex(prev => (prev + 1) % SLIDES_LIST.length);
      }, 5000);
    }
    return () => { if (timer) clearInterval(timer); };
  }, [isAutoPlay, activeTab]);

  // Filter Materi IPS
  const materiCategories = ['Semua', 'Rupiah & Keaslian', 'Literasi Finansial', 'QRIS & Nontunai', 'OJK & Investasi', 'Cinta Bangga Paham Rupiah'];

  const filteredMateri = MATERI_LIST.filter(item => {
    const matchCategory = selectedMateriCategory === 'Semua' || item.category === selectedMateriCategory;
    const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  // Handler Kuis
  const handleSelectQuizOption = (letter) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(letter);
    setShowExplanation(true);
    if (letter === QUIZ_QUESTIONS[quizIndex].correct) {
      setScore(prev => prev + 20);
    }
  };

  const handleNextQuiz = () => {
    if (quizIndex < QUIZ_QUESTIONS.length - 1) {
      setQuizIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleResetQuiz = () => {
    setQuizIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowExplanation(false);
    setQuizFinished(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header Utama */}
      <header className="site-header">
        <div className="header-inner">
          <div className="brand-group">
            <div className="brand-logo">🪙</div>
            <div>
              <div className="brand-title">IFP Intan — Media Pembelajaran Interaktif IPS</div>
              <div className="brand-sub">Mata Pelajaran IPS Literasi Finansial &amp; Pengenalan Rupiah TE 2022 • IFP 4K Touchscreen</div>
            </div>
          </div>

          {/* Navigation Utama */}
          <nav className="nav-tabs">
            <button
              type="button"
              className={`tab-btn ${activeTab === 'game' ? 'active' : ''}`}
              onClick={() => setActiveTab('game')}
            >
              <Rocket size={16} />
              <span>Game Interaktif</span>
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'slide' ? 'active' : ''}`}
              onClick={() => setActiveTab('slide')}
            >
              <Tv size={16} />
              <span>Slide Presentasi CBP</span>
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'materi' ? 'active' : ''}`}
              onClick={() => setActiveTab('materi')}
            >
              <BookOpen size={16} />
              <span>Modul Materi</span>
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'kuis' ? 'active' : ''}`}
              onClick={() => setActiveTab('kuis')}
            >
              <Award size={16} />
              <span>Latihan Kuis HOTS</span>
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'panduan' ? 'active' : ''}`}
              onClick={() => setActiveTab('panduan')}
            >
              <GraduationCap size={16} />
              <span>Panduan IFP</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Content Area berdasarkan Active Tab */}
      <main className="main-container">

        {/* ================= SECTION 1: GAME INTERAKTIF ================= */}
        {activeTab === 'game' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* 3 Showcase Cards */}
            <div className="showcase-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
              {/* Card 1: Space Shooter */}
              <div
                className={`showcase-card ${activeGameKey === 'space' ? 'active' : ''}`}
                onClick={() => handleSwitchGame('space')}
              >
                <div className="card-head">
                  <div className="card-icon-box card-icon-space">
                    <Rocket size={28} />
                  </div>
                  <span className="card-chip chip-space">{GAMES.space.badge}</span>
                </div>
                <div>
                  <h3 className="card-title">{GAMES.space.title}</h3>
                  <p className="card-desc">{GAMES.space.desc}</p>
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: 'auto', flexWrap: 'wrap' }}>
                  <span className="card-chip chip-space">IPS Kelas 7-9 SMP</span>
                  <span className="card-chip chip-space">20 Soal HOTS</span>
                  <span className="card-chip chip-space">{GAMES.space.teamBadge}</span>
                </div>
              </div>

              {/* Card 2: Zombie Defense */}
              <div
                className={`showcase-card ${activeGameKey === 'zombie' ? 'active' : ''}`}
                onClick={() => handleSwitchGame('zombie')}
              >
                <div className="card-head">
                  <div className="card-icon-box card-icon-treasure">
                    <Shield size={28} />
                  </div>
                  <span className="card-chip chip-treasure">{GAMES.zombie.badge}</span>
                </div>
                <div>
                  <h3 className="card-title">{GAMES.zombie.title}</h3>
                  <p className="card-desc">{GAMES.zombie.desc}</p>
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: 'auto', flexWrap: 'wrap' }}>
                  <span className="card-chip chip-treasure">IPS Kelas 7-9 SMP</span>
                  <span className="card-chip chip-treasure">20 Soal HOTS Baru</span>
                  <span className="card-chip chip-treasure">{GAMES.zombie.teamBadge}</span>
                </div>
              </div>

              {/* Card 3: Finance Run (Endless Runner) */}
              <div
                className={`showcase-card ${activeGameKey === 'runner' ? 'active' : ''}`}
                onClick={() => handleSwitchGame('runner')}
                style={{ borderColor: activeGameKey === 'runner' ? '#0284c7' : undefined }}
              >
                <div className="card-head">
                  <div className="card-icon-box" style={{ background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)', color: '#FFF' }}>
                    <Play size={28} />
                  </div>
                  <span className="card-chip" style={{ background: '#e0f2fe', color: '#0284c7', border: '1px solid #0284c7' }}>{GAMES.runner.badge}</span>
                </div>
                <div>
                  <h3 className="card-title">{GAMES.runner.title}</h3>
                  <p className="card-desc">{GAMES.runner.desc}</p>
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: 'auto', flexWrap: 'wrap' }}>
                  <span className="card-chip" style={{ background: '#e0f2fe', color: '#0284c7' }}>IPS SMP Kelas 9</span>
                  <span className="card-chip" style={{ background: '#e0f2fe', color: '#0284c7' }}>40 Soal HOTS</span>
                  <span className="card-chip" style={{ background: '#e0f2fe', color: '#0284c7' }}>Light Mode Theme</span>
                </div>
              </div>
            </div>

            {/* Gaming Console Viewport */}
            <div className="console-box" ref={containerRef}>
              <div className="console-bar">
                <div className="console-title">
                  <span style={{ color: '#10B981' }}>🟢 CONSOLE ACTIVE:</span>
                  <span>{currentGame.title}</span>
                </div>
                <div className="console-actions">
                  <button type="button" className="console-btn" onClick={reloadGame}>
                    <RotateCcw size={14} />
                    <span>Mulai Ulang</span>
                  </button>
                  <a href={currentGame.file} target="_blank" rel="noreferrer" className="console-btn">
                    <ExternalLink size={14} />
                    <span>Buka Tab Baru</span>
                  </a>
                  <button type="button" className="console-btn" onClick={toggleFullscreen}>
                    {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                    <span>{isFullscreen ? 'Keluar Fullscreen' : 'Fullscreen IFP'}</span>
                  </button>
                </div>
              </div>

              <iframe
                ref={iframeRef}
                src={currentGame.file}
                className="iframe-viewport"
                title={currentGame.title}
              />
            </div>
          </div>
        )}

        {/* ================= SECTION 1.5: SLIDE PRESENTASI PRESENTATION VIEWER ================= */}
        {activeTab === 'slide' && (
          <div className="materi-wrapper">
            <div className="materi-header-bar">
              <div>
                <h2 className="section-title">📊 Slide Presentasi Modul CBP Rupiah</h2>
                <p className="section-sub">Presentasi Modul Edukasi Cinta, Bangga, Paham Rupiah (Bank Indonesia) — 22 Slide HD</p>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <a
                  href="/slides/slide_01.png"
                  download="MODUL_CBP_RUPIAH_SLIDES.png"
                  className="console-btn"
                >
                  <Download size={16} />
                  <span>Unduh Slide</span>
                </a>
              </div>
            </div>

            {/* Slide Viewer Stage Container */}
            <div className="slide-presenter-card" ref={slideContainerRef}>
              {/* Slide Screen Area */}
              <div className="slide-image-viewport">
                <img
                  src={SLIDES_LIST[currentSlideIndex].image}
                  alt={SLIDES_LIST[currentSlideIndex].title}
                  className="slide-main-img"
                />

                {/* Left/Right Click Nav Arrows */}
                <button
                  type="button"
                  className="slide-arrow-btn arrow-left"
                  onClick={() => setCurrentSlideIndex(prev => (prev > 0 ? prev - 1 : SLIDES_LIST.length - 1))}
                  title="Slide Sebelumnya"
                >
                  <ChevronLeft size={28} />
                </button>

                <button
                  type="button"
                  className="slide-arrow-btn arrow-right"
                  onClick={() => setCurrentSlideIndex(prev => (prev < SLIDES_LIST.length - 1 ? prev + 1 : 0))}
                  title="Slide Berikutnya"
                >
                  <ChevronRight size={28} />
                </button>
              </div>

              {/* Slide Control Bar */}
              <div className="slide-control-bar">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button
                    type="button"
                    className="console-btn"
                    onClick={() => setCurrentSlideIndex(prev => (prev > 0 ? prev - 1 : SLIDES_LIST.length - 1))}
                  >
                    <ChevronLeft size={16} />
                    <span>Prev</span>
                  </button>

                  <button
                    type="button"
                    className="console-btn"
                    onClick={() => setIsAutoPlay(!isAutoPlay)}
                    style={{ borderColor: isAutoPlay ? '#F59E0B' : undefined, color: isAutoPlay ? '#F59E0B' : undefined }}
                  >
                    {isAutoPlay ? <Pause size={16} /> : <Play size={16} />}
                    <span>{isAutoPlay ? 'Jeda Auto' : 'Auto Play (5s)'}</span>
                  </button>

                  <button
                    type="button"
                    className="console-btn"
                    onClick={() => setCurrentSlideIndex(prev => (prev < SLIDES_LIST.length - 1 ? prev + 1 : 0))}
                  >
                    <span>Next</span>
                    <ChevronRight size={16} />
                  </button>
                </div>

                <div className="slide-counter-badge">
                  <span>Slide <strong>{currentSlideIndex + 1}</strong> dari <strong>{SLIDES_LIST.length}</strong></span>
                </div>

                <button
                  type="button"
                  className="console-btn"
                  onClick={toggleSlideFullscreen}
                >
                  <Maximize2 size={16} />
                  <span>Presentasi Fullscreen IFP</span>
                </button>
              </div>

              {/* Thumbnail Carousel Strip */}
              <div className="slide-thumbnails-strip">
                {SLIDES_LIST.map((slide, idx) => (
                  <div
                    key={slide.id}
                    className={`slide-thumb-item ${currentSlideIndex === idx ? 'active' : ''}`}
                    onClick={() => setCurrentSlideIndex(idx)}
                  >
                    <img src={slide.image} alt={slide.title} className="thumb-img" />
                    <span className="thumb-num">{idx + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= SECTION 2: MODUL MATERI PEMBELAJARAN ================= */}
        {activeTab === 'materi' && (
          <div className="materi-wrapper">
            {/* Header Filter & Search */}
            <div className="materi-header-bar">
              <div>
                <h2 className="section-title">📚 Modul Materi Pembelajaran IPS Interaktif</h2>
                <p className="section-sub">Rangkuman materi IPS Kurikulum Merdeka Fase D (SMP Kelas 7, 8, dan 9)</p>
              </div>
              <div className="search-box">
                <Search size={18} color="#94A3B8" />
                <input
                  type="text"
                  placeholder="Cari materi, kata kunci..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>

            {/* Filter Pills */}
            <div className="filter-pills">
              {materiCategories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  className={`pill-btn ${selectedMateriCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedMateriCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid Materi Cards */}
            <div className="materi-grid">
              {filteredMateri.map(item => {
                const IconComponent = item.icon;
                return (
                  <div key={item.id} className="materi-card">
                    <div className="materi-card-head">
                      <div className="materi-icon-badge" style={{ backgroundColor: `${item.color}20`, color: item.color, borderColor: `${item.color}50` }}>
                        <IconComponent size={24} />
                      </div>
                      <span className="materi-category-chip">{item.category}</span>
                    </div>
                    <h3 className="materi-title">{item.title}</h3>
                    <p className="materi-summary">{item.summary}</p>

                    <div className="materi-footer">
                      <button
                        type="button"
                        className="btn-read-more"
                        onClick={() => setMateriModal(item)}
                      >
                        <span>Buka Detail Materi</span>
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= SECTION 3: LATIHAN KUIS HOTS ================= */}
        {activeTab === 'kuis' && (
          <div className="quiz-wrapper">
            <div className="quiz-header-bar">
              <div>
                <h2 className="section-title">💡 Latihan Kuis HOTS IPS Interaktif</h2>
                <p className="section-sub">Uji pemahaman konsep IPS Literasi Finansial &amp; Pengenalan Rupiah TE 2022</p>
              </div>
              <div className="score-badge">
                <Trophy size={20} color="#F59E0B" />
                <span>Skor: <strong>{score}</strong> / 100</span>
              </div>
            </div>

            {!quizFinished ? (
              <div className="quiz-card">
                {/* Quiz Status Bar */}
                <div className="quiz-meta-bar">
                  <span className="quiz-step">Soal {quizIndex + 1} dari {QUIZ_QUESTIONS.length}</span>
                  <span className="quiz-badge-topic">{QUIZ_QUESTIONS[quizIndex].topic}</span>
                  <span className="quiz-badge-level">{QUIZ_QUESTIONS[quizIndex].level}</span>
                </div>

                {/* Pertanyaan */}
                <h3 className="quiz-question-text">
                  {QUIZ_QUESTIONS[quizIndex].question}
                </h3>

                {/* Pilihan Jawaban */}
                <div className="quiz-options-list">
                  {QUIZ_QUESTIONS[quizIndex].options.map(opt => {
                    const isSelected = selectedAnswer === opt.letter;
                    const isCorrect = opt.letter === QUIZ_QUESTIONS[quizIndex].correct;

                    let optionStyle = 'option-btn';
                    if (selectedAnswer !== null) {
                      if (isCorrect) optionStyle += ' correct';
                      else if (isSelected) optionStyle += ' wrong';
                      else optionStyle += ' disabled';
                    }

                    return (
                      <button
                        key={opt.letter}
                        type="button"
                        className={optionStyle}
                        onClick={() => handleSelectQuizOption(opt.letter)}
                      >
                        <div className="opt-letter">{opt.letter}</div>
                        <div className="opt-text">{opt.text}</div>
                        {selectedAnswer !== null && isCorrect && <Check size={20} color="#10B981" />}
                        {selectedAnswer !== null && isSelected && !isCorrect && <X size={20} color="#F43F5E" />}
                      </button>
                    );
                  })}
                </div>

                {/* Pembahasan & Next Button */}
                {showExplanation && (
                  <div className="explanation-box">
                    <div className="explanation-title">
                      <Lightbulb size={18} color="#F59E0B" />
                      <span>Pembahasan Soal:</span>
                    </div>
                    <p className="explanation-text">{QUIZ_QUESTIONS[quizIndex].explanation}</p>
                    <button type="button" className="btn-next-quiz" onClick={handleNextQuiz}>
                      <span>{quizIndex < QUIZ_QUESTIONS.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil Kuis'}</span>
                      <ChevronRight size={18} />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="quiz-finished-box">
                <Trophy size={64} color="#F59E0B" />
                <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Kuis Selesai!</h3>
                <p style={{ color: '#94A3B8' }}>Terima kasih telah menyelesaikan latihan soal HOTS IPS Literasi Finansial.</p>
                <div className="final-score-card">
                  <span>Skor Akhir Anda:</span>
                  <span className="final-score-num">{score}</span>
                </div>
                <button type="button" className="btn-reset-quiz" onClick={handleResetQuiz}>
                  <RefreshCw size={18} />
                  <span>Ulangi Kuis Dari Awal</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* ================= SECTION 4: PANDUAN PENGGUNAAN IFP 4K ================= */}
        {activeTab === 'panduan' && (
          <div className="guide-wrapper">
            <h2 className="section-title">📺 Panduan Penggunaan di Layar Sentuh IFP 4K</h2>
            <p className="section-sub">Petunjuk fasilitasi pembelajaran aktif IPS di depan kelas untuk Guru &amp; Siswa</p>

            <div className="guide-grid">
              <div className="guide-card">
                <div className="guide-icon"><Rocket size={32} color="#38BDF8" /></div>
                <h3>1. Pengoperasian Game Aerostrike</h3>
                <p>Gunakan gesture layar sentuh IFP untuk mengontrol pergerakan pesawat. Mode kuis multi-touch memungkinkan hingga 4 tim menjawab soal HOTS IPS Literasi Finansial secara bersamaan di layar interaktif.</p>
              </div>

              <div className="guide-card">
                <div className="guide-icon"><Shield size={32} color="#10B981" /></div>
                <h3>2. Pertahanan Zombie Outbreak Defense</h3>
                <p>Pertahankan benteng sangtuari dari serangan zombie mutan. Pilihlah jawaban HOTS IPS Literasi Finansial secara cepat untuk menembakkan meriam pertahanan dan menembakkan gelombang Tesla Coil.</p>
              </div>

              <div className="guide-card">
                <div className="guide-icon"><BookOpen size={32} color="#10B981" /></div>
                <h3>3. Petualangan Finance Run (Endless Runner)</h3>
                <p>Berlari melintasi rintangan finansial. Pilih aksi yang tepat (A=Lompat, B=Slide, C=Double Jump, D=Roll) berdasarkan pertanyaan Literasi Keuangan SMP Kelas 9 untuk meloloskan tim ke garis finish.</p>
              </div>

              <div className="guide-card">
                <div className="guide-icon"><Award size={32} color="#A855F7" /></div>
                <h3>4. Evaluasi HOTS Berbasis Tim</h3>
                <p>Gunakan menu <strong>Latihan Kuis HOTS</strong> untuk melakukan tes cepat (formative assessment). Minta perwakilan tim maju ke depan layar IFP 4K untuk memilih jawaban logis.</p>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Modal Detail Materi */}
      {materiModal && (
        <div className="modal-backdrop" onClick={() => setMateriModal(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="materi-icon-badge" style={{ backgroundColor: `${materiModal.color}20`, color: materiModal.color, borderColor: `${materiModal.color}50` }}>
                  {React.createElement(materiModal.icon, { size: 24 })}
                </div>
                <div>
                  <span className="materi-category-chip">{materiModal.category}</span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '4px' }}>{materiModal.title}</h3>
                </div>
              </div>
              <button type="button" className="btn-close-modal" onClick={() => setMateriModal(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="materi-poin-list">
                {materiModal.details.poin.map((p, idx) => (
                  <div key={idx} className="poin-item">
                    <div className="poin-bullet">{idx + 1}</div>
                    <div>
                      <h4 className="poin-title">{p.title}</h4>
                      <p className="poin-desc">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="tips-box">
                <Sparkles size={20} color="#F59E0B" />
                <div>
                  <strong>Tips Praktis &amp; Penerapan:</strong>
                  <p>{materiModal.details.tips}</p>
                </div>
              </div>

              <div className="ref-tag">
                <Info size={14} />
                <span>Referensi: {materiModal.details.ref}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
