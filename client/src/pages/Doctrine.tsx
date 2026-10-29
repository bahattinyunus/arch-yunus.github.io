import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRight, BrainCircuit, Compass, GraduationCap, ShieldCheck, 
  Flame, Sparkles, Binary, Feather, Orbit, Terminal, Cpu, Zap, Eye, BookOpen, Quote,
  Scale, Layers, Lightbulb, CheckCircle2, ChevronRight, ShieldAlert, Network,
  Bookmark, HelpCircle, GitBranch, Atom
} from "lucide-react";
import { Link } from "wouter";
import { profileData } from "@/lib/data";
import { useCyberSound } from "@/hooks/use-cyber-sound";
import { 
  PHILOSOPHER_THINKERS, 
  SOCRATIC_DILEMMAS, 
  CYBER_GLOSSARY, 
  PhilosopherThinker,
  SocraticDilemma,
  CyberGlossaryTerm
} from "@/lib/philosophyData";

export interface PhilosophicalPillar {
  id: string;
  roman: string;
  title: string;
  sub: string;
  icon: any;
  color: string;
  border: string;
  bg: string;
  philosophers: string;
  thesis: string;
  text: string;
  engineeringManifestation: string;
}

export const PHILOSOPHICAL_PILLARS: PhilosophicalPillar[] = [
  {
    id: "entropy",
    roman: "I",
    title: "Bilişimsel Termodinamik & Negentropi",
    sub: "Düzenin İnşası ve Kozmik Kaosla Mücadele",
    icon: Flame,
    color: "text-amber-400",
    border: "border-amber-400/30",
    bg: "bg-amber-400/5",
    philosophers: "Erwin Schrödinger, Claude Shannon, Ludwig Boltzmann",
    thesis: "Evren kaçınılmaz olarak dağılmaya, termodinamik çözülmeye (entropi) meyleder; mühendislik ise bu kozmik eğilime karşı yerel bir düzen, anlam ve negentropi (negatif entropi) vahası inşa etme eylemidir.",
    text: "Her yazılım mimarisi, doğası gereği çürümeye ve gürültüye açıktır. Saf kod yazmak teknik bir zanaatten öte, epistemolojik bir tavırdır. Deterministik bir bellek yönetimi (C++ / Rust) ile entropiyi dizginler; temiz soyutlamalarla kaosa sınır çizeriz. Sistem sadece çalışmamalı; evrenin rastlantısallığına karşı yapısal bir zarafet sergilemelidir.",
    engineeringManifestation: "Bellek sızıntısız C++20 mimarisi, sıfır-kopyalama (zero-copy) veri boru hatları ve deterministik RTOS çekirdekleri."
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
    philosophers: "Plotinus, Michelangelo, Nassim Nicholas Taleb",
    thesis: "Bir heykeltıraş mermere şekil vermez; mermerin içindeki heykeli tutsak eden fazlalıkları yontar. Model budama (%80 Pruning), bilişsel bir arınma ve saflaşmadır.",
    text: "Modern dünya modelleri büyütmeyi marifet sanıyor; oysa doğa her zaman en az enerji ile en yüksek hayatta kalma zekasını arar. Milyarlarca parametreyle şişirilmiş bir model bilge değil, gürültülüdür. Budak projesinde savunduğum %80 budama ilkesi, gürültüyü silip hakiki bilgi kristalini ortaya çıkarma çabasıdır. Zeka, eklediklerinizde değil; vazgeçebildiklerinizdedir.",
    engineeringManifestation: "Budak Edge-AI Lab: %80 yapısal olmayan ağırlık budaması ve INT8/INT4 kuantizasyonu ile uç birimlerde sıfır bulut bağımlılığı."
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
    philosophers: "Baruch Spinoza, Gottfried Wilhelm Leibniz, Alan Turing",
    thesis: "0 ve 1'lerin katı determinizmi bir mabedin taş temeli ise; olasılıksal (stokastik) yapay zekâ o mabedin rüzgârda esneyen kubbesidir.",
    text: "Gömülü sistemler ve RTOS, mikrosaniyelik determinizm talep eder: Girdi bellidir, çıktı şaşmaz. Ancak insan zihni ve gerçek dünya deterministik değildir; belirsizliklerle doludur. C++20'nin deterministik kesinliği ile PyTorch'un olasılıksal latent uzayını birleştirdiğimizde, makine salt bir hesap makinesi olmaktan çıkıp 'karar veren bir özneye' dönüşür.",
    engineeringManifestation: "ROS2 & PX4 aviyonik kontrol döngülerinde mikrosaniye determinizm; nesne tespiti ve rota kestiriminde derin stokastik ağlar."
  },
  {
    id: "sovereignty",
    roman: "IV",
    title: "Ontolojik Bağımsızlık & Silikon Egemenliği",
    sub: "Araç Köleliğinden Kendi Çipinin Efendiliğine",
    icon: ShieldCheck,
    color: "text-neon-green",
    border: "border-neon-green/30",
    bg: "bg-neon-green/5",
    philosophers: "İbn Haldun, Farabi, Friedrich Nietzsche",
    thesis: "Başkasının donanımında ve bulutunda koşan zihin, başkasının simülasyonunda yalnızca bir figürandır.",
    text: "Teknoloji tüketimi bir ontolojik bağımlılık biçimidir. Eğer bir millet kendi mikrodenetleyicisini (Çelik MCU RISC-V), kendi telemetri protokolünü (Trabzon Protocol) ve kendi dil modelini (Arat LLM) bizzat çekirdekten kurmuyorsa; egemenliği pamuk ipliğine bağlıdır. Açık kaynak Ar-Ge ekosistemim ile hedefim; ithal kütüphaneleri yüzeyselce birleştiren bir tüketici olmak değil, temel algoritmaları ve donanım katmanlarını sıfırdan inşa eden yetkin bir mühendis olmaktır.",
    engineeringManifestation: "İlk yerli RISC-V çipi Çelik MCU C++ SDK'sı, Trabzon Protocol MQTT ikili haberleşme protokolü ve milli dil modelleri."
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
    philosophers: "Carl Gustav Jung, Mircea Eliade, Norbert Wiener",
    thesis: "Mitoloji geçmişin masalı değildir; insanlığın varoluşa dair inşa ettiği ilk soyut bilişim ve arketip modelleridir.",
    text: "Arkıl Games ve Tulpar Aero-Dynamics projelerimde rastlantısal isimler kullanmıyorum. Türk kozmolojisindeki kanatlı at Tulpar, bugün otonom göklerde süzülen 6-DoF İHA algoritmalarımızda yeniden hayat buluyor. Mitolojinin kadim hafızası (Mythos) ile mühendisliğin analitik mantığı (Logos) birleştiğinde ortaya ruhu ve kökleri olan teknolojiler çıkar.",
    engineeringManifestation: "Tulpar 6-DoF aviyonik uçuş fiziği, Arkıl prosedürel Türk mitolojisi simülasyon motoru."
  },
  {
    id: "hylomorphism",
    roman: "VI",
    title: "Hilomorfik Silikon: Beden (Donanım) ve Ruh (Ağırlıklar)",
    sub: "Saf Yazılım Yanılsamasından Bedenleşmiş Zekâya",
    icon: Cpu,
    color: "text-cyan-400",
    border: "border-cyan-400/30",
    bg: "bg-cyan-400/5",
    philosophers: "Aristoteles, Gilbert Simondon, Maurice Merleau-Ponty",
    thesis: "Madde (Hyle) formsuz eksiktir; form (Morphe) ise maddesiz tecessüm edemez. Saf bulut modelleri bedensiz bir hayalettir; hakiki zekâ fiziksel kısıtlarla çarpıştığında doğar.",
    text: "Yapay zekâyı sadece soyut sunucularda koşan bir matris çarpımı sanmak, modern bir Kartezyen yanılgıdır. Bir model, termal bütçesi olan bir transistörde, pili tükenen bir drone'da, milisaniyelerle yarışan bir sensörde bedenleştiğinde (embodied cognition) gerçek dünya ile ontolojik bağ kurar. Mühendis, donanımın direnciyle zihnin formunu nikahlayan kişidir.",
    engineeringManifestation: "Cihaz üstü (on-device) Edge AI, NPU hızlandırıcılar, donanım register haritalamaları ve düşük güç tüketimli gömülü çıkarım."
  },
  {
    id: "gestell",
    roman: "VII",
    title: "Heidegger'in Gestell'i & Sibernetik Poiesis",
    sub: "Kaynak Haline Getirilmekten Yaratıcı Özgürleşmeye",
    icon: Zap,
    color: "text-rose-400",
    border: "border-rose-400/30",
    bg: "bg-rose-400/5",
    philosophers: "Martin Heidegger, Bernard Stiegler, Jacques Ellul",
    thesis: "Teknoloji insanı ve doğayı salt 'kullanılabilir stok/kaynak' (Bestand) olarak çerçevelediğinde (Gestell) bir hapishaneye dönüşür. Buna karşı tek direniş, teknolojiyi bir 'Poiesis' (hakikati açığa çıkaran şiirsel yaratım) kılmaktır.",
    text: "Modern bulut tekelleri insan zihnini, dikkatini ve verisini bir hammaddeye dönüştürdü. Kullanıcı artık özne değil, tüketim algoritmasının eğitildiği nesnedir. Kendi çekirdeğini yazmak, yerel çalışan WebGPU modelleri inşa etmek ve açık kaynak topluluklarıyla paylaşmak; Gestell'in zincirlerini kırıp mühendisliği bir yaratıcı özgürlük alanına dönüştürmektir.",
    engineeringManifestation: "Açık kaynak 231+ GitHub deposu, sıfır telemetri sızıntılı yerel WebLLM ve bağımsız Ar-Ge lisansları."
  },
  {
    id: "epistemology",
    roman: "VIII",
    title: "Epistemolojik Şeffaflık & Açıklanabilir Biliş",
    sub: "Kara Kutu Putperestliğini Reddetmek",
    icon: Eye,
    color: "text-yellow-400",
    border: "border-yellow-400/30",
    bg: "bg-yellow-400/5",
    philosophers: "Karl Popper, Immanuel Kant, Bertrand Russell",
    thesis: "Nedenini açıklayamadığın bir zeka, ilahi bir mucize değil; entelektüel tembelliğin inşa ettiği modern bir puttur.",
    text: "Kara kutu modeller (Black Box AI), çıktısına körü körüne güvenilen modern çağın kahinleridir. Oysa bilim, doğrulanabilirlik ve yanlışlanabilirlik üzerine kuruludur. Bir modelin karar alma mekanizmasını latent uzayda görselleştirebiliyor, attention ağırlıklarını denetleyebiliyor ve gradyan akışını izleyebiliyorsak orası bir bilim yuvasıdır. Mühendis, gizeme teslim olan değil; matematiğin ışığıyla karanlığı aydınlatandır.",
    engineeringManifestation: "Attention ağırlık görselleştirmeleri, feature importance analizleri ve C2PA içerik kimlik doğrulama mimarileri."
  }
];

