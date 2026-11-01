// assets/js/theme.js
import { state, saveState, showToast } from './state.js';

export const themes = [
    { id: 'cyberpunk', name: 'Cyberpunk (Cyan/Púrpura)', color: '#00f2fe' },
    { id: 'matrix', name: 'Matrix (Verde Neón)', color: '#00ff66' },
    { id: 'synthwave', name: 'Synthwave (Magenta/Rosa)', color: '#ff007f' },
    { id: 'gold', name: 'Oro Neón (Ámbar/Dorado)', color: '#ffb703' }
];

export function applyTheme(themeId) {
    const selected = themes.find(t => t.id === themeId) ? themeId : 'cyberpunk';
    document.documentElement.setAttribute('data-theme', selected);
    state.theme = selected;
    saveState();
}

export function initThemeSwitcher() {
    const currentTheme = state.theme || 'cyberpunk';
    applyTheme(currentTheme);

    const btnTheme = document.getElementById('btn-toggle-theme');
    if (btnTheme) {
        btnTheme.addEventListener('click', () => {
            const currentIndex = themes.findIndex(t => t.id === (state.theme || 'cyberpunk'));
            const nextIndex = (currentIndex + 1) % themes.length;
            const nextTheme = themes[nextIndex];
            applyTheme(nextTheme.id);
            showToast(`Tema cambiado a: ${nextTheme.name} 🎨`);
        });
    }
}