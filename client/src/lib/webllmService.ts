// WebLLM Loader via dynamic ESM CDN
// Connects to Hugging Face MLC repositories (e.g. mlc-ai/Qwen2.5-1.5B-Instruct-q4f16_1-MLC)
// Runs 100% on the user's browser GPU via WebGPU, zero server costs, zero tokens paid.

export interface WebLLMProgress {
  progress: number;
  text: string;
}

export interface WebLLMModel {
  id: string;
  name: string;
  hfRepo: string;
  size: string;
  vram: string;
  tag: string;
  recommended?: boolean;
}

export const AVAILABLE_MODELS: WebLLMModel[] = [
  {
    id: "Qwen2.5-1.5B-Instruct-q4f16_1-MLC",
    name: "Qwen 2.5 1.5B (Optimum Türkçe)",
    hfRepo: "mlc-ai/Qwen2.5-1.5B-Instruct-q4f16_1-MLC",
    size: "~980 MB",
    vram: "~1.4 GB",
    tag: "ÖNERİLEN OPTİMUM",
    recommended: true
  },
  {
    id: "Qwen2.5-7B-Instruct-q4f16_1-MLC",
    name: "Qwen 2.5 7B (Maksimum Akıl / RTX GPU)",
    hfRepo: "mlc-ai/Qwen2.5-7B-Instruct-q4f16_1-MLC",
    size: "~4.5 GB",
    vram: "~5.5 GB",
    tag: "RTX GPU / PRO"
  },
  {
    id: "Llama-3.2-3B-Instruct-q4f16_1-MLC",
    name: "Llama 3.2 3B Instruct",
    hfRepo: "mlc-ai/Llama-3.2-3B-Instruct-q4f16_1-MLC",
    size: "~2.1 GB",
    vram: "~3 GB",
    tag: "META 3.2"
  }
];

export class WebLLMService {
  private static instance: WebLLMService;
  private engine: any = null;
  private isInitializing: boolean = false;
  private isLoaded: boolean = false;
  // Türkçe için en ideal, dengeli ve optimum model: Qwen2.5 1.5B
  private modelId: string = "Qwen2.5-1.5B-Instruct-q4f16_1-MLC";

  private constructor() {}

  public static getInstance(): WebLLMService {
    if (!WebLLMService.instance) {
      WebLLMService.instance = new WebLLMService();
    }
    return WebLLMService.instance;
  }

  public setModel(newModelId: string) {
    if (this.modelId !== newModelId) {
      this.modelId = newModelId;
      this.isLoaded = false;
      this.engine = null;
    }
  }

  public async isWebGPUSupported(): Promise<boolean> {
    if (typeof navigator === "undefined" || !(navigator as any).gpu) {
      return false;
    }
    try {
      const adapter = await (navigator as any).gpu.requestAdapter();
      return !!adapter;
    } catch {
      return false;
    }
  }

  public async loadModel(onProgress?: (p: WebLLMProgress) => void): Promise<boolean> {
    if (this.isLoaded) return true;
    if (this.isInitializing) return false;

    this.isInitializing = true;
    try {
      onProgress?.({ progress: 0.1, text: "WebGPU donanım hızlandırıcı denetleniyor..." });

      const hasGPU = await this.isWebGPUSupported();
      if (!hasGPU) {
        throw new Error("Tarayıcınızda WebGPU donanım hızlandırma etkin değil.");
      }

      onProgress?.({ progress: 0.3, text: "WebLLM sinir ağı motoru bağlanıyor..." });

      // Dynamic import from CDN to avoid npm package build conflicts
      const webllm = await import(/* @vite-ignore */ "https://esm.run/@mlc-ai/web-llm");

      onProgress?.({ progress: 0.5, text: `Hugging Face'ten model indiriliyor: ${this.modelId}...` });

      const initProgressCallback = (report: { progress: number; text: string }) => {
        onProgress?.({
          progress: 0.5 + report.progress * 0.5,
          text: report.text || "Model ağırlıkları WebGPU VRAM'e aktarılıyor..."
        });
      };

      this.engine = await webllm.CreateMLCEngine(this.modelId, {
        initProgressCallback,
        logLevel: "INFO"
      });

      this.isLoaded = true;
      this.isInitializing = false;
      onProgress?.({ progress: 1.0, text: "Model başarıyla yüklendi ve aktif!" });
      return true;
    } catch (err: any) {
      this.isInitializing = false;
      console.warn("WebLLM yükleme hatası:", err.message);
      throw err;
    }
  }