export interface DialecticItem {
  id: string;
  title: string;
  thesis: { label: string; text: string };
  antithesis: { label: string; text: string };
  synthesis: { label: string; text: string; axiom: string };
}

export const DIALECTIC_DEBATES: DialecticItem[] = [
  {
    id: "determinism-stochastic",
    title: "Determinizm ↔ Stokastisizm",
    thesis: {
      label: "TEZ (Katı Determinizm)",
      text: "Her sistem kesin kurallarla yönetilmelidir. Mikrosaniye düzeyinde RTOS determinizmi, girdinin çıktıyı şaşmaz şekilde belirlediği güvenli limandır."
    },
    antithesis: {
      label: "ANTİTEZ (Saf Stokastisizm)",
      text: "Gerçek dünya belirsiz ve kaotiktir. Katı kurallar bilinmeyen durumlarda çöker; yalnızca olasılıksal sinir ağları karmaşık dünyada hayatta kalabilir."
    },
    synthesis: {
      label: "MÜHENDİSLİK SENTEZİ (B.Y. Çetin)",
      text: "Deterministik gömülü omurga (C++20/RTOS) üzerinde koşan, olasılıksal zekâ kubbesi (PyTorch/Latent Space). Güvenlik kritik katmanda determinizm, algı ve karar katmanında olasılık.",
      axiom: "“0-1 mabedin temeli, olasılık ise rüzgârda esneyen kubbesidir.”"
    }
  },
  {
    id: "via-negativa-scaling",
    title: "Via Negativa (Budama) ↔ Brute-Force Scaling",
    thesis: {
      label: "TEZ (Hiper-Skalalama / Scaling Laws)",
      text: "Daha fazla parametre, trilyonlarca token veri ve binlerce GPU kümesi her zaman daha yüksek zekâya yol açar. Zeka kütleyle doğru orantılıdır."
    },
    antithesis: {
      label: "ANTİTEZ (Eksiltme / Via Negativa)",
      text: "Şişirilmiş modeller devasa enerji tüketir ve gürültü biriktirir. Zekâ var olanı ezberlemekte değil; bilgi kristalini gereksiz parametrelerden arındırmaktadır."
    },
    synthesis: {
      label: "MÜHENDİSLİK SENTEZİ (B.Y. Çetin)",
      text: "Budak %80 model budama ve knowledge distillation: 70B teacher modelin bilişsel özü damıtılarak, 1.5B/3B boyutlarında uç birimlerde tam gizlilikle koşturulur.",
      axiom: "“Zekâ eklediklerinizde değil, vazgeçebildiğiniz parametrelerdedir.”"
    }
  },
  {
    id: "sovereignty-cloud",
    title: "Silikon Egemenliği ↔ Bulut Bağımlılığı",
    thesis: {
      label: "TEZ (Merkezi Bulut Kolaylığı)",
      text: "Milyarlarca dolarlık veri merkezlerinin API'lerine abone olmak, yerel donanım geliştirmekten çok daha ucuz, hızlı ve pratiktir."
    },
    antithesis: {
      label: "ANTİTEZ (Ontolojik Egemenlik)",
      text: "Başkasının bulutunda koşan zihin bağımsız olamaz. Bir şalter kapandığında milli güvenlik, otonom sistemler ve sanayi felç olur."
    },
    synthesis: {
      label: "MÜHENDİSLİK SENTEZİ (B.Y. Çetin)",
      text: "Milli RISC-V çipi (Çelik MCU) sürücüleri, bağımsız telemetri (Trabzon Protocol) ve cihaz üstü açık kaynak modeller ile sıfır dış bağımlılık kalkanı.",
      axiom: "“Kendi çekirdeğini yazmayan, başkasının simülasyonunda yalnızca bir kiracıdır.”"
    }
  },
  {
    id: "mythos-logos",
    title: "Mythos (Mitoloji) ↔ Logos (Akıl & Mantık)",
    thesis: {
      label: "TEZ (Saf Pozitivist Logos)",
      text: "Mühendislik yalnızca diferansiyel denklemler, fizik kuralları ve mantık kapılarıdır. Mitoloji ve anlatı bilimin düşmanıdır."
    },
    antithesis: {
      label: "ANTİTEZ (Arketipsel Mythos)",
      text: "İnsan salt mantıkla değil, semboller ve anlam arayışıyla yaşar. Köklerinden kopan teknoloji soğuk, yabancılaştırıcı ve mekanik bir zulme dönüşür."
    },
    synthesis: {
      label: "MÜHENDİSLİK SENTEZİ (B.Y. Çetin)",
      text: "Türk mitolojisinin derin hafızası (Arkıl Games, Tulpar kanatlı atı) ile 6-DoF aerodinamik fizik simülasyonunun sentezi. Ruh taşıyan yüksek teknoloji.",
      axiom: "“Kadim kökler olmadan göğe yükselen kanat, güneşe yaklaştığında erir.”"
    }
  }
];

