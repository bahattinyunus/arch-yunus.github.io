import { CheckCircle2, Github, Linkedin, Mail, MapPin, Phone, Send, Sparkles, MessageSquare, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { profileData } from "@/lib/data";

const email = "bahattinyunusct1@gmail.com";
const phone = "+90 551 668 86 24";

export default function Comms() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(String(form.get("subject") || "Yeni Proje / Mühendislik İletişimi"));
    const body = encodeURIComponent(`Merhaba Bahattin Yunus,\n\n${String(form.get("message") || "")}\n\nGönderen: ${String(form.get("sender") || "")}`);
    setSent(true);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="space-y-12 pb-16">
      <header className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>GÜVENLİ TAKTİK İLETİŞİM KANALI // COMMS</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white font-[family-name:var(--font-display)]">
          İletişim & İş Birliği
        </h1>
        <p className="max-w-2xl text-base md:text-lg leading-relaxed text-white/60 font-mono">
          Yapay zekâ, gömülü sistemler, otonom hava/deniz araçları (İHA-1) ve derin teknoloji projeleri için doğrudan bağlantı kurabilirsiniz.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr]">
        {/* Sol Panel: Doğrudan Kanallar */}
        <aside className="p-7 md:p-8 rounded-2xl glass-surface space-y-6">
          <div>
            <span className="text-xs font-mono text-accent uppercase tracking-wider block">DOĞRUDAN ERİŞİM</span>
            <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-display)] mt-1">Resmi Kanallar</h2>
            <p className="mt-2 text-xs text-white/50 leading-relaxed font-mono">
              En hızlı dönüş için e-posta veya telefon/WhatsApp üzerinden yazabilirsiniz.
            </p>
          </div>

          <div className="space-y-3 font-mono">
            <a 
              href={`mailto:${email}`} 
              className="flex items-center gap-3.5 p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-accent/40 hover:bg-white/5 transition-all group"
            >
              <span className="p-2.5 rounded-lg bg-accent/10 border border-accent/30 text-accent group-hover:scale-110 transition-transform">
                <Mail size={18} />
              </span>
              <div>
                <strong className="block text-sm text-white font-sans group-hover:text-accent transition-colors">E-posta</strong>
                <small className="text-xs text-white/50">{email}</small>
              </div>
            </a>

            <a 
              href={`tel:${phone.replace(/\s+/g, '')}`} 
              className="flex items-center gap-3.5 p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-emerald-400/40 hover:bg-white/5 transition-all group"
            >
              <span className="p-2.5 rounded-lg bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 group-hover:scale-110 transition-transform">
                <Phone size={18} />
              </span>
              <div>
                <strong className="block text-sm text-white font-sans group-hover:text-emerald-400 transition-colors">Telefon & GSM</strong>
                <small className="text-xs text-white/50">{phone}</small>
              </div>
            </a>

            <a 
              href={profileData.personal.linkedin_url} 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-3.5 p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-blue-400/40 hover:bg-white/5 transition-all group"
            >
              <span className="p-2.5 rounded-lg bg-blue-400/10 border border-blue-400/30 text-blue-400 group-hover:scale-110 transition-transform">
                <Linkedin size={18} />
              </span>
              <div>
                <strong className="block text-sm text-white font-sans group-hover:text-blue-400 transition-colors">LinkedIn</strong>
                <small className="text-xs text-white/50">12,640+ Profesyonel Ağ</small>
              </div>
            </a>

            <a 
              href={profileData.personal.github_url} 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-3.5 p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-white/30 hover:bg-white/5 transition-all group"
            >
              <span className="p-2.5 rounded-lg bg-white/10 border border-white/20 text-white group-hover:scale-110 transition-transform">
                <Github size={18} />
              </span>
              <div>
                <strong className="block text-sm text-white font-sans group-hover:text-accent transition-colors">GitHub</strong>
                <small className="text-xs text-white/50">231+ Açık Kaynak Repo</small>
              </div>
            </a>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50">
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-accent" /> Ankara, Türkiye
            </span>
            <span className="text-emerald-400 flex items-center gap-1">
              <ShieldCheck size={14} /> Şifreli / Doğrudan
            </span>
          </div>
        </aside>

        {/* Sağ Panel: Mesaj Gönderme Formu */}
        <form onSubmit={handleSubmit} className="p-7 md:p-9 rounded-2xl glass-surface space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-accent uppercase tracking-wider block">PROJE VEYA İLETİŞİM</span>
              <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-display)] mt-1">Bir Mesaj Bırakın</h2>
              <p className="mt-1 text-xs text-white/50 font-mono">
                Mesajınız cihazınızdaki e-posta istemcisiyle güvenli biçimde oluşturulur.
              </p>
            </div>
            <MessageSquare className="text-accent mt-1" size={24} />
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-white/60">Adınız / Kurumunuz</label>
              <input 
                name="sender" 
                required 
                placeholder="Örn: Dr. Ahmet Yılmaz / Savunma Ar-Ge" 
                className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-accent transition-colors placeholder:text-white/30 font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-white/60">Konu</label>
              <input 
                name="subject" 
                required 
                placeholder="Örn: Otonom İHA Algoritması / Model Budama İş Birliği" 
                className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-accent transition-colors placeholder:text-white/30 font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-white/60">Mesajınız</label>
              <textarea 
                name="message" 
                required 
                rows={6} 
                placeholder="Fikrinizden, teknik problemden veya ortak çalışma önerinizden bahsedin..." 
                className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-accent transition-colors placeholder:text-white/30 font-mono resize-y"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl border border-accent/50 bg-accent text-black font-mono text-sm font-bold hover:bg-[#e4ff6b] transition-all shadow-[0_0_20px_rgba(214,255,63,0.25)]"
          >
            {sent ? (
              <>E-posta İstemciniz Açılıyor <CheckCircle2 size={16} /></>
            ) : (
              <>Mesajı İlet <Send size={15} /></>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
