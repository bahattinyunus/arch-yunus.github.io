import { motion } from "framer-motion";
import { 
  ArrowUpRight, BrainCircuit, Compass, GraduationCap, ShieldCheck, 
  Flame, Sparkles, Binary, Feather, Orbit, Terminal, Cpu, Zap, Eye, BookOpen, Quote
} from "lucide-react";
import { Link } from "wouter";
import { profileData } from "@/lib/data";

const philosophicalPillars = [
  {
    id: "entropy",
    roman: "I",
    title: "Bilişimsel Termodinamik & Entropi",
    sub: "Düzenin İnşası ve Kaosla Mücadele",
    icon: Flame,
    color: "text-amber-400",
    border: "border-amber-400/30",
    bg: "bg-amber-400/5",
    thesis: "Evren kaçınılmaz olarak dağılmaya (entropi) meyleder; mühendislik ise bu kozmik eğilime karşı yerel bir düzen ve anlam vahası inşa etme eylemidir.",
    text: "Her yazılım mimarisi, doğası gereği çürümeye ve karmaşaya açıktır. Saf kod yazmak teknik bir pratikten öte, epistemolojik bir tavırdır. Deterministik bir bellek yönetimi (C++ / Rust) ile entropiyi dizginler; temiz soyutlamalarla kaosa sınır çizeriz. Sistem sadece çalışmamalı; evrenin rastlantısallığına karşı yapısal bir zarafet sergilemelidir."
  },
  {
    id: "via-negativa",
    roman: "II",
    title: "Eksiltme Yoluyla Mükemmellik (Via Negativa)",
    sub: "Budak Doktrini & Bilişsel Saflaşma",
    icon: Feather,
    color: "text-emerald-400",
    border: "border-emerald-400/30",
    bg: "bg-emerald-400/5",
    thesis: "Bir heykeltıraş mermere şekil vermez; mermerin içindeki heykeli tutsak eden fazlalıkları yontar. Model budama (%80 Pruning), bilişsel bir arınmadır.",
    text: "Modern dünya modelleri büyütmeyi marifet sanıyor; oysa doğa her zaman en az enerji ile en yüksek hayatta kalma zekasını arar. Milyarlarca parametreyle şişirilmiş bir model bilge değil, gürültülüdür. Budak projesinde savunduğum %80 budama ilkesi, gürültüyü silip hakiki bilgi kristalini ortaya çıkarma çabasıdır. Zeka, eklediklerinizde değil; vazgeçebildiklerinizdedir."
  },
  {
    id: "duality",
    roman: "III",
    title: "Determinizmden Stokastisizme",
    sub: "Mantığın Sınırından Zekânın Doğuşuna",
    icon: Binary,
    color: "text-neon-blue",
    border: "border-neon-blue/30",
    bg: "bg-neon-blue/5",
    thesis: "0 ve 1'lerin katı determinizmi bir binanın temeli ise; olasılıksal (stokastik) yapay zekâ o binanın rüzgârda esneyen kubbesidir.",
    text: "Gömülü sistemler ve RTOS, mikrosaniyelik determinizm talep eder: Girdi bellidir, çıktı şaşmaz. Ancak insan zihni ve gerçek dünya deterministik değildir; belirsizliklerle doludur. C++20'nin deterministik kesinliği ile PyTorch'un olasılıksal latent uzayını birleştirdiğimizde, makine salt bir hesap makinesi olmaktan çıkıp 'karar veren bir özneye' dönüşür."
  },
  {
    id: "sovereignty",
    roman: "IV",
    title: "Ontolojik Bağımsızlık & Yerli Egemenlik",
    sub: "Araç Köleliğinden Kendi Çipinin Efendiliğine",
    icon: ShieldCheck,
    color: "text-neon-green",
    border: "border-neon-green/30",
    bg: "bg-neon-green/5",
    thesis: "Başkasının donanımında ve bulutunda koşan zihin, başkasının simülasyonunda yalnızca bir figürandır.",
    text: "Teknoloji tüketimi bir bağımlılık biçimidir. Eğer bir millet kendi mikrodenetleyicisini (Çelik MCU RISC-V), kendi telemetri protokolünü (Trabzon Protocol) ve kendi dil modelini (Arat LLM) bizzat çekirdekten kurmuyorsa; egemenliği pamuk ipliğine bağlıdır. Açık kaynak Ar-Ge ekosistemim ve otonom sistemler vizyonum ile hedefim; ithal kütüphaneleri yüzeyselce birleştiren bir tüketici olmak değil, temel algoritmaları, model optimizasyon protokollerini ve gömülü donanım katmanlarını sıfırdan inşa eden yetkin bir mühendis olmaktır."
  },
  {
    id: "mythos-logos",
    roman: "V",
    title: "Mythos & Logos: Kadim Kökler, Sibernetik Ufuk",
    sub: "Arkıl, Tulpar ve Geleceğin Bilişimi",
    icon: Orbit,
    color: "text-purple-400",
    border: "border-purple-400/30",
    bg: "bg-purple-400/5",
    thesis: "Mitoloji geçmişin masalı değildir; insanlığın varoluşa dair inşa ettiği ilk soyut bilişim modelleridir.",
    text: "Arkıl Games ve Tulpar Aero-Dynamics projelerimde rastlantısal isimler kullanmıyorum. Türk kozmolojisindeki kanatlı at Tulpar, bugün otonom göklerde süzülen 6-DoF İHA algoritmalarımızda yeniden hayat buluyor. Mitolojinin kadim hafızası (Mythos) ile mühendisliğin analitik mantığı (Logos) birleştiğinde ortaya ruhu olan teknolojiler çıkar."
  }
];