export const PHILOSOPHICAL_APHORISMS = [
  "“Bir sistemi zeki kılan taşıdığı parametre fazlalığı değil, elediği gereksiz gürültüdür.”",
  "“Mühendislik, evrenin kaçınılmaz entropisine karşı yerel düzen inşa etme direnişidir.”",
  "“Doğrulanmamış teori felsefedir; felsefeden yoksun kod ise ameleliktir.”",
  "“Gelecek, başkalarının API'lerini çağıranların değil; kendi çekirdeğini yazanların olacaktır.”",
  "“En mükemmel makine, doğanın milyonlarca yılda yontarak mükemmelleştirdiği biyolojidir.”",
  "“Donanım bedendir, ağırlıklar ruh. Bedensiz bir ruh sanrı görür; ruhsuz bir beden sadece taştır.”",
  "“Kod yazmak klavyeye basmak değil; varoluşun kumaşına matematiksel bir düğüm atmaktır.”",
  "“Açıklanamayan yapay zeka, ortaçağın kahinidir. Mühendis mucizelere değil, gradyanlara inanır.”",
  "“Milli egemenlik artık sınır boylarında değil; derleyicinin (compiler) ürettiği ikili kod bloklarında başlar.”",
  "“Öğrenmek biriktirmek değil; doğru zamanda doğru gereksizliği unutabilme yetisidir.”"
];

