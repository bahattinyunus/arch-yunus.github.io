import { CheckCircle2, Github, Linkedin, Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { profileData } from "@/lib/data";

const email = "bahattinyunusct1@gmail.com";

export default function Comms() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(String(form.get("subject") || "Yeni proje fikri"));
    const body = encodeURIComponent(`Merhaba Bahattin,\n\n${String(form.get("message") || "")}`);
    setSent(true);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="space-y-12 pb-12">
      <header className="max-w-3xl"><div className="section-eyebrow">Bağlantı kuralım</div><h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-7xl">İletişim</h1><p className="mt-5 max-w-2xl text-base leading-8 text-white/55 md:text-lg">Bir fikir, iş birliği ya da sadece teknoloji üzerine iyi bir sohbet için bana yazabilirsiniz.</p></header>

      <div className="grid gap-6 lg:grid-cols-[.78fr_1.22fr]">
        <aside className="rounded-2xl border border-white/10 bg-white/[.035] p-7">
          <h2 className="text-2xl font-semibold">Doğrudan ulaş</h2>
          <p className="mt-3 text-sm leading-6 text-white/50">En hızlı dönüş için e-posta veya LinkedIn üzerinden yazabilirsiniz.</p>
          <div className="mt-7 space-y-3">
            <a href={`mailto:${email}`} className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/10 p-4 transition hover:border-[#b9f36b]/40"><span className="grid h-10 w-10 place-items-center rounded-lg bg-[#b9f36b]/10 text-[#b9f36b]"><Mail size={18} /></span><span><strong className="block text-sm text-white">E-posta</strong><small className="mt-1 block text-xs text-white/45">{email}</small></span></a>
            <a href={profileData.personal.linkedin_url} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/10 p-4 transition hover:border-[#b9f36b]/40"><span className="grid h-10 w-10 place-items-center rounded-lg bg-[#b9f36b]/10 text-[#b9f36b]"><Linkedin size={18} /></span><span><strong className="block text-sm text-white">LinkedIn</strong><small className="mt-1 block text-xs text-white/45">Profesyonel ağım</small></span></a>
            <a href={profileData.personal.github_url} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/10 p-4 transition hover:border-[#b9f36b]/40"><span className="grid h-10 w-10 place-items-center rounded-lg bg-[#b9f36b]/10 text-[#b9f36b]"><Github size={18} /></span><span><strong className="block text-sm text-white">GitHub</strong><small className="mt-1 block text-xs text-white/45">Açık kaynak çalışmalarım</small></span></a>
          </div>
          <div className="mt-7 flex items-center gap-2 border-t border-white/10 pt-5 text-xs text-white/40"><MapPin size={14} className="text-[#b9f36b]" /> Türkiye · Uzaktan çalışmaya açık</div>
        </aside>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-white/[.035] p-7 md:p-9">
          <div className="flex items-start justify-between gap-4"><div><h2 className="text-2xl font-semibold">Bir mesaj bırak</h2><p className="mt-2 text-sm text-white/45">Mesajın cihazındaki e-posta uygulamasında hazırlanır.</p></div><Send className="mt-1 text-[#b9f36b]" size={20} /></div>
          <div className="mt-8 grid gap-5">
            <label className="grid gap-2 text-xs font-semibold uppercase tracking-[.12em] text-white/45">Konu<input name="subject" required placeholder="Nasıl birlikte çalışabiliriz?" className="rounded-xl border border-white/12 bg-black/15 px-4 py-3 text-sm font-normal normal-case tracking-normal text-white outline-none transition placeholder:text-white/25 focus:border-[#b9f36b]/50" /></label>
            <label className="grid gap-2 text-xs font-semibold uppercase tracking-[.12em] text-white/45">Mesajın<textarea name="message" required rows={7} placeholder="Fikrinden, probleminden veya projenin bağlamından bahset..." className="resize-y rounded-xl border border-white/12 bg-black/15 px-4 py-3 text-sm font-normal normal-case tracking-normal text-white outline-none transition placeholder:text-white/25 focus:border-[#b9f36b]/50" /></label>
          </div>
          <button type="submit" className="button-primary mt-6">{sent ? <>E-posta hazır <CheckCircle2 size={16} /></> : <>Mesajı hazırla <Send size={15} /></>}</button>
        </form>
      </div>
    </div>
  );
}