const aphorisms = [
  "“Bir sistemi zeki kılan taşıdığı parametre fazlalığı değil, elediği gereksiz gürültüdür.”",
  "“Mühendislik, evrenin kaçınılmaz entropisine karşı yerel düzen inşa etme direnişidir.”",
  "“Doğrulanmamış teori felsefedir; felsefeden yoksun kod ise ameleliktir.”",
  "“Gelecek, başkalarının API'lerini çağıranların değil; kendi çekirdeğini yazanların olacaktır.”",
  "“En mükemmel makine, doğanın milyonlarca yılda yontarak mükemmelleştirdiği biyolojidir.”"
];

export default function Doctrine() {
  return (
    <div className="space-y-16 pb-16">
      {/* Üst Başlık & Epistemolojik Giriş */}
      <header className="border-b border-white/10 pb-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#b9f36b]/10 border border-[#b9f36b]/30 text-[#b9f36b] text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>FELSEFİ VE DOKTRİNEL MANİFESTO // B.Y.Ç. 2026</span>
        </div>
        
        <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white font-[family-name:var(--font-display)] leading-[1.05]">
              Kod yazmaktan önce, <span className="text-[#b9f36b]">varoluşu</span> ve <span className="text-neon-blue">anlamı</span> kavramak.
            </h1>
            <p className="mt-6 text-base md:text-lg leading-relaxed text-white/60 font-mono">
              Yazılım sadece komut dizileri değildir; insan zihninin fiziksel gerçeklik üzerindeki irade projeksiyonudur. Donanım, yapay zekâ ve otonom sistemler üzerine kurduğum mühendislik ontolojisi.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-[#b9f36b]/20 bg-[#b9f36b]/[0.05] p-6 md:p-8">
            <Quote className="w-8 h-8 text-[#b9f36b]/40 mb-3" />
            <p className="text-xl md:text-2xl font-medium leading-snug text-white font-[family-name:var(--font-display)]">
              “İyi teknoloji, insanın yerine düşünmez; insanın daha derin düşünebilmesi için ona ontolojik bir alan açar.”
            </p>
            <div className="mt-4 flex items-center justify-between text-xs font-mono text-[#b9f36b]">
              <span>Bahattin Yunus Çetin</span>
              <span>ODTÜ BÖTE & Hacettepe</span>
            </div>
          </div>
        </div>
      </header>

      {/* 5 Temel Doktrinel Sütun */}
      <section className="space-y-8">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#b9f36b]">PENTAGRAM // 5 TEMEL AKSİS</span>
            <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-display)] text-white mt-1">
              Mühendislik & Sibernetik Felsefesi
            </h2>
          </div>
          <span className="text-xs font-mono text-white/40 hidden sm:inline">01 - 05 THEOREMS</span>
        </div>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {philosophicalPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isWide = idx === 0;

            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                className={`p-7 md:p-8 rounded-2xl border ${pillar.border} ${pillar.bg} transition-all hover:shadow-[0_0_25px_rgba(185,243,107,0.1)] flex flex-col justify-between ${
                  isWide ? "lg:col-span-2" : ""
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 ${pillar.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-mono text-white/40 block">DOKTRİN #{pillar.roman}</span>
                        <h3 className="text-xl md:text-2xl font-bold text-white font-[family-name:var(--font-display)]">
                          {pillar.title}
                        </h3>
                      </div>
                    </div>
                    <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-white/5 ${pillar.color}`}>
                      {pillar.sub}
                    </span>
                  </div>

                  {/* Tez */}
                  <div className="p-4 rounded-xl bg-black/40 border border-white/10 font-mono text-xs text-white/80 leading-relaxed italic">
                    {pillar.thesis}
                  </div>

                  {/* Detay Açıklama */}
                  <p className="text-sm md:text-base leading-relaxed text-white/60">
                    {pillar.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Aforizmalar Şeridi */}
      <section className="p-8 md:p-10 rounded-2xl bg-gradient-to-r from-white/[0.03] via-[#b9f36b]/[0.05] to-transparent border border-white/10 space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono text-[#b9f36b] uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>FELSEFİ AFORİZMALAR VE MÜHENDİSLİK HÜKÜMLERİ</span>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {aphorisms.map((quote, i) => (
            <div 
              key={i}
              className="p-5 rounded-xl bg-black/50 border border-white/10 flex flex-col justify-between hover:border-[#b9f36b]/40 transition-colors"
            >
              <p className="text-sm text-white/80 font-mono leading-relaxed">
                {quote}
              </p>
              <span className="text-[10px] font-mono text-[#b9f36b]/70 mt-3 block text-right">
                — B.Y. Çetin
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Akademik Matris ve Yolculuk */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b border-white/10 pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-neon-blue">BİLİŞİM VE AKADEMİ MATRİSİ</span>
            <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-display)] text-white mt-1">
              Fikirlerin Eyleme Dönüştüğü Zaman Çizelgesi
            </h2>
          </div>
          <Link href="/comms" className="hidden sm:inline-flex items-center gap-2 text-xs font-mono text-[#b9f36b] hover:underline">
            Doğrudan İletişim <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.025]">
          {profileData.timeline.slice(0, 5).map((item) => (
            <div key={`${item.year}-${item.title}`} className="grid gap-2 p-5 md:grid-cols-[150px_1fr] md:p-6 hover:bg-white/[0.02] transition-colors">
              <div className="font-mono text-xs text-[#b9f36b] font-bold">{item.year}</div>
              <div>
                <h3 className="text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-0.5 text-xs text-white/45 font-mono">{item.company}</p>
                <p className="mt-2.5 max-w-3xl text-sm leading-relaxed text-white/60">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
