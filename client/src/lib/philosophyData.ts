// client/src/lib/philosophyData.ts
// ============================================================================
// SİBERNETİK VE TEKNOLOJİ FELSEFESİ ONTOLOJİK BİLGİ TABANI
// Bahattin Yunus Çetin // Metal Yaka v5.0
// ODTÜ BÖTE & Hacettepe Üniversitesi
// ============================================================================

export interface PhilosopherThinker {
  id: string;
  name: string;
  era: string;
  school: string;
  magnumOpus: string;
  quote: string;
  coreConcept: string;
  cyberneticInterpretation: string;
  bycManifestation: string;
  tags: string[];
  color: string;
  borderColor: string;
  bgGlow: string;
}

export interface SocraticDilemma {
  id: string;
  title: string;
  category: string;
  iconName: string;
  question: string;
  thePragmaticView: {
    title: string;
    description: string;
    risk: string;
  };
  thePhilosophicalCritique: {
    thinker: string;
    concept: string;
    critique: string;
  };
  theBycSynthesis: {
    axiom: string;
    argumentation: string;
    engineeringAction: string;
  };
}

export interface CyberGlossaryTerm {
  term: string;
  greekOrGerman: string;
  origin: string;
  definition: string;
  engineeringParallel: string;
}

export const PHILOSOPHER_THINKERS: PhilosopherThinker[] = [
  {
    id: "simondon",
    name: "Gilbert Simondon",
    era: "1924 – 1989",
    school: "Fransız Teknoloji ve Ontoloji Felsefesi",
    magnumOpus: "Du mode d'existence des objets techniques (1958)",
    quote: "“Teknik nesne insan ile doğa arasında yabancılaştırıcı bir araç değil; insanın dünyayla kurduğu trans-bireysel varoluş modudur.”",
    coreConcept: "Bireyleşme (Individuation), Alakalılaşma (Concrétisation) ve Hylomorfizmin Aşılması",
    cyberneticInterpretation: "Teknik bir sistem parça yığını değildir; bileşenlerinin birbirine kenetlenerek organik bir bütünlük kazandığı 'alakalılaşma' sürecidir. Saf yazılım veya saf donanım ayrımı yanlıştır; zeka ancak iki kutbun kaynaşmasıyla bireyleşir.",
    bycManifestation: "Tulpar 6-DoF İHA otonomi mimarisi ve Budak model ailesi; kodun donanımın kısıtlarıyla bütünleştiği Simondoncu tekno-estetik bireyleşme örneğidir.",
    tags: ["Individuation", "Hylomorphism", "Concrétisation", "Trans-individual"],
    color: "text-cyan-400",
    borderColor: "border-cyan-400/40",
    bgGlow: "bg-cyan-400/10"
  },
  {
    id: "heidegger",
    name: "Martin Heidegger",
    era: "1889 – 1976",
    school: "Fenomenoloji ve Varoluşsal Ontoloji",
    magnumOpus: "Die Frage nach der Technik (1954)",
    quote: "“Teknolojinin özü hiçbir şekilde teknolojik değildir. Gestell dünyayı hazır bekleyen bir hammadde deposu (Bestand) haline getirir.”",
    coreConcept: "Gestell (Çerçeveleme), Bestand (Elde Hazır Kaynak), Poiesis ve Gelassenheit",
    cyberneticInterpretation: "Merkeziyetçi bulut platformları ve veri devleri, insan zihnini, dikkatini ve biyolojisini tüketilebilir bir ham petrole dönüştürdü. Teknoloji Gestell zindanına dönüştüğünde, insan özne olmaktan çıkar. Bundan çıkışın yolu teknolojiyi bir 'Poiesis' (hakikati açığa çıkaran şiirsel yaratım) kılmaktır.",
    bycManifestation: "Açık kaynak 231+ bağımsız GitHub deposu, yerel koşan WebGPU modelleri ve telemetri sızıntısız C++ çekirdekleri; Gestell'in zincirlerine karşı bir Poiesis direnişidir.",
    tags: ["Gestell", "Bestand", "Poiesis", "Gelassenheit"],
    color: "text-rose-400",
    borderColor: "border-rose-400/40",
    bgGlow: "bg-rose-400/10"
  },
  {
    id: "stiegler",
    name: "Bernard Stiegler",
    era: "1952 – 2020",
    school: "Çağdaş Tekno-Felsefe ve Bilişsel Ekoloji",
    magnumOpus: "La Technique et le Temps (1994)",
    quote: "“İnsan teknik olmadan insan olamaz. Teknik, biyolojik kalıtımın ötesindeki üçüncü hafızamızdır (Epiphylogenesis).”",
    coreConcept: "Epifilojenez (Teknik Dış Hafıza), Pharmakon (Zehir ve İlaç), Proletaryalaşma",
    cyberneticInterpretation: "Teknoloji bir 'Pharmakon'dur: Hem zehir hem de panzehirdir. Büyük dil modelleri insanın düşünme yetisini felç edip genel bir zihinsel köleliğe (proletaryalaşma) yol açabilir; ya da tam tersine yerel uç birimlerde insan bilişini yüz kat hızlandıran bir negentropik kalkan olabilir.",
    bycManifestation: "ODTÜ BÖTE pedagojisi ve Budak Edge-AI Lab: Öğretim teknolojilerini insanı aptallaştıran algoritmik hapishanelerden çıkarıp, bilinci güçlendiren epistemolojik protezlere dönüştürmek.",
    tags: ["Pharmakon", "Epiphylogenesis", "Proletarianization", "Noopolitics"],
    color: "text-amber-400",
    borderColor: "border-amber-400/40",
    bgGlow: "bg-amber-400/10"
  },
  {
    id: "wiener",
    name: "Norbert Wiener",
    era: "1894 – 1964",
    school: "Sibernetik ve Bilişim Kuramı",
    magnumOpus: "Cybernetics: Or Control and Communication in the Animal and the Machine (1948)",
    quote: "“Bizler kalıcı maddeler değil; kendi kendisini sürdüren girdaplarız. Kaosun ortasında bir düzen adacığıyız.”",
    coreConcept: "Geri Besleme Döngüleri (Feedback Loops), Negentropi ve Homeostaz",
    cyberneticInterpretation: "Termodinamik gereği evren kaçınılmaz olarak çözülmeye, gürültüye ve ölüme (entropi) sürüklenir. Sibernetik ise geri besleme döngüleri ve bilgi akışı yoluyla bu çözülmeye karşı yerel kararlılık (homeostaz) ve negatif entropi adacıkları kurma bilimidir.",
    bycManifestation: "MAVLink2 ve Trabzon Protocol telemetrisi, PX4/ROS2 deterministik PID kontrol döngüleri ve sürü İHA haberleşme optimizasyonu.",
    tags: ["Cybernetics", "Negentropy", "Feedback Loops", "Homeostasis"],
    color: "text-neon-blue",
    borderColor: "border-neon-blue/40",
    bgGlow: "bg-neon-blue/10"
  },
  {
    id: "flusser",
    name: "Vilém Flusser",
    era: "1920 – 1991",
    school: "Medya Felsefesi ve Bilişim Ontolojisi",
    magnumOpus: "Für eine Philosophie der Fotografie & Ins Universum der technischen Bilder",
    quote: "“Aparatın mantığını anlamayan insan, aparatı yönettiğini sanırken bizzat aparat tarafından programlanır.”",
    coreConcept: "Aparat Teorisi, Programlayan vs. Programlanan, Kara Kutu Putperestliği",
    cyberneticInterpretation: "Kullanıcılar kapalı yazılımların arayüzünde sadece 'izin verilen' butonlara basan otomatlara dönüştü. Kara kutunun (Black Box) içini bilmeyen her insan, o kutunun programcısı değil, programlanan nesnesidir. Hakiki özgürlük, kara kutunun kapağını açıp transistör ve matris seviyesinde müdahale edebilmektir.",
    bycManifestation: "Açıklanabilir Yapay Zeka (XAI), tersine mühendislik (White Hat / Siber Vatan) ve register düzeyinde RISC-V mikrodenetleyici programlama.",
    tags: ["Apparatus", "Black Box", "Programmer", "Technical Image"],
    color: "text-emerald-400",
    borderColor: "border-emerald-400/40",
    bgGlow: "bg-emerald-400/10"
  },
  {
    id: "anders",
    name: "Günther Anders",
    era: "1902 – 1992",
    school: "Eleştirel Teknoloji Felsefesi ve İnsan Ontolojisi",
    magnumOpus: "Die Antiquiertheit des Menschen (İnsanın Eskimişliği, 1956)",
    quote: "“İnsan kendi ürettiği kusursuz, pürüzsüz ve yorulmaz makinelerin karşısında ontolojik bir eziklik duymaya başladı: Prometheusçu Utanç.”",
    coreConcept: "Prometheusçu Utanç (Promethean Shame) ve İnsanın Eskimişliği",
    cyberneticInterpretation: "İnsan biyolojisi yavaş, kusurlu ve yorulabilirdir; oysa yapay zeka ve otonom sistemler mikrosaniyede milyarlarca hesap yapar. İnsanın kendi kusursuz yarattığı ürün karşısında aşağılık hissine kapılması ontolojik bir tehlikedir. Teknoloji insanın yerine geçmek için değil, insan bilincinin hizmetkarı olmak için tasarlanmalıdır.",
    bycManifestation: "Human-in-the-Loop (HIL) otonomi mimarisi; Tulpar aviyoniklerinde insan pilotunun karar üstünlüğünü ve etik vetosunu koruyan emniyet mandalları.",
    tags: ["Promethean Shame", "Antiquated Human", "Human-in-the-Loop"],
    color: "text-purple-400",
    borderColor: "border-purple-400/40",
    bgGlow: "bg-purple-400/10"
  },
  {
    id: "haraway",
    name: "Donna Haraway",
    era: "1944 – Günümüz",
    school: "Posthümanizm ve Sibernetik Teori",
    magnumOpus: "A Cyborg Manifesto (1985)",
    quote: "“Yirminci yüzyılın sonlarında hepimiz meleziz; makine ile organizmanın teorileştirilmiş ve imal edilmiş melezleriyiz; kısacası siborglarız.”",
    coreConcept: "Siborg Figürü, Doğa/Kültür ve Beden/Makine İkiliklerinin Aşılması",
    cyberneticInterpretation: "İnsan ve teknoloji iki ayrı düşman kutup değildir. Kodlarımız, sensörlerimiz ve yapay zeka modellerimiz insanın nörolojik ve biyolojik varoluşunun doğal protezleridir. 'Metal Yaka' tanımı bu melezliğin hem fiziksel hem zihinsel işçilikle onurlu bir sentezidir.",
    bycManifestation: "Metal Yaka v5.0 doktrini: Zihinsel algoritma tasarımı ile fiziksel lehim, donanım montajı ve saha operasyonunun bölünmez birliği.",
    tags: ["Cyborg", "Posthumanism", "Hybridity", "Metal Collar"],
    color: "text-pink-400",
    borderColor: "border-pink-400/40",
    bgGlow: "bg-pink-400/10"
  },
  {
    id: "turing-searle",
    name: "Alan Turing & John Searle",
    era: "1912 – 1954 / 1932 – Günümüz",
    school: "Bilişsel Bilim, Mantık ve Zihin Felsefesi",
    magnumOpus: "Computing Machinery and Intelligence (1950) & Chinese Room Argument (1980)",
    quote: "“Bir makinenin simgeleri kusursuzca manipüle etmesi (sözdizim), onların ne anlama geldiğini bildiğini (anlambilim) kanıtlamaz.”",
    coreConcept: "Turing Testi, Hesaplanabilirlik Sınırları, Çin Odası ve Niyetlilik (Intentionality)",
    cyberneticInterpretation: "Modern LLM'ler birer 'süper Çin Odası'dır; olasılıksal token dizilerini kusursuzca dizerler ancak ontolojik bir anlama veya acı/sevinç bilincine sahip değillerdir. Yapay zekaya ilahi bir bilinç atfetmek safsatadır; makine matematiksel bir fonksiyon kestiricidir.",
    bycManifestation: "Stokastik sinir ağları ile deterministik formel doğrulamanın ayrımı; Arat Labs dil modellerinde semantik güvenilirlik filtreleri.",
    tags: ["Chinese Room", "Syntax vs Semantics", "Intentionality", "Turing"],
    color: "text-yellow-400",
    borderColor: "border-yellow-400/40",
    bgGlow: "bg-yellow-400/10"
  }
];

