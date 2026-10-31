// assets/js/app.js
document.addEventListener('DOMContentLoaded', () => {
    // --- RUTINAS POR DEFECTO CON SUSTITUTOS DE ADAPTABILIDAD ---
    const defaultRoutines = {
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
    };

    const achievementBadges = [
        { id: 'b_first', name: 'Primer Paso', icon: 'fa-shoe-prints', desc: 'Registra tu primer día' },
        { id: 'b_streak7', name: '7 Días Invicto', icon: 'fa-fire-flame-curved', desc: 'Racha de 7 días' },
        { id: 'b_water', name: 'Tanque de Agua', icon: 'fa-faucet-drip', desc: 'Alcanza 3.0L de agua' },
        { id: 'b_level5', name: 'Cyber Guerrero', icon: 'fa-shield-halved', desc: 'Alcanza el Nivel 5' }
    ];

    // --- ESTADO GLOBAL ---
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
        unlockedBadges: [],
        completedExercises: {},
        routines: defaultRoutines,
        activeTab: 'push'
    };

    function saveState() {
        localStorage.setItem('cyberFit_universal_state', JSON.stringify(state));
    }

    function showToast(msg) {
        const toast = document.getElementById('toast');
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }

    // --- SINTETIZADOR DE VOZ Y AUDIO-COACH ---
    function speak(text) {
        if (!state.audioCoach || !('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();
        const msg = new SpeechSynthesisUtterance(text);
        msg.lang = 'es-ES';
        msg.rate = 1.0;
        window.speechSynthesis.speak(msg);
    }

    // --- MODO DE LENGUAJE (TÉCNICO / COTIDIANO) ---
    const btnToggleMode = document.getElementById('btn-toggle-mode');
    const modeLabel = document.getElementById('mode-label');

    function renderModeUI() {
        if (state.userMode === 'easy') {
            modeLabel.textContent = 'Modo Cotidiano';
            btnToggleMode.style.borderColor = 'var(--accent-purple)';
        } else {
            modeLabel.textContent = 'Modo Técnico';
            btnToggleMode.style.borderColor = 'var(--accent-cyan)';
        }
        renderExercises();
    }

    btnToggleMode.addEventListener('click', () => {
        state.userMode = state.userMode === 'tech' ? 'easy' : 'tech';
        saveState();
        renderModeUI();
        speak(`Modo cambiados a ${state.userMode === 'easy' ? 'cotidiano' : 'técnico'}`);
    });

    // Toggle Audio Coach
    const btnToggleAudio = document.getElementById('btn-toggle-audio');
    function updateAudioIcon() {
        btnToggleAudio.classList.toggle('active', state.audioCoach);
    }
    btnToggleAudio.addEventListener('click', () => {
        state.audioCoach = !state.audioCoach;
        updateAudioIcon();
        saveState();
        showToast(state.audioCoach ? 'Audio Coach Activado 🔊' : 'Audio Coach Silenciado 🔇');
    });
    updateAudioIcon();

    // --- CYBER-MASCOTA EVOLUTIVA ---
    function renderPet() {
        const nameEl = document.getElementById('pet-name');
        const statusEl = document.getElementById('pet-status');
        const iconEl = document.getElementById('pet-icon');

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

    // --- MEDIDOR DE BATERÍA DIARIA (READINESS) ---
    const readinessSlider = document.getElementById('readiness-slider');
    const readinessDisplay = document.getElementById('readiness-val-display');

    function renderReadiness() {
        readinessSlider.value = state.readiness;
        readinessDisplay.textContent = `${state.readiness}/5 (${state.readiness * 20}%)`;
    }

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

    // --- GAMIFICACIÓN & XP ---
    function addXP(amount) {
        state.xp += amount;
        const nextLevelXP = state.level * 100;
        if (state.xp >= nextLevelXP) {
            state.level += 1;
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
            speak(`¡Felicidades! Subiste al nivel ${state.level}`);
            showToast(`¡SUBISTE DE NIVEL! Nivel ${state.level} 🚀`);
        }
        checkBadges();
        renderHeaderXP();
        renderPet();
        saveState();
    }

    function renderHeaderXP() {
        document.getElementById('user-level').textContent = state.level;
        const currentLevelBaseXP = (state.level - 1) * 100;
        const progress = ((state.xp - currentLevelBaseXP) / 100) * 100;
        document.getElementById('xp-fill-mini').style.width = `${Math.min(progress, 100)}%`;
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
        const now = new Date().getTime();
        const dist = targetDate - now;
        if (dist < 0) {
            document.getElementById('countdown-text').textContent = "¡Meta Alcanzada!";
            return;
        }
        const d = Math.floor(dist / (1000 * 60 * 60 * 24));
        const h = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById('countdown-text').textContent = `${d}d ${h}h ${m}m para el 18 Nov`;
    }
    setInterval(updateCountdown, 1000);
    updateCountdown();

    // --- RACHA & ANTI-CULPA ---
    const btnCheckin = document.getElementById('btn-checkin');
    const btnRestPass = document.getElementById('btn-rest-pass');

    function renderStreak() {
        document.getElementById('streak-count').textContent = state.streak.count;
        document.getElementById('rest-passes-count').textContent = state.restPasses;
        const todayStr = new Date().toDateString();
        
        if (state.streak.lastDate === todayStr) {
            btnCheckin.disabled = true;
            btnCheckin.textContent = 'Día Registrado ✓';
            btnRestPass.disabled = true;
        } else {
            btnCheckin.disabled = false;
            btnCheckin.innerHTML = '<i class="fa-solid fa-check"></i> Registrar Día (+50 XP)';
            btnRestPass.disabled = state.restPasses <= 0;
        }
        renderHeatmap();
    }

    function renderHeatmap() {
        const grid = document.getElementById('heatmap-grid');
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

    // --- HIDRATACIÓN ---
    const todayStr = new Date().toDateString();
    if (state.water.date !== todayStr) {
        state.water.current = 0;
        state.water.date = todayStr;
    }

    function renderWater() {
        const pct = Math.min((state.water.current / state.water.max) * 100, 100);
        document.getElementById('water-progress').style.width = `${pct}%`;
        document.getElementById('water-status').textContent = `${state.water.current.toFixed(2)} / ${state.water.max} L`;
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

    document.getElementById('btn-reset-water').addEventListener('click', () => {
        state.water.current = 0;
        renderWater();
        saveState();
    });

    // --- FILTRO DE TIEMPO DISPONIBLE ---
    document.querySelectorAll('.time-chips .chip').forEach(chip => {
        chip.addEventListener('click', () => {
            document.querySelectorAll('.time-chips .chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            state.timeFilter = chip.getAttribute('data-time');
            renderExercises();
        });
    });

    // --- RUTINAS Y EJERCICIOS (UNIVERSAL & SUSTITUCIONES) ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.activeTab = btn.getAttribute('data-tab');
            renderExercises();
        });
    });

    function renderExercises() {
        const area = document.getElementById('tab-content-area');
        let exercises = state.routines[state.activeTab] || [];
        const isCardio = state.activeTab === 'neat';
        const isEasy = state.userMode === 'easy';

        // Filtrar si está activado Express o Micro
        if (state.timeFilter === '15') {
            exercises = exercises.filter(e => e.express);
        } else if (state.timeFilter === '8') {
            exercises = exercises.slice(0, 1);
        }

        area.innerHTML = exercises.map(ex => {
            const isCompleted = state.completedExercises[ex.id] || false;
            
            // Ajustar series por Batería Baja (Readiness)
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

    window.substituteExercise = function(id) {
        const list = state.routines[state.activeTab];
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
        const ex = list.find(e => e.id === exId);
        if (ex && ex.sets[setIdx]) {
            ex.sets[setIdx][field] = parseFloat(value) || 0;
            saveState();
        }
    };

    window.addSet = function(exId) {
        const list = state.routines[state.activeTab];
        const ex = list.find(e => e.id === exId);
        if (ex) {
            const lastSet = ex.sets[ex.sets.length - 1] || { weight: 10, reps: 10, rpe: 8 };
            ex.sets.push({ ...lastSet });
            saveState();
            renderExercises();
        }
    };

    window.deleteExercise = function(exId) {
        state.routines[state.activeTab] = state.routines[state.activeTab].filter(e => e.id !== exId);
        saveState();
        renderExercises();
    };

    // --- TEMPORIZADOR CON AUDIO-COACH ---
    let timerInterval = null;
    let timerTime = 60;
    const timerWidget = document.getElementById('rest-timer-widget');
    const timerSecs = document.getElementById('timer-seconds');

    function startRestTimer(seconds) {
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

    document.getElementById('btn-timer-add10').addEventListener('click', () => timerTime += 10);
    document.getElementById('btn-timer-toggle').addEventListener('click', () => {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        } else {
            startRestTimer(timerTime);
        }
    });
    document.getElementById('btn-timer-close').addEventListener('click', () => {
        clearInterval(timerInterval);
        timerWidget.classList.remove('active');
    });

    // --- MODALES & GRÁFICAS ---
    const modalStats = document.getElementById('modal-stats');
    const modalAdd = document.getElementById('modal-add-exercise');

    document.getElementById('btn-toggle-stats').addEventListener('click', () => {
        modalStats.classList.add('active');
        initCharts();
    });
    document.getElementById('btn-close-stats').addEventListener('click', () => modalStats.classList.remove('active'));
    document.getElementById('btn-add-exercise-modal').addEventListener('click', () => modalAdd.classList.add('active'));
    document.getElementById('btn-close-add-modal').addEventListener('click', () => modalAdd.classList.remove('active'));

    document.getElementById('btn-save-new-exercise').addEventListener('click', () => {
        const tab = document.getElementById('new-ex-tab').value;
        const name = document.getElementById('new-ex-name').value.trim();
        const target = document.getElementById('new-ex-target').value.trim();

        if (name) {
            state.routines[tab].push({
                id: 'custom_' + Date.now(),
                name: name,
                target: target || '3x10',
                alt: 'Opción ligera libre',
                express: true,
                sets: [{ weight: 10, reps: 10, rpe: 8 }]
            });
            saveState();
            modalAdd.classList.remove('active');
            renderExercises();
            showToast('Ejercicio añadido con éxito');
        }
    });

    let chartVolInstance = null;
    let chartWaterInstance = null;

    function initCharts() {
        if (chartVolInstance) chartVolInstance.destroy();
        if (chartWaterInstance) chartWaterInstance.destroy();

        const ctxVol = document.getElementById('chart-volume').getContext('2d');
        chartVolInstance = new Chart(ctxVol, {
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

        const ctxWater = document.getElementById('chart-water').getContext('2d');
        chartWaterInstance = new Chart(ctxWater, {
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

    // --- RESPALDO JSON & CSV ---
    document.getElementById('btn-export-json').addEventListener('click', () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state));
        const anchor = document.createElement('a');
        anchor.setAttribute("href", dataStr);
        anchor.setAttribute("download", `cyberfit_backup_${new Date().toISOString().split('T')[0]}.json`);
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
    });

    document.getElementById('import-json-input').addEventListener('change', (e) => {
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

    // --- INICIALIZACIÓN ---
    renderModeUI();
    renderHeaderXP();
    renderPet();
    renderReadiness();
    renderStreak();
    renderWater();
    renderBadges();
    renderExercises();
});