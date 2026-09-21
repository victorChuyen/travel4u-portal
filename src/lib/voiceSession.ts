/**
 * 👑 TRAVEL4U — VOICE PLANNER BETA ENGINE (WEB SPEECH API)
 * Captures traveler voice intent, transcripts to intent profile, and provides text-to-speech feedback.
 * Includes graceful fallback to text if unsupported or microphone permission is denied.
 */

import { saveIntent, type IntentProfile } from './intentProfile';
import { trackTravelEvent } from './analytics';

export interface VoiceSessionCallbacks {
  onStatusChange: (status: 'idle' | 'listening' | 'processing' | 'speaking' | 'error') => void;
  onTranscript: (text: string) => void;
  onIntentCaptured: (intent: Partial<IntentProfile>) => void;
  onError: (message: string) => void;
}

export class VoicePlannerSession {
  private recognition: any = null;
  private synth: SpeechSynthesis | null = null;
  private isListening = false;
  private callbacks: VoiceSessionCallbacks;

  constructor(callbacks: VoiceSessionCallbacks) {
    this.callbacks = callbacks;
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';

        this.recognition.onstart = () => {
          this.isListening = true;
          this.callbacks.onStatusChange('listening');
          trackTravelEvent({ event: 'voice_started' });
        };

        this.recognition.onresult = (event: any) => {
          let transcript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            transcript += event.results[i][0].transcript;
          }
          this.callbacks.onTranscript(transcript);

          if (event.results[0].isFinal) {
            this.parseTranscriptToIntent(transcript);
          }
        };

        this.recognition.onerror = (event: any) => {
          this.isListening = false;
          this.callbacks.onStatusChange('error');
          let msg = 'Voice input unavailable. Switching to text planner.';
          if (event.error === 'not-allowed') {
            msg = 'Microphone permission denied. Please use the text planner.';
          }
          this.callbacks.onError(msg);
        };

        this.recognition.onend = () => {
          this.isListening = false;
          this.callbacks.onStatusChange('idle');
          trackTravelEvent({ event: 'voice_completed' });
        };
      }

      if ('speechSynthesis' in window) {
        this.synth = window.speechSynthesis;
      }
    }
  }

  public isSupported(): boolean {
    return this.recognition !== null;
  }

  public startListening(): void {
    if (!this.recognition) {
      this.callbacks.onError('Voice recognition is not supported in this browser. Please use text mode.');
      return;
    }
    try {
      this.recognition.start();
    } catch (e: any) {
      this.callbacks.onError(e.message || 'Could not start microphone');
    }
  }

  public stopListening(): void {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
      this.callbacks.onStatusChange('idle');
    }
  }

  public speak(text: string): void {
    if (!this.synth) return;
    this.synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.lang = 'en-US';
    utterance.onstart = () => this.callbacks.onStatusChange('speaking');
    utterance.onend = () => this.callbacks.onStatusChange('idle');
    this.synth.speak(utterance);
  }

  private parseTranscriptToIntent(text: string): void {
    const lower = text.toLowerCase();
    const intent: Partial<IntentProfile> = {};

    // Destination matching
    if (lower.includes('paris')) intent.destination_name = 'Paris, France';
    else if (lower.includes('kyoto') || lower.includes('japan')) intent.destination_name = 'Kyoto, Japan';
    else if (lower.includes('como') || lower.includes('italy')) intent.destination_name = 'Lake Como, Italy';
    else if (lower.includes('maldives')) intent.destination_name = 'Noonu Atoll, Maldives';
    else if (lower.includes('dubai')) intent.destination_name = 'Dubai, UAE';
    else if (lower.includes('swiss') || lower.includes('switzerland')) intent.destination_name = 'Swiss Alps, Switzerland';
    else intent.destination_name = text;

    // Trip type matching
    if (lower.includes('solo') || lower.includes('myself')) intent.trip_type = 'solo';
    else if (lower.includes('family') || lower.includes('kids')) intent.trip_type = 'family';
    else if (lower.includes('business') || lower.includes('work')) intent.trip_type = 'business';
    else intent.trip_type = 'couple';

    // Duration matching
    const daysMatch = lower.match(/(\d+)\s*(day|days|night|nights)/);
    if (daysMatch) {
      intent.duration_days = parseInt(daysMatch[1], 10);
    } else {
      intent.duration_days = 5;
    }

    // Budget
    if (lower.includes('budget') || lower.includes('value')) intent.budget = 'value';
    else if (lower.includes('ultra') || lower.includes('luxury') || lower.includes('premium')) intent.budget = 'premium';
    else intent.budget = 'balanced';

    // Save and notify
    saveIntent(intent);
    this.callbacks.onIntentCaptured(intent);
  }
}
