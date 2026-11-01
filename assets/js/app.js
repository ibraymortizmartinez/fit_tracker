// assets/js/app.js
import { state, saveState, showToast } from './state.js';
import { routinePresets, achievementBadges } from './presets.js';
import { speak } from './audio.js';
import { initCharts, showExerciseHistory } from './charts.js';
import { exportToExcel } from './excel.js';
import { initThemeSwitcher } from './theme.js';
import { initNutrition } from './nutrition.js';

document.addEventListener('DOMContentLoaded', () => {

    // --- MODO DE LENGUAJE ---
    const btnToggleMode = document.getElementById('btn-toggle-mode');
    const modeLabel = document.getElementById('mode-label');

    function renderModeUI() {
        if (!btnToggleMode || !modeLabel) return;
        if (state.userMode === 'easy') {
            modeLabel.textContent = 'Modo Cotidiano';
            btnToggleMode.style.borderColor = 'var(--accent-purple)';
        } else {
            modeLabel.textContent = 'Modo Técnico';
            btnToggleMode.style.borderColor = 'var(--accent-cyan)';
        }
        renderExercises();
    }

    if (btnToggleMode) {
        btnToggleMode.addEventListener('click', () => {
            state.userMode = state.userMode === 'tech' ? 'easy' : 'tech';
            saveState();
            renderModeUI();
            speak(`Modo cambiado a ${state.userMode === 'easy' ? 'cotidiano' : 'técnico'}`);
        });
    }

    // Toggle Audio
    const btnToggleAudio = document.getElementById('btn-toggle-audio');
    function updateAudioIcon() {
        if (btnToggleAudio) btnToggleAudio.classList.toggle('active', state.audioCoach);
    }
    if (btnToggleAudio) {
        btnToggleAudio.addEventListener('click', () => {
            state.audioCoach = !state.audioCoach;
            updateAudioIcon();
            saveState();
            showToast(state.audioCoach ? 'Audio Coach Activado 🔊' : 'Audio Coach Silenciado 🔇');
        });
        updateAudioIcon();
    }

    // --- MASCOTA EVOLUTIVA ---
    function renderPet() {
        const nameEl = document.getElementById('pet-name');
        const statusEl = document.getElementById('pet-status');
        const iconEl = document.getElementById('pet-icon');
        if (!nameEl || !statusEl || !iconEl) return;

        if (state.level < 3) {
            nameEl.textContent = 'Cyber-Bot v1.0';
            iconEl.className = 'fa-solid fa-robot pet-icon';
            statusEl.textContent = '"¡Dando nuestros primeros pasos!"';
        } else if (state.level < 5) {
            nameEl.textContent = 'Cyber-Drone Nvl 2';
            iconEl.className = 'fa-solid fa-jet-fighter pet-icon';
            statusEl.textContent = '"¡Potencia al máximo rendimiento!"';
        } else {
            nameEl.textContent = 'Cyber-Mecha Leyenda';
            iconEl.className = 'fa-solid fa-dragon pet-icon';
            statusEl.textContent = '"¡Nadie puede detenernos!"';
        }
    }

    // --- READINESS (BATERÍA) ---
    const readinessSlider = document.getElementById('readiness-slider');
    const readinessDisplay = document.getElementById('readiness-val-display');

    function renderReadiness() {
        if (!readinessSlider || !readinessDisplay) return;
        readinessSlider.value = state.readiness;
        readinessDisplay.textContent = `${state.readiness}/5 (${state.readiness * 20}%)`;
    }

    if (readinessSlider) {
        readinessSlider.addEventListener('input', (e) => {
            state.readiness = parseInt(e.target.value);
            renderReadiness();
            saveState();
            renderExercises();
            if (state.readiness <= 2) {
                showToast('Modo Suave Activado: Se ajustaron tus cargas');
                speak('Batería baja detectada. Ajustamos tus ejercicios para cuidar tu cuerpo.');
            }
        });
    }

    // --- GAMIFICACIÓN & XP ---
    function addXP(amount) {
        state.xp += amount;
        const nextLevelXP = state.level * 100;
        if (state.xp >= nextLevelXP) {
            state.level += 1;
            if (typeof confetti === 'function') {
                confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
            }
            speak(`¡Felicidades! Subiste al nivel ${state.level}`);
            showToast(`¡SUBISTE DE NIVEL! Nivel ${state.level} 🚀`);
        }
        checkBadges();
        renderHeaderXP();
        renderPet();
        saveState();
    }

    function renderHeaderXP() {
        const lvlEl = document.getElementById('user-level');
        const fillEl = document.getElementById('xp-fill-mini');
        if (lvlEl) lvlEl.textContent = state.level;
        if (fillEl) {
            const currentLevelBaseXP = (state.level - 1) * 100;
            const progress = ((state.xp - currentLevelBaseXP) / 100) * 100;
            fillEl.style.width = `${Math.min(progress, 100)}%`;
        }
    }

    function checkBadges() {
        if (state.streak.count >= 1 && !state.unlockedBadges.includes('b_first')) state.unlockedBadges.push('b_first');
        if (state.streak.count >= 7 && !state.unlockedBadges.includes('b_streak7')) state.unlockedBadges.push('b_streak7');
        if (state.water.current >= 3.0 && !state.unlockedBadges.includes('b_water')) state.unlockedBadges.push('b_water');
        if (state.level >= 5 && !state.unlockedBadges.includes('b_level5')) state.unlockedBadges.push('b_level5');
        renderBadges();
    }

    function renderBadges() {
        const grid = document.getElementById('badges-grid');
        if (!grid) return;
        grid.innerHTML = achievementBadges.map(b => {
            const unlocked = state.unlockedBadges.includes(b.id);
            return `<div class="badge-item ${unlocked ? 'unlocked' : ''}" title="${b.desc}">
                <i class="fa-solid ${b.icon}"></i>
                <span>${b.name}</span>
            </div>`;
        }).join('');
    }

    // --- CUENTA REGRESIVA ---
    const targetDate = new Date('November 18, 2026 00:00:00').getTime();
    function updateCountdown() {
        const cdText = document.getElementById('countdown-text');
        if (!cdText) return;
        const now = new Date().getTime();
        const dist = targetDate - now;
        if (dist < 0) {
            cdText.textContent = "¡Meta Alcanzada!";
            return;
        }
        const d = Math.floor(dist / (1000 * 60 * 60 * 24));
        const h = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
        cdText.textContent = `${d}d ${h}h ${m}m para el 18 Nov`;
    }
    setInterval(updateCountdown, 1000);
    updateCountdown();

    // --- RACHA Y ANTI-CULPA ---
    const btnCheckin = document.getElementById('btn-checkin');
    const btnRestPass = document.getElementById('btn-rest-pass');

    function renderStreak() {
        const streakCountEl = document.getElementById('streak-count');
        const passesCountEl = document.getElementById('rest-passes-count');
        if (streakCountEl) streakCountEl.textContent = state.streak.count;
        if (passesCountEl) passesCountEl.textContent = state.restPasses;
        
        const todayStr = new Date().toDateString();
        if (btnCheckin) {
            if (state.streak.lastDate === todayStr) {
                btnCheckin.disabled = true;
                btnCheckin.textContent = 'Día Registrado ✓';
                if (btnRestPass) btnRestPass.disabled = true;
            } else {
                btnCheckin.disabled = false;
                btnCheckin.innerHTML = '<i class="fa-solid fa-check"></i> Registrar Día (+50 XP)';
                if (btnRestPass) btnRestPass.disabled = state.restPasses <= 0;
            }
        }
        renderHeatmap();
    }

    function renderHeatmap() {
        const grid = document.getElementById('heatmap-grid');
        if (!grid) return;
        grid.innerHTML = '';
        for (let i = 27; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            const status = state.streak.history[dateStr];
            const classStatus = status === 'active' ? 'active' : (status === 'rest' ? 'rest-day' : '');
            grid.innerHTML += `<div class="heatmap-day ${classStatus}" title="${dateStr}"></div>`;
        }
    }

    if (btnCheckin) {
        btnCheckin.addEventListener('click', () => {
            const todayStr = new Date().toDateString();
            const isoToday = new Date().toISOString().split('T')[0];
            state.streak.count += 1;
            state.streak.lastDate = todayStr;
            state.streak.history[isoToday] = 'active';
            speak('¡Día completado! Excelente trabajo de constancia.');
            addXP(50);
            renderStreak();
            showToast('¡Día completado! +50 XP 🔥');
        });
    }

    if (btnRestPass) {
        btnRestPass.addEventListener('click', () => {
            if (state.restPasses <= 0) return;
            const todayStr = new Date().toDateString();
            const isoToday = new Date().toISOString().split('T')[0];
            state.streak.count += 1;
            state.restPasses -= 1;
            state.streak.lastDate = todayStr;
            state.streak.history[isoToday] = 'rest';
            speak('Descanso activo registrado. Cuida tu energía para mañana.');
            addXP(25);
            renderStreak();
            showToast('Descanso Activo guardado sin perder racha 😴');
        });
    }

    // --- HIDRATACIÓN ---
    const todayStr = new Date().toDateString();
    if (state.water.date !== todayStr) {
        state.water.current = 0;
        state.water.date = todayStr;
    }

    function renderWater() {
        const progressEl = document.getElementById('water-progress');
        const statusEl = document.getElementById('water-status');
        const pct = Math.min((state.water.current / state.water.max) * 100, 100);
        if (progressEl) progressEl.style.width = `${pct}%`;
        if (statusEl) statusEl.textContent = `${state.water.current.toFixed(2)} / ${state.water.max} L`;
    }

    document.querySelectorAll('.btn-water').forEach(btn => {
        btn.addEventListener('click', () => {
            const val = parseFloat(btn.getAttribute('data-add'));
            state.water.current = Math.min(state.water.current + val, state.water.max);
            const isoToday = new Date().toISOString().split('T')[0];
            state.water.history[isoToday] = state.water.current;
            addXP(10);
            renderWater();
            saveState();
            showToast(`+${val * 1000}ml registrados 💧`);
        });
    });

    const btnResetWater = document.getElementById('btn-reset-water');
    if (btnResetWater) {
        btnResetWater.addEventListener('click', () => {
            state.water.current = 0;
            renderWater();
            saveState();
        });
    }

    // --- FILTRO DE TIEMPO DISPONIBLE ---
    document.querySelectorAll('.time-chips .chip').forEach(chip => {
        chip.addEventListener('click', () => {
            document.querySelectorAll('.time-chips .chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            state.timeFilter = chip.getAttribute('data-time');
            renderExercises();
        });
    });

    // --- RUTINAS Y PESTAÑAS DINÁMICAS ---
    function renderDynamicTabs(preset) {
        const tabContainer = document.querySelector('.tab-buttons');
        if (!tabContainer) return;
        
        tabContainer.innerHTML = preset.tabs.map(tabKey => `
            <button class="tab-btn ${tabKey === state.activeTab ? 'active' : ''}" data-tab="${tabKey}">
                ${preset.tabLabels[tabKey] || tabKey}
            </button>
        `).join('');

        tabContainer.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                tabContainer.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                state.activeTab = btn.getAttribute('data-tab');
                renderExercises();
                saveState();
            });
        });
    }

    function switchRoutinePreset(presetKey) {
        const preset = routinePresets[presetKey];
        if (!preset) return;
        
        state.selectedRoutine = presetKey;
        state.routines = JSON.parse(JSON.stringify(preset.data));
        state.activeTab = preset.tabs[0];
        
        renderDynamicTabs(preset);
        renderExercises();
        saveState();
    }

    const routineSelect = document.getElementById('routine-template-select');
    if (routineSelect) {
        routineSelect.addEventListener('change', (e) => {
            switchRoutinePreset(e.target.value);
            showToast(`Plantilla cambiada a ${e.target.options[e.target.selectedIndex].text} 🔄`);
        });
    }

    // --- RENDERIZADO COMPLETO DE EJERCICIOS Y TABLAS DE SERIES ---
    function renderExercises() {
        const area = document.getElementById('tab-content-area');
        if (!area) return;

        let exercises = state.routines[state.activeTab] || [];
        const isCardio = state.activeTab === 'neat';
        const isEasy = state.userMode === 'easy';

        if (state.timeFilter === '15') {
            exercises = exercises.filter(e => e.express);
        } else if (state.timeFilter === '8') {
            exercises = exercises.slice(0, 1);
        }

        area.innerHTML = exercises.map(ex => {
            const isCompleted = state.completedExercises[ex.id] || false;
            let displaySets = ex.sets || [];

            if (state.readiness <= 2) {
                displaySets = displaySets.slice(0, Math.max(1, displaySets.length - 1));
            }

            return `
            <div class="exercise-card ${isCompleted ? 'completed' : ''}">
                <div class="exercise-header">
                    <div class="exercise-title">
                        <input type="checkbox" ${isCompleted ? 'checked' : ''} onchange="toggleExercise('${ex.id}')">
                        <span>${ex.name}</span>
                    </div>
                    <div class="exercise-actions">
                        <button class="btn-substitute" onclick="showExerciseHistory('${ex.id}')" title="Ver Histórico Pro">
                            <i class="fa-solid fa-chart-line"></i>
                        </button>
                        ${ex.alt ? `<button class="btn-substitute" onclick="substituteExercise('${ex.id}')" title="Sustituir por opción ligera"><i class="fa-solid fa-arrows-rotate"></i> Alternativa</button>` : ''}
                        <span class="exercise-target">${ex.target}</span>
                        <button class="btn-del-ex" onclick="deleteExercise('${ex.id}')"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
                <table class="sets-table">
                    <thead>
                        <tr>
                            <th>${isCardio ? (isEasy ? 'Tramo' : 'Sesión') : (isEasy ? 'Vuelta' : 'Serie')}</th>
                            <th>${isCardio ? 'Km' : (isEasy ? 'Peso (kg)' : 'Kg')}</th>
                            <th>${isCardio ? 'Tiempo (min)' : (isEasy ? 'Veces' : 'Reps')}</th>
                            <th>${isEasy ? 'Cansancio' : 'RPE'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${displaySets.map((s, idx) => `
                            <tr>
                                <td>#${idx + 1}</td>
                                <td><input type="number" step="0.1" value="${s.weight ?? s.km ?? 0}" onchange="updateSet('${ex.id}', ${idx}, '${isCardio ? 'km' : 'weight'}', this.value)"></td>
                                <td><input type="number" value="${s.reps ?? s.mins ?? 0}" onchange="updateSet('${ex.id}', ${idx}, '${isCardio ? 'mins' : 'reps'}', this.value)"></td>
                                <td><input type="number" value="${s.rpe ?? 5}" onchange="updateSet('${ex.id}', ${idx}, 'rpe', this.value)"></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <button class="btn-add-set" onclick="addSet('${ex.id}')">+ Agregar ${isCardio ? 'Tramo' : (isEasy ? 'Vuelta' : 'Serie')}</button>
            </div>`;
        }).join('');
    }

    // --- REGISTRO GLOBAL DE FUNCIONES PARA EL ONCLICK DE HTML (ES MODULES) ---
    window.substituteExercise = function(id) {
        const list = state.routines[state.activeTab];
        if (!list) return;
        const ex = list.find(e => e.id === id);
        if (ex && ex.alt) {
            const temp = ex.name;
            ex.name = ex.alt;
            ex.alt = temp;
            saveState();
            renderExercises();
            speak(`Ejercicio sustituido por ${ex.name}`);
            showToast('Ejercicio adaptado correctamente 🔄');
        }
    };

    window.toggleExercise = function(id) {
        state.completedExercises[id] = !state.completedExercises[id];
        if (state.completedExercises[id]) {
            addXP(20);
            speak('Ejercicio completado. Tómate un descanso.');
            startRestTimer(60);
        }
        saveState();
        renderExercises();
    };

    window.updateSet = function(exId, setIdx, field, value) {
        const list = state.routines[state.activeTab];
        if (!list) return;
        const ex = list.find(e => e.id === exId);
        if (ex && ex.sets[setIdx]) {
            ex.sets[setIdx][field] = parseFloat(value) || 0;
            saveState();
        }
    };

    window.addSet = function(exId) {
        const list = state.routines[state.activeTab];
        if (!list) return;
        const ex = list.find(e => e.id === exId);
        if (ex) {
            const lastSet = ex.sets[ex.sets.length - 1] || { weight: 10, reps: 10, rpe: 8 };
            ex.sets.push({ ...lastSet });
            saveState();
            renderExercises();
        }
    };

    window.deleteExercise = function(exId) {
        if (!state.routines[state.activeTab]) return;
        state.routines[state.activeTab] = state.routines[state.activeTab].filter(e => e.id !== exId);
        saveState();
        renderExercises();
    };

    // --- TEMPORIZADOR DE DESCANSO ---
    let timerInterval = null;
    let timerTime = 60;
    const timerWidget = document.getElementById('rest-timer-widget');
    const timerSecs = document.getElementById('timer-seconds');

    function startRestTimer(seconds) {
        if (!timerWidget || !timerSecs) return;
        clearInterval(timerInterval);
        timerTime = seconds;
        timerSecs.textContent = timerTime;
        timerWidget.classList.add('active');

        timerInterval = setInterval(() => {
            timerTime--;
            timerSecs.textContent = timerTime;
            if (timerTime === 10) speak('Diez segundos para volver');
            if (timerTime <= 0) {
                clearInterval(timerInterval);
                speak('¡Tiempo terminado! Vamos a la siguiente ronda.');
                showToast('¡Tiempo de descanso finalizado! 🔔');
                timerWidget.classList.remove('active');
            }
        }, 1000);
    }

    document.getElementById('btn-timer-add10')?.addEventListener('click', () => timerTime += 10);
    document.getElementById('btn-timer-toggle')?.addEventListener('click', () => {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        } else {
            startRestTimer(timerTime);
        }
    });
    document.getElementById('btn-timer-close')?.addEventListener('click', () => {
        clearInterval(timerInterval);
        if (timerWidget) timerWidget.classList.remove('active');
    });

    // --- MODALES, GRÁFICAS Y EXPORTACIÓN ---
    const modalStats = document.getElementById('modal-stats');
    const modalAdd = document.getElementById('modal-add-exercise');
    const modalExHistory = document.getElementById('modal-ex-history');

    document.getElementById('btn-toggle-stats')?.addEventListener('click', () => {
        if (modalStats) modalStats.classList.add('active');
        initCharts();
    });
    document.getElementById('btn-close-stats')?.addEventListener('click', () => modalStats?.classList.remove('active'));
    document.getElementById('btn-close-ex-history')?.addEventListener('click', () => modalExHistory?.classList.remove('active'));

    document.getElementById('btn-add-exercise-modal')?.addEventListener('click', () => {
        const currentPresetKey = state.selectedRoutine || 'ppl';
        const currentPreset = routinePresets[currentPresetKey] || routinePresets.ppl;
        const selectTab = document.getElementById('new-ex-tab');
        if (selectTab) {
            selectTab.innerHTML = currentPreset.tabs.map(tabKey => `
                <option value="${tabKey}">${currentPreset.tabLabels[tabKey] || tabKey}</option>
            `).join('');
        }
        modalAdd?.classList.add('active');
    });
    document.getElementById('btn-close-add-modal')?.addEventListener('click', () => modalAdd?.classList.remove('active'));

    document.getElementById('btn-save-new-exercise')?.addEventListener('click', () => {
        const tab = document.getElementById('new-ex-tab').value;
        const name = document.getElementById('new-ex-name').value.trim();
        const target = document.getElementById('new-ex-target').value.trim();

        if (name) {
            if (!state.routines[tab]) state.routines[tab] = [];
            state.routines[tab].push({
                id: 'custom_' + Date.now(),
                name: name,
                target: target || '3x10',
                alt: 'Opción ligera libre',
                express: true,
                sets: [{ weight: 10, reps: 10, rpe: 8 }]
            });
            saveState();
            modalAdd?.classList.remove('active');
            renderExercises();
            showToast('Ejercicio añadido con éxito');
        }
    });

    document.getElementById('btn-export-excel')?.addEventListener('click', exportToExcel);
    document.getElementById('btn-export-excel-modal')?.addEventListener('click', exportToExcel);

    // --- INICIALIZACIÓN COMPLETA ---
    renderModeUI();
    renderHeaderXP();
    renderPet();
    renderReadiness();
    renderStreak();
    renderWater();
    renderBadges();
    initThemeSwitcher();
    initNutrition();

    const currentPresetKey = state.selectedRoutine || 'ppl';
    if (routineSelect) routineSelect.value = currentPresetKey;
    
    const activePreset = routinePresets[currentPresetKey] || routinePresets.ppl;
    renderDynamicTabs(activePreset);
    renderExercises();
});