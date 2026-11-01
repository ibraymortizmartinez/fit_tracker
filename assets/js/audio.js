import { state } from './state.js';

export function speak(text) {
    if (!state.audioCoach || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = 'es-ES';
    msg.rate = 1.0;
    window.speechSynthesis.speak(msg);
}