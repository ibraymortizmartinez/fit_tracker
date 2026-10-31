// assets/js/app.js
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DICCIONARIO COMPLETO DE PLANTILLAS DE ENTRENAMIENTO ---
    const routinePresets = {
        ppl: {
            tabs: ['push', 'pull', 'legs', 'crisol', 'neat'],
            tabLabels: { push: 'Empuje', pull: 'Tracción', legs: 'Pierna', crisol: 'El Crisol', neat: 'NEAT / Cardio' },
            data: {
                push: [
                    { id: 'p1', name: 'Floor Press con mancuernas (20 kg)', target: '4x6-8', alt: 'Flexiones declinadas o en pared', express: true, sets: [{ weight: 20, reps: 8, rpe: 8 }] },
                    { id: 'p2', name: 'Press Inclinado / Flexiones', target: '3x8-10', alt: 'Flexiones asistidas con rodillas', express: false, sets: [{ weight: 15, reps: 10, rpe: 7 }] },
                    { id: 'p3', name: 'Fondos en paralelas', target: '3x Al fallo (-2)', alt: 'Fondos en silla de hule o banco', express: false, sets: [{ weight: 0, reps: 12, rpe: 9 }] },
                    { id: 'p4', name: 'Press Militar con mancuernas', target: '3x8-10', alt: 'Elevaciones de brazos sin peso (movilidad)', express: true, sets: [{ weight: 14, reps: 10, rpe: 8 }] },
                    { id: 'p5', name: 'Elevaciones laterales', target: '4x12-15', alt: 'Elevaciones con botellas de agua', express: false, sets: [{ weight: 8, reps: 15, rpe: 9 }] }
                ],
                pull: [
                    { id: 'l1', name: 'Dominadas estrictas en barra fija', target: '4x Máximas', alt: 'Remo con toalla en puerta', express: true, sets: [{ weight: 0, reps: 8, rpe: 9 }] },
                    { id: 'l2', name: 'Remo con mancuerna a una mano', target: '4x8-10', alt: 'Remo con garrafón de agua', express: true, sets: [{ weight: 22, reps: 10, rpe: 8 }] },
                    { id: 'l3', name: 'Curl de bíceps (Spider / Preacher)', target: '4x10-12', alt: 'Curl con mochila con libros', express: false, sets: [{ weight: 12, reps: 12, rpe: 8 }] }
                ],
                legs: [
                    { id: 'lg1', name: 'Prensa o Sentadilla Goblet', target: '4x10-12', alt: 'Sentadilla a silla sin peso', express: true, sets: [{ weight: 24, reps: 12, rpe: 8 }] },
                    { id: 'lg2', name: 'Zancadas búlgaras con mancuernas', target: '3x10 por pierna', alt: 'Puente de glúteo en suelo (cero rodilla)', express: false, sets: [{ weight: 10, reps: 10, rpe: 8 }] },
                    { id: 'lg3', name: 'Peso Muerto Rumano', target: '4x10-12', alt: 'Buenos días sin peso / Flexión cadera', express: true, sets: [{ weight: 20, reps: 12, rpe: 7 }] }
                ],
                crisol: [
                    { id: 'c1', name: 'Circuito Metabólico - Vuelta 1', target: 'Dominadas + Fondos + Flexiones', alt: 'Movilidad continua en silla', express: true, sets: [{ weight: 0, reps: 15, rpe: 9 }] },
                    { id: 'c2', name: 'Circuito Metabólico - Vuelta 2', target: 'Dominadas + Fondos + Flexiones', alt: 'Pausas activas y estiramientos', express: false, sets: [{ weight: 0, reps: 15, rpe: 9 }] }
                ],
                neat: [
                    { id: 'n1', name: 'Ruta Centro ➔ Ávila Camacho', target: '3-4 km con pendientes', alt: 'Caminata en pasillo o jardín', express: true, sets: [{ km: 3.5, mins: 45, rpe: 5 }] },
                    { id: 'n2', name: 'Caminata nocturna de descarga', target: '30 mins ritmo ligero', alt: '10 mins estiramientos en cama', express: false, sets: [{ km: 2.0, mins: 30, rpe: 4 }] }
                ]
            }
        },
        torso_pierna: {
            tabs: ['torso1', 'pierna1', 'torso2', 'pierna2', 'neat'],
            tabLabels: { torso1: 'Torso A', pierna1: 'Pierna A', torso2: 'Torso B', pierna2: 'Pierna B', neat: 'NEAT / Cardio' },
            data: {
                torso1: [
                    { id: 'tp_t1', name: 'Press Banca / Floor Press', target: '4x8-10', alt: 'Flexiones en suelo', express: true, sets: [{ weight: 20, reps: 10, rpe: 8 }] },
                    { id: 'tp_t2', name: 'Remo con Mancuerna', target: '4x8-10', alt: 'Remo invertido en mesa', express: true, sets: [{ weight: 22, reps: 10, rpe: 8 }] }
                ],
                pierna1: [
                    { id: 'tp_p1', name: 'Sentadilla Goblet', target: '4x10-12', alt: 'Sentadilla libre sin peso', express: true, sets: [{ weight: 24, reps: 10, rpe: 8 }] },
                    { id: 'tp_p2', name: 'Peso Muerto Rumano', target: '4x10-12', alt: 'Flexión de cadera postural', express: true, sets: [{ weight: 20, reps: 12, rpe: 7 }] }
                ],
                torso2: [
                    { id: 'tp_t3', name: 'Press Militar', target: '4x8-10', alt: 'Elevaciones de hombro sin carga', express: true, sets: [{ weight: 14, reps: 8, rpe: 8 }] },
                    { id: 'tp_t4', name: 'Dominadas / Jalón', target: '4x8-10', alt: 'Remo con banda elástica', express: true, sets: [{ weight: 0, reps: 8, rpe: 8 }] }
                ],
                pierna2: [
                    { id: 'tp_p3', name: 'Zancadas con Peso', target: '3x10 por pierna', alt: 'Zancadas fijas sin peso', express: true, sets: [{ weight: 12, reps: 10, rpe: 8 }] }
                ],
                neat: [
                    { id: 'tp_n1', name: 'Caminata de Descarga', target: '30 mins', alt: 'Estiramientos suaves', express: true, sets: [{ km: 2.5, mins: 30, rpe: 4 }] }
                ]
            }
        },
        full_body: {
            tabs: ['sessionA', 'sessionB', 'sessionC', 'neat'],
            tabLabels: { sessionA: 'Día 1 (Full)', sessionB: 'Día 2 (Full)', sessionC: 'Día 3 (Full)', neat: 'NEAT / Cardio' },
            data: {
                sessionA: [
                    { id: 'fb_1', name: 'Sentadilla Goblet', target: '3x8-10', alt: 'Sentadilla a silla', express: true, sets: [{ weight: 20, reps: 10, rpe: 8 }] },
                    { id: 'fb_2', name: 'Floor Press con Mancuernas', target: '3x8-10', alt: 'Flexiones en suelo', express: true, sets: [{ weight: 20, reps: 10, rpe: 8 }] },
                    { id: 'fb_3', name: 'Remo a una mano', target: '3x10', alt: 'Remo con garrafón', express: true, sets: [{ weight: 18, reps: 10, rpe: 8 }] }
                ],
                sessionB: [
                    { id: 'fb_4', name: 'Peso Muerto Rumano', target: '3x10', alt: 'Puente de glúteo', express: true, sets: [{ weight: 20, reps: 10, rpe: 7 }] },
                    { id: 'fb_5', name: 'Press Militar', target: '3x10', alt: 'Flexiones pino asistidas', express: true, sets: [{ weight: 12, reps: 10, rpe: 8 }] },
                    { id: 'fb_6', name: 'Dominadas / Remo', target: '3x Máximas', alt: 'Remo con toalla', express: true, sets: [{ weight: 0, reps: 8, rpe: 8 }] }
                ],
                sessionC: [
                    { id: 'fb_7', name: 'Zancadas con peso', target: '3x12', alt: 'Zancadas libres', express: true, sets: [{ weight: 12, reps: 12, rpe: 8 }] },
                    { id: 'fb_8', name: 'Fondos en paralelas', target: '3x Al fallo', alt: 'Fondos en banco', express: true, sets: [{ weight: 0, reps: 10, rpe: 9 }] }
                ],
                neat: [
                    { id: 'fb_n1', name: 'Cardio Ligero', target: '20 mins', alt: 'Caminata rítmica', express: true, sets: [{ km: 2.0, mins: 20, rpe: 5 }] }
                ]
            }
        },
        arnold: {
            tabs: ['chest_back', 'shoulders_arms', 'legs_arnold', 'neat'],
            tabLabels: { chest_back: 'Pecho + Espalda', shoulders_arms: 'Hombro + Brazo', legs_arnold: 'Pierna', neat: 'NEAT / Cardio' },
            data: {
                chest_back: [
                    { id: 'arn_1', name: 'Floor Press + Remo con Mancuerna', target: '4x8-10', alt: 'Flexiones + Remo', express: true, sets: [{ weight: 20, reps: 10, rpe: 9 }] }
                ],
                shoulders_arms: [
                    { id: 'arn_2', name: 'Press Militar + Curl Bíceps', target: '4x10-12', alt: 'Elevaciones + Curl con botellas', express: true, sets: [{ weight: 12, reps: 12, rpe: 8 }] }
                ],
                legs_arnold: [
                    { id: 'arn_3', name: 'Sentadillas + Peso Muerto', target: '4x10', alt: 'Sentadilla libre + Puente', express: true, sets: [{ weight: 24, reps: 10, rpe: 8 }] }
                ],
                neat: [
                    { id: 'arn_n1', name: 'Caminata Urbana', target: '30 mins', alt: 'Caminata ligera', express: true, sets: [{ km: 3.0, mins: 30, rpe: 5 }] }
                ]
            }
        },
        calistenia: {
            tabs: ['push_cali', 'pull_cali', 'legs_cali', 'core_cali'],
            tabLabels: { push_cali: 'Empuje Corporal', pull_cali: 'Tracción Corporal', legs_cali: 'Piernas / Salto', core_cali: 'Core / Abdominales' },
            data: {
                push_cali: [
                    { id: 'cal_1', name: 'Flexiones strictly en suelo', target: '4x12-15', alt: 'Flexiones apoyando rodillas', express: true, sets: [{ weight: 0, reps: 15, rpe: 8 }] },
                    { id: 'cal_2', name: 'Fondos entre sillas', target: '3x10-12', alt: 'Fondos en suelo', express: true, sets: [{ weight: 0, reps: 12, rpe: 8 }] }
                ],
                pull_cali: [
                    { id: 'cal_3', name: 'Dominadas en barra fija', target: '4x Máximas', alt: 'Remo invertido bajo mesa', express: true, sets: [{ weight: 0, reps: 8, rpe: 9 }] }
                ],
                legs_cali: [
                    { id: 'cal_5', name: 'Sentadillas con salto explosivas', target: '4x15', alt: 'Sentadillas fluidas sin salto', express: true, sets: [{ weight: 0, reps: 15, rpe: 8 }] }
                ],
                core_cali: [
                    { id: 'cal_7', name: 'Plancha abdominal estática', target: '3x 45s', alt: 'Plancha apoyando rodillas', express: true, sets: [{ weight: 0, reps: 45, rpe: 8 }] }
                ]
            }
        }
    };

    const achievementBadges = [
        { id: 'b_first', name: 'Primer Paso', icon: 'fa-shoe-prints', desc: 'Registra tu primer día' },
        { id: 'b_streak7', name: '7 Días Invicto', icon: 'fa-fire-flame-curved', desc: 'Racha de 7 días' },
        { id: 'b_water', name: 'Tanque de Agua', icon: 'fa-faucet-drip', desc: 'Alcanza 3.0L de agua' },
        { id: 'b_level5', name: 'Cyber Guerrero', icon: 'fa-shield-halved', desc: 'Alcanza el Nivel 5' }
    ];

    // --- 2. ESTADO GLOBAL ---
    let state = JSON.parse(localStorage.getItem('cyberFit_universal_state')) || {
        streak: { count: 0, lastDate: null, history: {} },
        water: { current: 0, max: 3.0, date: new Date().toDateString(), history: {} },
        notes: '',
        xp: 0,
        level: 1,
        readiness: 5,
        restPasses: 3,
        userMode: 'tech', // 'tech' o 'easy'
        audioCoach: true,
        timeFilter: 'all', // 'all', '15', '8'
        selectedRoutine: 'ppl',
        unlockedBadges: [],
        completedExercises: {},
        routines: routinePresets.ppl.data,
        activeTab: 'push'
    };

    function saveState() {
        localStorage.setItem('cyberFit_universal_state', JSON.stringify(state));
    }

    function showToast(msg) {
        const toast = document.getElementById('toast');
        if (toast) {
            toast.textContent = msg;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 3000);
        }
    }

    // --- 3. SINTETIZADOR DE VOZ Y AUDIO-COACH ---
    function speak(text) {
        if (!state.audioCoach || !('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();
        const msg = new SpeechSynthesisUtterance(text);
        msg.lang = 'es-ES';
        msg.rate = 1.0;
        window.speechSynthesis.speak(msg);
    }

    // --- 4. MODO DE LENGUAJE (TÉCNICO / COTIDIANO) ---
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

    // Toggle Audio Coach
    const btnToggleAudio = document.getElementById('btn-toggle-audio');
    function updateAudioIcon() {
        if (btnToggleAudio) {
            btnToggleAudio.classList.toggle('active', state.audioCoach);
        }
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

    // --- 5. CYBER-MASCOTA EVOLUTIVA ---
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

    // --- 6. MEDIDOR DE BATERÍA DIARIA (READINESS) ---
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

    // --- 7. GAMIFICACIÓN & XP ---
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

    // --- 8. CUENTA REGRESIVA ---
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

    // --- 9. RACHA & ANTI-CULPA ---
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

    // --- 10. HIDRATACIÓN ---
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

    // --- 11. FILTRO DE TIEMPO DISPONIBLE ---
    document.querySelectorAll('.time-chips .chip').forEach(chip => {
        chip.addEventListener('click', () => {
            document.querySelectorAll('.time-chips .chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            state.timeFilter = chip.getAttribute('data-time');
            renderExercises();
        });
    });

    // --- 12. GESTIÓN DE RUTINAS, PESTAÑAS Y EJERCICIOS ---
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

    // Metodos Globales vinculados al HTML
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

    // --- 13. TEMPORIZADOR DE DESCANSO ---
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
            
            if (timerTime === 10) {
                speak('Diez segundos para volver');
            }

            if (timerTime <= 0) {
                clearInterval(timerInterval);
                speak('¡Tiempo terminado! Vamos a la siguiente ronda.');
                showToast('¡Tiempo de descanso finalizado! 🔔');
                timerWidget.classList.remove('active');
            }
        }, 1000);
    }

    const btnTimerAdd10 = document.getElementById('btn-timer-add10');
    const btnTimerToggle = document.getElementById('btn-timer-toggle');
    const btnTimerClose = document.getElementById('btn-timer-close');

    if (btnTimerAdd10) btnTimerAdd10.addEventListener('click', () => timerTime += 10);
    if (btnTimerToggle) {
        btnTimerToggle.addEventListener('click', () => {
            if (timerInterval) {
                clearInterval(timerInterval);
                timerInterval = null;
            } else {
                startRestTimer(timerTime);
            }
        });
    }
    if (btnTimerClose) {
        btnTimerClose.addEventListener('click', () => {
            clearInterval(timerInterval);
            if (timerWidget) timerWidget.classList.remove('active');
        });
    }

    // --- 14. MODALES, GRÁFICAS Y EXPORTACIÓN ---
    const modalStats = document.getElementById('modal-stats');
    const modalAdd = document.getElementById('modal-add-exercise');
    const btnToggleStats = document.getElementById('btn-toggle-stats');
    const btnCloseStats = document.getElementById('btn-close-stats');
    const btnAddModal = document.getElementById('btn-add-exercise-modal');
    const btnCloseAddModal = document.getElementById('btn-close-add-modal');

    if (btnToggleStats) {
        btnToggleStats.addEventListener('click', () => {
            if (modalStats) modalStats.classList.add('active');
            initCharts();
        });
    }
    if (btnCloseStats && modalStats) btnCloseStats.addEventListener('click', () => modalStats.classList.remove('active'));
    if (btnAddModal && modalAdd) btnAddModal.addEventListener('click', () => modalAdd.classList.add('active'));
    if (btnCloseAddModal && modalAdd) btnCloseAddModal.addEventListener('click', () => modalAdd.classList.remove('active'));

    const btnSaveNewEx = document.getElementById('btn-save-new-exercise');
    if (btnSaveNewEx) {
        btnSaveNewEx.addEventListener('click', () => {
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
                if (modalAdd) modalAdd.classList.remove('active');
                renderExercises();
                showToast('Ejercicio añadido con éxito');
            }
        });
    }

    let chartVolInstance = null;
    let chartWaterInstance = null;

    function initCharts() {
        if (typeof Chart === 'undefined') return;
        if (chartVolInstance) chartVolInstance.destroy();
        if (chartWaterInstance) chartWaterInstance.destroy();

        const canvasVol = document.getElementById('chart-volume');
        if (canvasVol) {
            chartVolInstance = new Chart(canvasVol.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: ['Empuje', 'Tracción', 'Pierna', 'Crisol'],
                    datasets: [{
                        label: 'Volumen Estimado (kg)',
                        data: [1200, 1450, 1800, 950],
                        backgroundColor: '#00f2fe'
                    }]
                },
                options: { responsive: true, plugins: { legend: { labels: { color: '#f8fafc' } } } }
            });
        }

        const canvasWater = document.getElementById('chart-water');
        if (canvasWater) {
            chartWaterInstance = new Chart(canvasWater.getContext('2d'), {
                type: 'line',
                data: {
                    labels: Object.keys(state.water.history).slice(-7),
                    datasets: [{
                        label: 'Litros Consumidos',
                        data: Object.values(state.water.history).slice(-7),
                        borderColor: '#4facfe',
                        tension: 0.3
                    }]
                },
                options: { responsive: true, plugins: { legend: { labels: { color: '#f8fafc' } } } }
            });
        }
    }

    // Respaldo JSON y CSV
    const btnExportJson = document.getElementById('btn-export-json');
    if (btnExportJson) {
        btnExportJson.addEventListener('click', () => {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state));
            const anchor = document.createElement('a');
            anchor.setAttribute("href", dataStr);
            anchor.setAttribute("download", `cyberfit_backup_${new Date().toISOString().split('T')[0]}.json`);
            document.body.appendChild(anchor);
            anchor.click();
            anchor.remove();
        });
    }

    const inputImportJson = document.getElementById('import-json-input');
    if (inputImportJson) {
        inputImportJson.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    state = JSON.parse(event.target.result);
                    saveState();
                    location.reload();
                } catch(err) {
                    showToast('Archivo JSON inválido');
                }
            };
            reader.readAsText(file);
        });
    }

    // --- 15. INICIALIZACIÓN COMPLETA DE LA APLICACIÓN ---
    renderModeUI();
    renderHeaderXP();
    renderPet();
    renderReadiness();
    renderStreak();
    renderWater();
    renderBadges();

    // Sincronizar el selector visual con la rutina guardada
    const currentPresetKey = state.selectedRoutine || 'ppl';
    if (routineSelect) {
        routineSelect.value = currentPresetKey;
    }
    
    // Cargar la plantilla activa y construir las pestañas
    const activePreset = routinePresets[currentPresetKey] || routinePresets.ppl;
    renderDynamicTabs(activePreset);
    renderExercises();
});