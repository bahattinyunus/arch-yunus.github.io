
import { useCallback, useEffect, useRef, useState } from "react";

// Using native AudioContext for generated sounds to avoid external asset dependencies
// Creates procedural sci-fi audio: drone ambient, blips, clicks, pings, glitches.

export type SoundType = 'hover' | 'click' | 'type' | 'access' | 'alert' | 'scan' | 'glitch' | 'transmit' | 'ping' | 'boot';

export const useCyberSound = () => {
    const audioContext = useRef<AudioContext | null>(null);
    const ambientOsc1 = useRef<OscillatorNode | null>(null);
    const ambientOsc2 = useRef<OscillatorNode | null>(null);
    const ambientGain = useRef<GainNode | null>(null);
    const [isAmbientPlaying, setIsAmbientPlaying] = useState<boolean>(false);

    useEffect(() => {
        const initAudio = () => {
            if (!audioContext.current) {
                const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
                if (AudioCtx) {
                    audioContext.current = new AudioCtx();
                }
            }
        };
        window.addEventListener('click', initAudio, { once: true });
        window.addEventListener('keydown', initAudio, { once: true });
        return () => {
            window.removeEventListener('click', initAudio);
            window.removeEventListener('keydown', initAudio);
        };
    }, []);

    const toggleAmbient = useCallback(() => {
        if (!audioContext.current) {
            const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioCtx) {
                audioContext.current = new AudioCtx();
            }
        }
        const ctx = audioContext.current;
        if (!ctx) return;

        if (ctx.state === 'suspended') {
            ctx.resume();
        }

        if (isAmbientPlaying) {
            // Stop ambient
            if (ambientGain.current) {
                ambientGain.current.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 1);
                setTimeout(() => {
                    ambientOsc1.current?.stop();
                    ambientOsc2.current?.stop();
                    ambientOsc1.current?.disconnect();
                    ambientOsc2.current?.disconnect();
                    ambientOsc1.current = null;
                    ambientOsc2.current = null;
                }, 1000);
            }
            setIsAmbientPlaying(false);
        } else {
            // Start ambient procedural sci-fi drone
            try {
                const now = ctx.currentTime;
                const gain = ctx.createGain();
                gain.gain.setValueAtTime(0.0001, now);
                gain.gain.linearRampToValueAtTime(0.02, now + 2);

                // Low sub-bass drone
                const osc1 = ctx.createOscillator();
                osc1.type = 'sine';
                osc1.frequency.setValueAtTime(55, now); // A1 note

                // Subtle harmonic modulation
                const osc2 = ctx.createOscillator();
                osc2.type = 'triangle';
                osc2.frequency.setValueAtTime(110.5, now); // Slightly detuned harmonic

                // Filter for warm dark cyberpunk atmosphere
                const filter = ctx.createBiquadFilter();
                filter.type = 'lowpass';
                filter.frequency.setValueAtTime(320, now);

                osc1.connect(filter);
                osc2.connect(filter);
                filter.connect(gain);
                gain.connect(ctx.destination);

                osc1.start(now);
                osc2.start(now);

                ambientOsc1.current = osc1;
                ambientOsc2.current = osc2;
                ambientGain.current = gain;
                setIsAmbientPlaying(true);
            } catch (err) {
                console.warn("Ambient audio initialization bypassed:", err);
            }
        }
    }, [isAmbientPlaying]);

    const playSound = useCallback((type: SoundType) => {
        if (!audioContext.current) {
            const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioCtx) {
                audioContext.current = new AudioCtx();
            } else {
                return;
            }
        }

        const ctx = audioContext.current;
        if (ctx.state === 'suspended') {
            ctx.resume();
        }

        try {
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.connect(gain);
            gain.connect(ctx.destination);

            switch (type) {
                case 'hover':
                    // High pitch short blip
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(800, now);
                    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.04);
                    gain.gain.setValueAtTime(0.03, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
                    osc.start(now);
                    osc.stop(now + 0.04);
                    break;

                case 'click':
                    // Mechanical click
                    osc.type = 'square';
                    osc.frequency.setValueAtTime(220, now);
                    osc.frequency.exponentialRampToValueAtTime(80, now + 0.08);
                    gain.gain.setValueAtTime(0.08, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
                    osc.start(now);
                    osc.stop(now + 0.08);
                    break;

                case 'type':
                    // Subtle tick
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(540, now);
                    gain.gain.setValueAtTime(0.02, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
                    osc.start(now);
                    osc.stop(now + 0.025);
                    break;

                case 'access':
                    // Success chime
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(440, now);
                    osc.frequency.exponentialRampToValueAtTime(880, now + 0.2);
                    gain.gain.setValueAtTime(0.08, now);
                    gain.gain.linearRampToValueAtTime(0, now + 0.4);
                    osc.start(now);
                    osc.stop(now + 0.4);
                    break;

                case 'alert':
                    // Two pulse warning
                    osc.type = 'sawtooth';
                    osc.frequency.setValueAtTime(160, now);
                    osc.frequency.setValueAtTime(280, now + 0.08);
                    gain.gain.setValueAtTime(0.05, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
                    osc.start(now);
                    osc.stop(now + 0.2);
                    break;

                case 'scan':
                    // Radar sweep sound
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(280, now);
                    osc.frequency.linearRampToValueAtTime(620, now + 0.25);
                    gain.gain.setValueAtTime(0.04, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
                    osc.start(now);
                    osc.stop(now + 0.25);
                    break;

                case 'glitch':
                    // Digital artifact glitch
                    osc.type = 'sawtooth';
                    osc.frequency.setValueAtTime(1400, now);
                    osc.frequency.setValueAtTime(240, now + 0.03);
                    osc.frequency.setValueAtTime(890, now + 0.06);
                    gain.gain.setValueAtTime(0.04, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
                    osc.start(now);
                    osc.stop(now + 0.1);
                    break;

                case 'transmit':
                    // Frequency modulation transmission
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(520, now);
                    osc.frequency.exponentialRampToValueAtTime(1040, now + 0.15);
                    gain.gain.setValueAtTime(0.06, now);
                    gain.gain.linearRampToValueAtTime(0, now + 0.35);
                    osc.start(now);
                    osc.stop(now + 0.35);
                    break;

                case 'ping':
                    // Sonar sonar pulse
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(900, now);
                    gain.gain.setValueAtTime(0.07, now);
                    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
                    osc.start(now);
                    osc.stop(now + 0.4);
                    break;

                case 'boot':
                    // Boot chime
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(220, now);
                    osc.frequency.exponentialRampToValueAtTime(440, now + 0.2);
                    osc.frequency.exponentialRampToValueAtTime(880, now + 0.4);
                    gain.gain.setValueAtTime(0.06, now);
                    gain.gain.linearRampToValueAtTime(0, now + 0.6);
                    osc.start(now);
                    osc.stop(now + 0.6);
                    break;
            }
        } catch (err) {
            // Audio context not allowed yet
        }
    }, []);

    return { playSound, isAmbientPlaying, toggleAmbient };
};
