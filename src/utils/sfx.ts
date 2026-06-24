class SoundEffects {
  private static audioCtx: AudioContext | null = null;
  private static muted: boolean = typeof window !== 'undefined' ? localStorage.getItem('sfx-muted') === 'true' : false;
  private static userInteracted: boolean = false;

  private static hasUserActivated(): boolean {
    if (typeof navigator !== 'undefined' && (navigator as any).userActivation) {
      return (navigator as any).userActivation.hasBeenActive;
    }
    return this.userInteracted;
  }

  static init() {
    if (typeof window === 'undefined') return;

    if (this.hasUserActivated()) {
      this.userInteracted = true;
      return;
    }

    if (!this.userInteracted) {
      const enableAudio = (e?: Event) => {
        // Only trigger on left-clicks for mouse events
        if (e && e instanceof MouseEvent && e.button !== 0) {
          return;
        }

        if (!this.audioCtx) {
          try {
            const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
            this.audioCtx = new AudioCtxClass();
          } catch (err) {
            console.error('Web Audio API not supported in this browser:', err);
          }
        }
        
        if (this.audioCtx) {
          if (this.audioCtx.state === 'suspended') {
            this.audioCtx.resume()
              .then(() => {
                this.userInteracted = true;
                cleanup();
              })
              .catch(() => {
                // If blocked by browser, leave userInteracted as false
              });
          } else {
            this.userInteracted = true;
            cleanup();
          }
        }
      };

      const cleanup = () => {
        window.removeEventListener('click', enableAudio, { capture: true });
        window.removeEventListener('touchstart', enableAudio, { capture: true });
      };

      window.addEventListener('click', enableAudio, { capture: true, passive: true });
      window.addEventListener('touchstart', enableAudio, { capture: true, passive: true });
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
    
    // Return silently if no user gesture has occurred yet to avoid early programmatic triggers
    // or automatic scroll timeline updates throwing AudioContext warnings.
    if (!this.hasUserActivated()) return;

    this.init();

    // If context is not created yet
    if (!this.audioCtx) {
      try {
        const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
        this.audioCtx = new AudioCtxClass();
      } catch (e) {
        console.error('Web Audio API not supported in this browser:', e);
        return;
      }
    }

    // Attempt to resume if suspended
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      // Only resume if it's a click type, or if we have transient user activation,
      // to avoid warnings if the context was suspended again or not fully running.
      const canResume = type === 'click' || (
        typeof navigator !== 'undefined' && 
        (navigator as any).userActivation && 
        (navigator as any).userActivation.isActive
      );

      if (canResume) {
        this.audioCtx.resume().catch(() => {});
      } else {
        return;
      }
    }

    const ctx = this.audioCtx;
    if (!ctx || ctx.state === 'suspended') return;

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

if (typeof window !== 'undefined') {
  SoundEffects.init();
}
