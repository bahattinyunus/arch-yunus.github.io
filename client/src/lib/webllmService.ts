// WebLLM Loader via dynamic ESM CDN
// Uses Apache-2.0 WebLLM (Qwen2.5-0.5B-Instruct-q4f16_1-MLC / SmolLM2-135M)
// Runs 100% on the user's browser GPU via WebGPU, zero server costs, zero tokens paid.

export interface WebLLMProgress {
  progress: number;
  text: string;
}

export class WebLLMService {
  private static instance: WebLLMService;
  private engine: any = null;
  private isInitializing: boolean = false;
  private isLoaded: boolean = false;
  private modelId: string = "Qwen2.5-0.5B-Instruct-q4f16_1-MLC"; // Hafif ve ultra hızlı model

  private constructor() {}

  public static getInstance(): WebLLMService {
    if (!WebLLMService.instance) {
      WebLLMService.instance = new WebLLMService();
    }
    return WebLLMService.instance;
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
      onProgress?.({ progress: 0.1, text: "WebGPU hızlandırıcı denetleniyor..." });
      
      const hasGPU = await this.isWebGPUSupported();
      if (!hasGPU) {
        throw new Error("Tarayıcınızda WebGPU donanım hızlandırma etkin değil.");
      }

      onProgress?.({ progress: 0.3, text: "WebLLM sinir ağı kütüphanesi yükleniyor..." });
      
      // Dynamic import from CDN to avoid npm package build conflicts
      const webllm = await import(/* @vite-ignore */ "https://esm.run/@mlc-ai/web-llm");

      onProgress?.({ progress: 0.5, text: `Açık kaynak model indiriliyor: ${this.modelId}...` });

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
      console.warn("WebLLM yükleme uyarısı:", err.message);
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
          "Sen Bahattin Yunus Çetin'in resmi yapay zekâ asistanısın. Yunus Çetin; ODTÜ ve Hacettepe'de araştırmacı, ASELSAN, TUA ve Siber Vatan tecrübesine sahip, Tulpar Aero ve Budak Edge-AI kurucusudur. Sorulara Türkçe, profesyonel, teknik ve net yanıtlar ver."
      },
      { role: "user", content: prompt }
    ];

    const reply = await this.engine.chat.completions.create({
      messages,
      temperature: 0.6,
      max_tokens: 350
    });

    return reply.choices[0].message.content || "";
  }

  public getModelName(): string {
    return this.modelId;
  }

  public isReady(): boolean {
    return this.isLoaded;
  }
}
