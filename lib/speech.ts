/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export class SpeechRecognizer {
  private recognition: any = null;
  private isSupported: boolean = false;

  constructor(lang: string = 'zh-CN') {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.isSupported = true;
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = lang;
      }
    }
  }

  get supported(): boolean {
    return this.isSupported;
  }

  start(
    onResult: (text: string, isFinal: boolean) => void,
    onError?: (error: string) => void
  ): void {
    if (!this.recognition) {
      onError?.('浏览器不支持语音识别');
      return;
    }

    this.recognition.onresult = (event: any) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      const isFinal = event.results[event.results.length - 1]?.isFinal || false;
      onResult(transcript, isFinal);
    };

    this.recognition.onerror = (event: any) => {
      onError?.(event.error);
    };

    this.recognition.start();
  }

  stop(): void {
    this.recognition?.stop();
  }
}

export function checkSpeechSupport(): boolean {
  if (typeof window === 'undefined') return false;
  return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
}