  private getDefaultSystemPrompt(): string {
    return (
      "Sen Bahattin Yunus Çetin'in resmi yapay zekâ asistanısın (Vanguard AI). " +
      "Kullanıcı ile daima doğal, akıcı, zeki ve samimi bir TÜRKÇE ile konuş. " +
      "Asla tek haneli sayı veya anlamsız rastgele kelimeler üretme. " +
      "Bahattin Yunus Çetin; ODTÜ ve Hacettepe'de araştırmacı, ASELSAN Gölbaşı Üssü saha operasyonu incelemiş, " +
      "Türkiye-Fransa Gençlik Değişimi'ne (66.500 aday arasından seçilen 20 kişiden biri) katılmış, " +
      "TUA Uzay Hackathonu dereceli, Siber Vatan Beyaz Şapkalı Hacker kampı mezunudur. " +
      "Tulpar Aero-Dynamics ve Budak Edge-AI kurucusu, lisanslı SHGM İHA-1 pilotudur. " +
      "Sorulara Türkçe, bilgilendirici, samimi ve teknik derinliği koruyarak yanıt ver."
    );
  }

  public async generateStream(
    prompt: string,
    history: { role: "system" | "user" | "assistant"; content: string }[] = [],
    onChunk?: (currentFullText: string, chunk: string) => void,
    systemPrompt?: string
  ): Promise<string> {
    if (!this.engine || !this.isLoaded) {
      throw new Error("Model henüz yüklenmedi.");
    }

    const messages = [
      {
        role: "system",
        content: systemPrompt || this.getDefaultSystemPrompt()
      },
      ...history.slice(-6),
      { role: "user", content: prompt }
    ];

    try {
      const chunks = await this.engine.chat.completions.create({
        messages,
        temperature: 0.7,
        top_p: 0.9,
        stream: true,
        max_tokens: 500
      });

      let fullReply = "";
      for await (const chunk of chunks) {
        const delta = chunk.choices[0]?.delta?.content || "";
        if (delta) {
          fullReply += delta;
          onChunk?.(fullReply, delta);
        }
      }

      const trimmed = fullReply.trim();
      if (!trimmed || trimmed.length < 3 || /^\d+$/.test(trimmed)) {
        return "İyidir kanka, sistemler tam gaz devrede! Yunus'un projeleri, ASELSAN saha operasyonu, ODTÜ/Hacettepe eğitimi veya lisansları hakkında ne sormak istersin?";
      }

      return trimmed;
    } catch (e: any) {
      console.warn("WebLLM stream hatası, fallback yapılıyor:", e);
      return await this.generate(prompt, history, systemPrompt);
    }
  }

  public async generate(
    prompt: string,
    history: { role: "system" | "user" | "assistant"; content: string }[] = [],
    systemPrompt?: string
  ): Promise<string> {
    if (!this.engine || !this.isLoaded) {
      throw new Error("Model henüz yüklenmedi.");
    }

    const messages = [
      {
        role: "system",
        content: systemPrompt || this.getDefaultSystemPrompt()
      },
      ...history.slice(-6),
      { role: "user", content: prompt }
    ];

    const reply = await this.engine.chat.completions.create({
      messages,
      temperature: 0.7,
      top_p: 0.9,
      max_tokens: 450
    });

    const content = reply.choices[0]?.message?.content?.trim() || "";
    if (!content || content.length < 3 || /^\d+$/.test(content)) {
      return "İyidir kanka, sistemler tam gaz devrede! Yunus'un projeleri, ASELSAN saha operasyonu, ODTÜ/Hacettepe eğitimi veya lisansları hakkında ne sormak istersin?";
    }

    return content;
  }

  public getModelName(): string {
    return this.modelId;
  }

  public isReady(): boolean {
    return this.isLoaded;
  }
}