export default function Doctrine() {
  const { playSound } = useCyberSound();
  const [activeDialectic, setActiveDialectic] = useState<string>("determinism-stochastic");
  const [activeThinkerId, setActiveThinkerId] = useState<string>("simondon");
  const [activeDilemmaId, setActiveDilemmaId] = useState<string>("autonomous-killswitch");

  const selectedDebate = DIALECTIC_DEBATES.find(d => d.id === activeDialectic) || DIALECTIC_DEBATES[0];
  const selectedThinker = PHILOSOPHER_THINKERS.find(t => t.id === activeThinkerId) || PHILOSOPHER_THINKERS[0];
  const selectedDilemma = SOCRATIC_DILEMMAS.find(d => d.id === activeDilemmaId) || SOCRATIC_DILEMMAS[0];

  return (
    <div className="space-y-24 pb-24">
      {/* Üst Başlık & Epistemolojik Giriş */}
      <header className="border-b border-white/10 pb-12 space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>FELSEFİ VE DOKTRİNEL MANİFESTO // SİBERNETİK ONTOLOJİ</span>
        </div>
        
        <div className="grid gap-10 lg:grid-cols-[1.3fr_.7fr] lg:items-end">
          <div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white font-[family-name:var(--font-display)] leading-[1.04]">
              Kod yazmaktan önce, <span className="text-accent">varoluşu</span>, <span className="text-neon-blue">özgürlüğü</span> ve <span className="text-emerald-400">anlamı</span> kavramak.
            </h1>
            <p className="mt-6 text-base md:text-lg leading-relaxed text-white/70 font-mono">
              Yazılım sadece makine komutları değildir; insanın fiziksel gerçeklik üzerindeki ontolojik irade projeksiyonudur. Gömülü donanım, yapay zekâ ontolojisi, Heidegger'den Simondon'a uzanan teknoloji felsefesi ve egemen otonom sistemler üzerine kurduğum epistemolojik mimari.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-accent/30 bg-accent/[0.04] p-6 md:p-8 backdrop-blur-md">
            <Quote className="w-8 h-8 text-accent/40 mb-3" />
            <p className="text-xl md:text-2xl font-medium leading-snug text-white font-[family-name:var(--font-display)]">
              “İyi teknoloji insanın yerine düşünmez; insanın daha derin düşünebilmesi için ona ontolojik bir negentropi alanı açar.”
            </p>
            <div className="mt-5 flex items-center justify-between text-xs font-mono text-accent">
              <span className="font-bold">Bahattin Yunus Çetin</span>
              <span className="text-white/40">ODTÜ BÖTE & Hacettepe</span>
            </div>
          </div>
        </div>
      </header>

      {/* İNTERAKTİF SİBERNETİK DİYALEKTİK MATRİSİ */}
      <section className="space-y-6 p-7 md:p-10 rounded-3xl border border-neon-blue/30 bg-black/60 backdrop-blur-xl shadow-[0_0_50px_rgba(0,243,255,0.08)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-neon-blue flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5" /> SİBERNETİK DİYALEKTİK MATRİSİ
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-display)] text-white mt-1">
              Felsefi Zıtlıkların Mühendislik Sentezi
            </h2>
          </div>
          <span className="text-xs font-mono text-white/40">
            DİYALEKTİK ÇATIŞMA & AKIL YÜRÜTME
          </span>
        </div>

        {/* Dialectic Tab Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {DIALECTIC_DEBATES.map((debate) => {
            const isSelected = activeDialectic === debate.id;
            return (
              <button
                key={debate.id}
                onClick={() => {
                  setActiveDialectic(debate.id);
                  playSound('click');
                }}
                className={`px-3.5 py-2 text-xs font-mono rounded-lg border transition-all ${
                  isSelected
                    ? "border-neon-blue bg-neon-blue/20 text-neon-blue font-bold shadow-[0_0_12px_rgba(0,243,255,0.25)]"
                    : "border-white/10 text-white/50 hover:text-white hover:border-white/30"
                }`}
              >
                {debate.title}
              </button>
            );
          })}
        </div>

        {/* Active Dialectic Showcase Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDebate.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid gap-6 lg:grid-cols-3 mt-4"
          >
            {/* Tez */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-white/40 block mb-2">{selectedDebate.thesis.label}</span>
                <p className="text-sm text-white/80 leading-relaxed font-sans">
                  {selectedDebate.thesis.text}
                </p>
              </div>
            </div>

            {/* Antitez */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-white/40 block mb-2">{selectedDebate.antithesis.label}</span>
                <p className="text-sm text-white/80 leading-relaxed font-sans">
                  {selectedDebate.antithesis.text}
                </p>
              </div>
            </div>

            {/* Sentez */}
            <div className="p-6 rounded-2xl bg-neon-blue/10 border border-neon-blue/40 flex flex-col justify-between shadow-[0_0_30px_rgba(0,243,255,0.15)]">
              <div>
                <span className="text-xs font-mono text-neon-blue font-bold block mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> {selectedDebate.synthesis.label}
                </span>
                <p className="text-sm text-white leading-relaxed font-sans font-medium">
                  {selectedDebate.synthesis.text}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-neon-blue/20 text-xs font-mono text-accent italic">
                {selectedDebate.synthesis.axiom}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* YENİ MODÜL 1: ONTOLOJİK KONSTELASYON & TEKNOLOJİ FELSEFECİLERİ PANTEONU */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
              <Network className="w-3.5 h-3.5" />
              <span>ONTOLOJİK KONSTELASYON // PANTHEON OF THINKERS</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold font-[family-name:var(--font-display)] text-white">
              Teknoloji Felsefesi & Mühendislik Yankıları
            </h2>
          </div>
          <span className="text-xs font-mono text-white/40">
            SİBERNETİK VE VAROLUŞSAL REFERANSLAR (8 FİLOZOF)
          </span>
        </div>

        {/* Thinkers Selector Bar */}
        <div className="flex flex-wrap gap-2">
          {PHILOSOPHER_THINKERS.map((thinker) => {
            const isSelected = activeThinkerId === thinker.id;
            return (
              <button
                key={thinker.id}
                onClick={() => {
                  setActiveThinkerId(thinker.id);
                  playSound('click');
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono border transition-all flex items-center gap-2 ${
                  isSelected
                    ? `${thinker.borderColor} bg-white/10 ${thinker.color} font-bold shadow-lg shadow-white/5`
                    : "border-white/10 text-white/50 hover:text-white hover:border-white/20 bg-white/[0.02]"
                }`}
              >
                <span>{thinker.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Thinker Detailed Dossier Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedThinker.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className={`p-7 md:p-10 rounded-3xl border ${selectedThinker.borderColor} bg-black/70 backdrop-blur-xl space-y-8 relative overflow-hidden`}
          >
            {/* Top metadata */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className={`text-3xl md:text-4xl font-bold ${selectedThinker.color} font-[family-name:var(--font-display)]`}>
                    {selectedThinker.name}
                  </h3>
                  <span className="text-xs font-mono text-white/40 px-2.5 py-1 rounded bg-white/5 border border-white/10">
                    {selectedThinker.era}
                  </span>
                </div>
                <p className="mt-1 text-sm text-white/60 font-mono">
                  {selectedThinker.school} · <span className="text-white/80 italic">{selectedThinker.magnumOpus}</span>
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {selectedThinker.tags.map(tag => (
                  <span key={tag} className="text-[11px] font-mono px-2.5 py-1 rounded bg-white/5 text-white/70 border border-white/10">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Quote */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-base md:text-lg text-white font-mono italic leading-relaxed">
              {selectedThinker.quote}
            </div>

            {/* Core Concept & Cybernetic Interpretation */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-white/40 block">
                  TEMEL FELSEFİ KAVRAM
                </span>
                <h4 className="text-base font-bold text-white font-[family-name:var(--font-display)]">
                  {selectedThinker.coreConcept}
                </h4>
                <p className="text-sm text-white/70 font-sans leading-relaxed pt-2">
                  {selectedThinker.cyberneticInterpretation}
                </p>
              </div>

              <div className={`p-6 rounded-2xl border ${selectedThinker.borderColor} ${selectedThinker.bgGlow} space-y-2`}>
                <span className={`text-xs font-mono uppercase tracking-wider ${selectedThinker.color} font-bold flex items-center gap-1.5`}>
                  <Sparkles className="w-3.5 h-3.5" /> B.Y. ÇETİN MÜHENDİSLİK TEZAHÜRÜ
                </span>
                <h4 className="text-base font-bold text-white font-[family-name:var(--font-display)]">
                  Teorinin Kod ve Donanımdaki Karşılığı
                </h4>
                <p className="text-sm text-white/90 font-sans leading-relaxed pt-2 font-medium">
                  {selectedThinker.bycManifestation}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* YENİ MODÜL 2: SOKRATİK TURING SİMÜLATÖRÜ & TEKNO-ETİK ÇIKMAZLAR */}
      <section className="space-y-8 p-7 md:p-10 rounded-3xl border border-rose-500/30 bg-black/75 backdrop-blur-xl shadow-[0_0_50px_rgba(244,63,94,0.08)]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-rose-400 mb-2">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>SOKRATİK SİBERNETİK SİMÜLATÖRÜ // TEKNO-ETİK ÇIKMAZLAR</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-display)] text-white">
              Yapay Zekâ ve Otonomide Ontolojik İkilemler
            </h2>
          </div>
          <span className="text-xs font-mono text-white/40">
            ETİK, GÜVENLİK VE VAROLUŞ TESTİ
          </span>
        </div>

        {/* Dilemma Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {SOCRATIC_DILEMMAS.map((dilemma) => {
            const isSelected = activeDilemmaId === dilemma.id;
            return (
              <button
                key={dilemma.id}
                onClick={() => {
                  setActiveDilemmaId(dilemma.id);
                  playSound('access');
                }}
                className={`p-4 rounded-xl text-left border transition-all ${
                  isSelected
                    ? "border-rose-400 bg-rose-500/15 text-white shadow-[0_0_20px_rgba(244,63,94,0.2)]"
                    : "border-white/10 text-white/60 hover:text-white hover:border-white/20 bg-white/[0.02]"
                }`}
              >
                <span className="text-[10px] font-mono text-rose-400 block mb-1">
                  {dilemma.category}
                </span>
                <h4 className="text-sm font-bold font-[family-name:var(--font-display)] line-clamp-1">
                  {dilemma.title}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Dilemma Inspection Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDilemma.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* The Question */}
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-rose-400/30">
              <span className="text-xs font-mono text-rose-400 font-bold block mb-1">
                SOKRATİK VAROLUŞSAL SORU:
              </span>
              <p className="text-lg md:text-xl text-white font-serif font-medium leading-relaxed">
                “{selectedDilemma.question}”
              </p>
            </div>

            {/* Pragmatic vs Philosophical */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Pragmatic */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                <span className="text-xs font-mono text-white/40 uppercase block">
                  01 // {selectedDilemma.thePragmaticView.title}
                </span>
                <p className="text-sm text-white/70 leading-relaxed font-sans">
                  {selectedDilemma.thePragmaticView.description}
                </p>
                <div className="pt-2 border-t border-white/10 text-xs font-mono text-amber-400/80">
                  <strong className="text-amber-400">Risk & Kör Nokta:</strong> {selectedDilemma.thePragmaticView.risk}
                </div>
              </div>

              {/* Philosophical */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                <span className="text-xs font-mono text-white/40 uppercase block">
                  02 // Felsefi Eleştiri ({selectedDilemma.thePhilosophicalCritique.thinker})
                </span>
                <div className="text-xs font-mono text-rose-400">
                  Kavram: {selectedDilemma.thePhilosophicalCritique.concept}
                </div>
                <p className="text-sm text-white/70 leading-relaxed font-sans">
                  {selectedDilemma.thePhilosophicalCritique.critique}
                </p>
              </div>
            </div>

            {/* B.Y. Çetin Sentezi */}
            <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-rose-500/10 via-neon-blue/10 to-transparent border border-neon-blue/40 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-neon-blue font-bold">
                <Sparkles className="w-4 h-4" />
                <span>B.Y. ÇETİN SENTEZİ & DOKTRİNEL HÜKÜM</span>
              </div>
              <blockquote className="text-base md:text-lg text-white font-mono italic leading-relaxed">
                {selectedDilemma.theBycSynthesis.axiom}
              </blockquote>
              <p className="text-sm text-white/80 font-sans leading-relaxed">
                {selectedDilemma.theBycSynthesis.argumentation}
              </p>
              <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span><strong>Mühendislik Aksiyonu:</strong> {selectedDilemma.theBycSynthesis.engineeringAction}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* 8 Temel Doktrinel Sütun (Octagram) */}
      <section className="space-y-8">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-accent">OCTAGRAM // 8 TEMEL ONTOLOJİK SÜTUN</span>
            <h2 className="text-2xl md:text-4xl font-bold font-[family-name:var(--font-display)] text-white mt-1">
              Teknoloji Felsefesi ve Sibernetik Aksisler
            </h2>
          </div>
          <span className="text-xs font-mono text-white/40 hidden sm:inline">01 - 08 TEOREMLER</span>
        </div>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {PHILOSOPHICAL_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isFullWidth = idx === 0 || idx === 7;

            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className={`p-7 md:p-8 rounded-2xl border ${pillar.border} ${pillar.bg} transition-all hover:shadow-[0_0_30px_rgba(0,243,255,0.1)] flex flex-col justify-between ${
                  isFullWidth ? "lg:col-span-2" : ""
                }`}
              >
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 ${pillar.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono text-white/40 block">DOKTRİN #{pillar.roman}</span>
                        <h3 className="text-xl md:text-2xl font-bold text-white font-[family-name:var(--font-display)]">
                          {pillar.title}
                        </h3>
                      </div>
                    </div>
                    <span className={`text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-white/5 ${pillar.color} border border-white/10`}>
                      {pillar.sub}
                    </span>
                  </div>

                  {/* Felsefi Referans */}
                  <div className="text-[11px] font-mono text-white/40 flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-accent" />
                    <span>REFERANSLAR: <strong>{pillar.philosophers}</strong></span>
                  </div>

                  {/* Tez */}
                  <div className="p-4 rounded-xl bg-black/50 border border-white/10 font-mono text-xs text-white/90 leading-relaxed italic">
                    {pillar.thesis}
                  </div>

                  {/* Detay Açıklama */}
                  <p className="text-sm md:text-base leading-relaxed text-white/70 font-sans">
                    {pillar.text}
                  </p>

                  {/* Mühendislik Tezahürü */}
                  <div className="p-3 bg-white/[0.03] border border-white/10 rounded-lg text-xs font-mono text-white/60">
                    <span className="text-accent font-bold">MÜHENDİSLİK TEZAHÜRÜ: </span>
                    <span>{pillar.engineeringManifestation}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* YENİ MODÜL 3: SİBERNETİK VE TEKNOLOJİ FELSEFESİ SÖZLÜĞÜ */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">
              <Bookmark className="w-3.5 h-3.5" />
              <span>GLOSSARIUM // KAVRAMLAR VE ETİMOLOJİ SÖZLÜĞÜ</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-display)] text-white">
              Sibernetik ve Teknoloji Ontolojisi Sözlüğü
            </h2>
          </div>
          <span className="text-xs font-mono text-white/40">
            8 KİLİT EPİSTEMOLOJİK KAVRAM
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {CYBER_GLOSSARY.map((item, idx) => (
            <motion.div
              key={item.term}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              className="p-5 rounded-2xl bg-white/[0.025] border border-white/10 hover:border-emerald-400/40 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono text-emerald-400 block mb-1">
                  {item.origin}
                </span>
                <h4 className="text-lg font-bold text-white font-[family-name:var(--font-display)]">
                  {item.term}
                </h4>
                <div className="text-[11px] font-mono text-white/40 italic mb-3">
                  {item.greekOrGerman}
                </div>
                <p className="text-xs text-white/70 leading-relaxed font-sans">
                  {item.definition}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-white/50">
                <span className="text-accent font-bold">Mühendislik:</span> {item.engineeringParallel}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Aforizmalar Şeridi */}
      <section className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-white/[0.03] via-accent/[0.04] to-transparent border border-white/10 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>FELSEFİ AFORİZMALAR VE MÜHENDİSLİK HÜKÜMLERİ (10 AFORİZMA)</span>
          </div>
          <span className="text-xs font-mono text-white/40 hidden sm:inline">Bahattin Yunus Çetin</span>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PHILOSOPHICAL_APHORISMS.map((quote, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.02 }}
              className="p-5 rounded-xl bg-black/60 border border-white/10 flex flex-col justify-between hover:border-accent/40 transition-colors shadow-sm"
            >
              <p className="text-sm text-white/85 font-mono leading-relaxed">
                {quote}
              </p>
              <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-accent/70">
                <span>AFORİZMA #{i + 1 < 10 ? `0${i + 1}` : i + 1}</span>
                <span>— B.Y. Çetin</span>
              </div>
            </motion.div>
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
          <Link href="/comms" className="hidden sm:inline-flex items-center gap-2 text-xs font-mono text-accent hover:underline">
            Doğrudan İletişim <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.025]">
          {profileData.timeline.slice(0, 5).map((item) => (
            <div key={`${item.year}-${item.title}`} className="grid gap-2 p-5 md:grid-cols-[150px_1fr] md:p-6 hover:bg-white/[0.02] transition-colors">
              <div className="font-mono text-xs text-accent font-bold">{item.year}</div>
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
