// assets/js/nutrition.js
import { state, saveState, showToast } from './state.js';

export function initNutrition() {
    if (!state.nutrition) {
        state.nutrition = {
            supps: { creatine: false, protein: false, omega3: false },
            macros: { prot: 0, cal: 0 },
            date: new Date().toDateString()
        };
    }

    const today = new Date().toDateString();
    if (state.nutrition.date !== today) {
        state.nutrition.supps = { creatine: false, protein: false, omega3: false };
        state.nutrition.macros = { prot: 0, cal: 0 };
        state.nutrition.date = today;
        saveState();
    }

    renderNutritionUI();

    const btnModal = document.getElementById('btn-toggle-nutrition');
    const modal = document.getElementById('modal-nutrition');
    const btnClose = document.getElementById('btn-close-nutrition');

    if (btnModal && modal) {
        btnModal.addEventListener('click', () => modal.classList.add('active'));
    }
    if (btnClose && modal) {
        btnClose.addEventListener('click', () => modal.classList.remove('active'));
    }
}

function renderNutritionUI() {
    const supps = state.nutrition.supps || {};
    const macros = state.nutrition.macros || {};

    const chkCreatine = document.getElementById('supp-creatine');
    const chkProtein = document.getElementById('supp-protein');
    const chkOmega3 = document.getElementById('supp-omega3');

    if (chkCreatine) chkCreatine.checked = !!supps.creatine;
    if (chkProtein) chkProtein.checked = !!supps.protein;
    if (chkOmega3) chkOmega3.checked = !!supps.omega3;

    const inProt = document.getElementById('input-macro-prot');
    const inCal = document.getElementById('input-macro-cal');

    if (inProt) inProt.value = macros.prot || '';
    if (inCal) inCal.value = macros.cal || '';
}

window.toggleSupp = function(key) {
    if (!state.nutrition.supps) state.nutrition.supps = {};
    state.nutrition.supps[key] = !state.nutrition.supps[key];
    saveState();
    showToast(`Suplemento actualizado 💊`);
};

window.updateMacro = function(key, val) {
    if (!state.nutrition.macros) state.nutrition.macros = {};
    state.nutrition.macros[key] = parseFloat(val) || 0;
    saveState();
    showToast(`Macro actualizado 🥗`);
};