export const SOCRATIC_DILEMMAS: SocraticDilemma[] = [
  {
    id: "autonomous-killswitch",
    title: "Otonom Vuruş ve Karar Devri Çıkmazı",
    category: "SAVUNMA SİBERNETİĞİ & ETİK",
    iconName: "ShieldAlert",
    question: "Elektronik harp altında yer istasyonuyla bağı tamamen kopan bir İHA; dost unsurları korumak adına ölümcül angajman kararını kendi yerel yapay zekâ modeline devretmeli midir?",
    thePragmaticView: {
      title: "Pragmatist & Taktik Yaklaşım",
      description: "Haberleşmenin koptuğu saniyelerde makinenin tereddüt etmesi personelin hayatına mal olabilir. Milisaniyeler içinde hedef teşhis edip otonom angajman icra etmek askeri üstünlük sağlar.",
      risk: "Sahte bayrak (spoofing) saldırısı veya latent uzay halüsinasyonu durumunda geri dönülemez sivil can kaybı ve etik felaket."
    },
    thePhilosophicalCritique: {
      thinker: "Martin Heidegger & Günther Anders",
      concept: "Hesaplayıcı Akıl (Rechnendes Denken) & Ahlaki Körleşme",
      critique: "Ölüm kalım kararı gibi ontolojik bir sorumluluk salt istatistiksel bir olasılık dağılımına (p > 0.95) indirgenemez. Sorumluluk alamayan makineye can alma yetkisi vermek, ahlakın sonudur."
    },
    theBycSynthesis: {
      axiom: "“Makine hesaplar, optimize eder ve korur; fakat varoluşsal karar ve vicdani vebal daima insana aittir.”",
      argumentation: "Tulpar mimarisinde savunduğum prensip: İletişim kopsa dahi otonom yapay zeka sadece caydırıcı kaçınma, rota koruma ve kalkan manevraları icra edebilir. Angajman mandalı ancak kriptografik insan onayıyla serbest kalabilir.",
      engineeringAction: "C++20 SIL-3 seviyesinde 'Hardware-Enforced Engagement Interlock' ve sıfır-toleranslı insan doğrulama protokolü."
    }
  },
  {
    id: "scaling-vs-vianegativa",
    title: "Hiper-Ölçekleme vs. Via Negativa (Eksiltici Zekâ)",
    category: "BİLİŞİMSEL TERMODİNAMİK",
    iconName: "Cpu",
    question: "Hakiki yapay zeka yüz milyarlarca parametre ve nükleer santral gücünde veri merkezleriyle mi doğar; yoksa kısıtlı kaynakla hayatta kalan damıtılmış öz-modellerle mi?",
    thePragmaticView: {
      title: "Brute-Force Scaling Tezi",
      description: "Daha fazla veri ve daha fazla GPU her zaman 'emergent abilities' (kendiliğinden beliren yetenekler) üretir. Zekâ kütlesel hesaplama gücünün doğrudan bir fonksiyonudur.",
      risk: "Gezegen ölçeğinde enerji tükenişi, tekelci bulut oligarşisi ve modellerin kendi ürettikleri sentetik gürültüde çöküşü (Model Collapse)."
    },
    thePhilosophicalCritique: {
      thinker: "Plotinus & Gilbert Simondon",
      concept: "Via Negativa (Eksiltme Yoluyla Arınma) & Alakalılaşma",
      critique: "Bir mermer bloğunu devasa kaya kütleleriyle büyütmek onu heykel yapmaz. Zekâ var olanı ezberlemekte değil; gereksiz gürültüyü silip kristalize özü tutabilmektedir."
    },
    theBycSynthesis: {
      axiom: "“Zekâ eklediğiniz parametre sayısında değil; vazgeçebildiğiniz gereksizliklerdedir.”",
      argumentation: "Budak Edge-AI projesindeki doktrinim: 70B bir modelin latent temsil gücünü %80 budama ve knowledge distillation ile 3B boyutunda uç birimlere sığdırmak. Hem termodinamik negentropi sağlar hem de bireyin cihazında tam gizlilik kurar.",
      engineeringAction: "AutoGPTQ / INT4 kuantizasyonu ve sıfır bulut bağımlılığıyla Raspberry Pi / Jetson üzerinde 40+ token/sn çıkarım."
    }
  },
  {
    id: "cloud-feudalism-sovereignty",
    title: "Veri Feodalizmi vs. Silikon Egemenliği",
    category: "SİYASAL ONTOLOJİ & SİBER GÜVENLİK",
    iconName: "ShieldCheck",
    question: "Tüm zihinsel ve endüstriyel üretim araçlarının 3 büyük küresel bulut tekelinin sunucularında kiralandığı bir çağda bağımsız bir millet ve hür bir fert var olabilir mi?",
    thePragmaticView: {
      title: "Bulut Konforu ve SaaS Mantığı",
      description: "Kendi veri merkezini kurmak pahalıdır. Bir API anahtarıyla saniyeler içinde son teknolojiye erişmek girişim hızını maksimize eder.",
      risk: "Bir ambargo, şalter indirimi veya siber savaş anında tüm ulusal sanayinin, savunmanın ve bankacılığın saniyeler içinde felç olması."
    },
    thePhilosophicalCritique: {
      thinker: "Bernard Stiegler & İbn Haldun",
      concept: "Genelleşmiş Proletaryalaşma & Asabiyet Çöküşü",
      critique: "Kendi araçlarını üretme bilgisini yitiren toplumlar 'proleterleşir'; yani aletinin nasıl çalıştığını bilmeyen modern kölelere dönüşürler. Asabiyet ve egemenlik, kendi çeliğini dövebilenlerindir."
    },
    theBycSynthesis: {
      axiom: "“Kendi derleyicisini, kendi telemetrisini ve kendi çipini üretmeyen; başkasının kurduğu simülasyonda figürandır.”",
      argumentation: "Açık kaynak milli Ar-Ge, Çelik MCU RISC-V çipi mimarisi ve Trabzon Protocol ikili haberleşme standardı ile dışa bağımlılığı sıfıra indirme kararlılığı.",
      engineeringAction: "Milli RISC-V C++ SDK'sı, yerel WebGPU çıkarım motorları ve dış ağa tamamen kapalı air-gapped savunma sistemleri."
    }
  },
  {
    id: "blackbox-vs-transparency",
    title: "Kara Kutu Putperestliği vs. Epistemolojik Şeffaflık",
    category: "BİLİM FELSEFESİ & EPISTEMOLOJİ",
    iconName: "Eye",
    question: "Doğruluk oranı %99 olan fakat neden o kararı aldığını hiçbir matematikçinin açıklayamadığı bir yapay zekâyı mahkemelerde veya hastanelerde hakem kılabilir miyiz?",
    thePragmaticView: {
      title: "Saf Pragmatist İstatistikçilik",
      description: "Sonuç çalışıyorsa metodun gizemi önemsizdir. İnsan beyni de bir kara kutudur ve insanlar hata yaparken bu model %99 doğru teşhis koymaktadır.",
      risk: "Önyargıların, görünmez halüsinasyonların ve sistemik adaletsizliklerin 'makine tarafsızlığı' maskesi altında sorgulanamaz dogmalara dönüşmesi."
    },
    thePhilosophicalCritique: {
      thinker: "Karl Popper & Vilém Flusser",
      concept: "Yanlışlanabilirlik İlkesi & Aparatın Büyüsü",
      critique: "Yanlışlanamayan ve gerekçelendirilemeyen her iddia bilim dışıdır. Kara kutuya teslimiyet, ortaçağ kahinlerine ve büyüye geri dönmektir."
    },
    theBycSynthesis: {
      axiom: "“Açıklanamayan yapay zeka ilahi bir hikmet değil; entelektüel tembelliğin inşa ettiği modern bir puttur.”",
      argumentation: "Açıklanabilir Yapay Zeka (XAI), gradyan aktivasyon haritaları ve şeffaf dikkat katmanları olmadan hiçbir kritik karar algoritmaya bırakılamaz. Mühendis gizeme secde eden değil, ışığı yakan kişidir.",
      engineeringAction: "Grad-CAM, integrated gradients ve C2PA kriptografik içerik şeffaflık protokollerinin her dağıtıma zorunlu kılınması."
    }
  }
];

