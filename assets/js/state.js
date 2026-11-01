import { routinePresets } from './presets.js';

export let state = JSON.parse(localStorage.getItem('cyberFit_universal_state')) || {
    streak: { count: 0, lastDate: null, history: {} },
    water: { current: 0, max: 3.0, date: new Date().toDateString(), history: {} },
    notes: '',
    xp: 0,
    level: 1,
    readiness: 5,
    restPasses: 3,
    userMode: 'tech',
    audioCoach: true,
    timeFilter: 'all',
    selectedRoutine: 'ppl',
    unlockedBadges: [],
    completedExercises: {},
    routines: routinePresets.ppl.data,
    activeTab: 'push'
};

export function saveState() {
    localStorage.setItem('cyberFit_universal_state', JSON.stringify(state));
}

export function showToast(msg) {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }
}