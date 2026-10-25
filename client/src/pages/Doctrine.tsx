import { motion } from "framer-motion";
import { ArrowUpRight, BrainCircuit, Compass, GraduationCap, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { profileData } from "@/lib/data";

const principles = [
  { title: "Sadeleştir", text: "Karmaşık problemleri küçük, anlaşılır ve ölçülebilir parçalara ayırırım.", icon: Compass },
  { title: "Üret ve doğrula", text: "Fikri uzun süre anlatmak yerine hızlıca prototipler, gerçek kullanım üzerinden geliştiririm.", icon: BrainCircuit },
  { title: "Sorumluluk al", text: "Güvenlik, sürdürülebilirlik ve etik kararları ürünün sonradan eklenecek parçaları olarak görmem.", icon: ShieldCheck },
];

export default function Doctrine() {
  return (
    <div className="space-y-14 pb-12">
      <header className="grid gap-10 lg:grid-cols-[1.12fr_.88fr] lg:items-end">
        <div><div className="section-eyebrow">Hakkımda</div><h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl">Kod yazmaktan önce problemi anlamaya çalışıyorum.</h1></div>
        <p className="max-w-md text-base leading-8 text-white/55 md:text-lg">Ben Bahattin Yunus Çetin. ODTÜ Bilgisayar ve Öğretim Teknolojileri Eğitimi (BÖTE) ve Hacettepe öğrencisi; yapay zekâ, otonom sistemler ve derin teknoloji sistemleri kurmayı seven bir üreticiyim.</p>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1fr_.8fr]">
        <div className="rounded-2xl border border-white/10 bg-white/[.035] p-7 md:p-9"><div className="flex items-center gap-3 text-[#b9f36b]"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#b9f36b]/10"><GraduationCap size={20} /></span><span className="font-mono text-xs uppercase tracking-[.14em]">Kısa hikâyem</span></div><div className="mt-7 space-y-5 text-base leading-8 text-white/60"><p>ODTÜ'de Bilgisayar ve Öğretim Teknolojileri Eğitimi (BÖTE) ve Hacettepe Üniversitesi'nde öğrenimimi sürdürüyorum. Karadeniz Teknik Üniversitesi Yazılım Mühendisliği ve Recep Tayyip Erdoğan Üniversitesi ile yazılım, veri bilimi ve donanım odaklı projeler geliştiriyor; yapay zekâ, siber güvenlik ve gömülü sistemler ekseninde çalışmalarımı derinleştiriyorum; yapay zekâ, fizik/kuantum modelleme, siber güvenlik, enerji optimizasyonu ve sistem mimarisi ekseninde kendi projelerimle derinleştiriyorum.</p><p>Bugün odağım, güçlü teknolojileri gerçek problemlere dokunan ürünlere dönüştürmek. Arat Labs, Tulpar Aero-Dynamics, Arkıl Games, MERL, Budak ve Anka Silicon Dynamics çatıları altında daha erişilebilir, daha verimli ve bağımsız otonom/AI sistemleri üzerine çalışıyorum.</p></div></div>
        <div className="relative overflow-hidden rounded-2xl border border-[#b9f36b]/20 bg-[#b9f36b]/[.06] p-7 md:p-9"><div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#b9f36b]/10 blur-3xl" /><p className="relative text-2xl font-medium leading-10 text-white md:text-3xl">“İyi teknoloji, insanların daha iyi düşünmesine ve üretmesine alan açar.”</p><div className="relative mt-8 font-mono text-xs text-[#b9f36b]">B.Y.Ç. · 2026</div></div>
      </section>

      <section><div className="section-eyebrow">Nasıl çalışıyorum?</div><div className="mt-6 grid gap-4 md:grid-cols-3">{principles.map((item, index) => { const Icon = item.icon; return <motion.div key={item.title} className="rounded-2xl border border-white/10 bg-white/[.03] p-6" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }}><Icon size={20} className="text-[#b9f36b]" /><h2 className="mt-6 text-xl font-semibold">{item.title}</h2><p className="mt-3 text-sm leading-6 text-white/50">{item.text}</p></motion.div>; })}</div></section>

      <section><div className="flex items-end justify-between gap-4"><div><div className="section-eyebrow">Yolculuk</div><h2 className="mt-3 text-3xl font-semibold">Şimdiye kadar</h2></div><Link href="/comms" className="hidden items-center gap-2 text-sm text-[#b9f36b] md:flex">Bağlantı kur <ArrowUpRight size={15} /></Link></div><div className="mt-6 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[.025]">{profileData.timeline.slice(0, 5).map((item) => <div key={`${item.year}-${item.title}`} className="grid gap-2 p-5 md:grid-cols-[150px_1fr] md:p-6"><div className="font-mono text-xs text-[#b9f36b]">{item.year}</div><div><h3 className="text-lg font-semibold">{item.title}</h3><p className="mt-1 text-sm text-white/45">{item.company}</p><p className="mt-3 max-w-3xl text-sm leading-6 text-white/55">{item.description}</p></div></div>)}</div></section>
    </div>
  );
}
