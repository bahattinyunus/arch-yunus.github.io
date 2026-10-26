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

  public async generate(prompt: string, systemPrompt?: string): Promise<string> {
    if (!this.engine || !this.isLoaded) {
      throw new Error("Model henüz yüklenmedi.");
    }

    const messages = [
      {
        role: "system",
        content:
          systemPrompt ||
          "Sen Bahattin Yunus Çetin'in resmî yapay zekâ asistanısın (Vanguard AI). Kullanıcı ile daima anlaşılır, akıcı ve samimi bir TÜRKÇE ile konuş. Asla rastgele sayı veya anlamsız kelime üretme. Yunus Çetin; ODTÜ ve Hacettepe'de araştırmacı, ASELSAN saha tetkiki yapmış, TUA Uzay Hackathonu dereceli, Siber Vatan kampı mezunu, Tulpar Aero ve Budak Edge-AI kurucusu, lisanslı İHA-1 pilotudur. Sorulara net, zeki ve samimi Türkçe yanıtlar ver."
      },
      { role: "user", content: prompt }
    ];

    const reply = await this.engine.chat.completions.create({
      messages,
      temperature: 0.7,
      top_p: 0.9,
      max_tokens: 450
    });

    const content = reply.choices[0]?.message?.content?.trim() || "";
    // If output is corrupted, empty or a raw number (like '10'), provide intelligent fallback
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
