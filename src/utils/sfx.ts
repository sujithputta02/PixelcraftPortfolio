class SoundEffects {
  private static audioCtx: AudioContext | null = null;
  private static muted: boolean = typeof window !== 'undefined' ? localStorage.getItem('sfx-muted') === 'true' : false;

  static init() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      try {
        const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
        this.audioCtx = new AudioCtxClass();
      } catch (e) {
        console.error('Web Audio API not supported in this browser:', e);
      }
    }
  }

  static isMuted(): boolean {
    return this.muted;
  }

  static toggleMute(): boolean {
    this.muted = !this.muted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('sfx-muted', String(this.muted));
    }
    return this.muted;
  }

  static playTick(type: 'hover' | 'click' = 'hover') {
    if (this.muted) return;
    this.init();

    const ctx = this.audioCtx;
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    const time = ctx.currentTime;

    if (type === 'hover') {
      // High frequency, ultra-short, soft tick
      osc.type = 'sine';
      osc.frequency.setValueAtTime(2200, time);
      osc.frequency.exponentialRampToValueAtTime(1000, time + 0.02);

      gainNode.gain.setValueAtTime(0.008, time);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, time + 0.02);

      osc.start(time);
      osc.stop(time + 0.025);
    } else {
      // Punchy metallic click
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1400, time);
      osc.frequency.exponentialRampToValueAtTime(150, time + 0.04);

      gainNode.gain.setValueAtTime(0.024, time);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, time + 0.045);

      osc.start(time);
      osc.stop(time + 0.05);
    }
  }
}

export const sfx = SoundEffects;