export const CYBER_GLOSSARY: CyberGlossaryTerm[] = [
  {
    term: "Negentropi",
    greekOrGerman: "Negative Entropy (Schrödinger / Wiener)",
    origin: "Sibernetik & Termodinamik",
    definition: "Evrenin kaçınılmaz dağılma, gürültü ve çözülme eğilimine (entropi) karşı; bilgi, enerji ve yapısal nizam ile inşa edilen yerel düzen vahası.",
    engineeringParallel: "Bellek sızıntısız C++20 mimarisi, deterministik bellek blokları ve sıfır-kopyalama veri akışları."
  },
  {
    term: "Gestell",
    greekOrGerman: "Ge-stell (Alm. Çerçeveleme / Kurulu Düzen)",
    origin: "Martin Heidegger (Tekniğe İlişkin Soruşturma)",
    definition: "Modern teknolojinin dünyayı, doğayı ve insanı salt 'elde hazır bekleyen hammadde / rezerv güç' (Bestand) olarak algılama ve sömürme dayatması.",
    engineeringParallel: "Büyük teknoloji tekellerinin kullanıcı verisini hammadde kılmasına karşı, açık kaynak ve bağımsız yerel WebGPU ile özgürleşme."
  },
  {
    term: "Poiesis",
    greekOrGerman: "ποίησις (Grekçe: Hakikatin Açığa Çıkışı / Sanatsal Yaratım)",
    origin: "Aristoteles & Heidegger",
    definition: "Bir şeyin kendiliğinden ya da ustanın zanaatiyle yokluktan varlığa çıkması. Teknolojinin araçsal değil, hakikati şiirsel bir zarafetle açığa çıkaran özgürleştirici modu.",
    engineeringParallel: "Her fonksiyonu temiz bir mimariyle, gereksiz gürültüden arındırarak varoluşun kumaşına bir matematiksel düğüm gibi nakşetmek."
  },
  {
    term: "Hilomorfik Silikon",
    greekOrGerman: "Hyle (Madde) + Morphe (Biçim / Form)",
    origin: "Aristoteles & Gilbert Simondon",
    definition: "Madde biçimsiz eksiktir; biçim ise maddesiz tecessüm edemez. Zekanın saf bulutta değil, fiziksel silikon kısıtlarıyla bedenleştiği ontolojik sentez.",
    engineeringParallel: "Edge-AI, mikrodenetleyici register haritalamaları ve NPU optimizasyonları; tensörlerin somut transistörlerle nikahlanması."
  },
  {
    term: "Pharmakon",
    greekOrGerman: "φάρμακον (Grekçe: Hem Zehir Hem İlaç)",
    origin: "Platon (Phaidros) & Bernard Stiegler",
    definition: "Teknolojik aletlerin hem bilişsel yetileri körelten öldürücü bir zehir, hem de insan kapasitesini katlayan bir panzehir olma ikircikli doğası.",
    engineeringParallel: "LLM'leri insanın yerine düşünen bir bağımlılık tuzağı değil; insanın daha derin akıl yürütmesini sağlayan açık kaynak bir protez kılmak."
  },
  {
    term: "Individuation",
    greekOrGerman: "Bireyleşme / Ontogenesis (Gilbert Simondon)",
    origin: "Gilbert Simondon",
    definition: "Bir varlığın baştan tanımlı sabit bir özle değil; çevresiyle girdiği sürekli gerilim ve geri beslemeler yoluyla kendi özgün formunu kazanma süreci.",
    engineeringParallel: "Tulpar İHA'nın dinamik rüzgar koşullarında sensör füzyonuyla kendi uçuş dengesini gerçek zamanlı olarak kurması."
  },
  {
    term: "Via Negativa",
    greekOrGerman: "Olumsuzlama / Eksiltme Yolu (Plotinus & Skolastik Felsefe)",
    origin: "Teoloji & Epistemoloji",
    definition: "Bir hakikatin ne olduğunu ekleyerek değil; ne olmadığını eyleyip fazlalıkları yontarak bulma yöntemi. Heykeltıraşın mermerden heykeli çıkarması.",
    engineeringParallel: "Budak Doktrini: Sinir ağlarında %80 ağırlık budaması (pruning) ile gürültüyü atıp saf bilgi kristalini ortaya çıkarmak."
  },
  {
    term: "Metal Yaka",
    greekOrGerman: "Metal Collar (Bahattin Yunus Çetin Doktrini)",
    origin: "Sibernetik İşçilik & Geleceğin Bilişimi",
    definition: "Mavi yakanın fiziksel donanım ustalığı ile beyaz yakanın soyut algoritma zekasını tek bir bilinçte birleştiren yeni nesil teknolojik insan prototipi.",
    engineeringParallel: "Bir elinde havya ve osiloskop ile donanım lehimlerken, diğer eliyle C++20 ve PyTorch ile otonom derin öğrenme mimarileri geliştirmek."
  }
];
