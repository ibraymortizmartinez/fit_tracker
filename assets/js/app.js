// assets/js/app.js
document.addEventListener('DOMContentLoaded', () => {
    // --- ESTADO INICIAL DE LA APLICACIÓN ---
    const defaultRoutines = {
        push: [
            { id: 'p1', name: 'Floor Press con mancuernas (20 kg)', target: '4x6-8', sets: [{ weight: 20, reps: 8, rpe: 8 }] },
            { id: 'p2', name: 'Press Inclinado / Flexiones Declinadas', target: '3x8-10', sets: [{ weight: 15, reps: 10, rpe: 7 }] },
            { id: 'p3', name: 'Fondos en paralelas', target: '3x Al fallo (-2)', sets: [{ weight: 0, reps: 12, rpe: 9 }] },
            { id: 'p4', name: 'Press Militar con mancuernas', target: '3x8-10', sets: [{ weight: 14, reps: 10, rpe: 8 }] },
            { id: 'p5', name: 'Elevaciones laterales', target: '4x12-15', sets: [{ weight: 8, reps: 15, rpe: 9 }] }
        ],
        pull: [
            { id: 'l1', name: 'Dominadas estrictas en barra fija', target: '4x Máximas', sets: [{ weight: 0, reps: 8, rpe: 9 }] },
            { id: 'l2', name: 'Remo con mancuerna a una mano', target: '4x8-10', sets: [{ weight: 22, reps: 10, rpe: 8 }] },
            { id: 'l3', name: 'Curl de bíceps (Spider / Preacher)', target: '4x10-12', sets: [{ weight: 12, reps: 12, rpe: 8 }] }
        ],
        legs: [
            { id: 'lg1', name: 'Prensa o Sentadilla Goblet', target: '4x10-12', sets: [{ weight: 24, reps: 12, rpe: 8 }] },
            { id: 'lg2', name: 'Zancadas búlgaras con mancuernas', target: '3x10 por pierna', sets: [{ weight: 10, reps: 10, rpe: 8 }] },
            { id: 'lg3', name: 'Peso Muerto Rumano', target: '4x10-12', sets: [{ weight: 20, reps: 12, rpe: 7 }] }
        ],
        crisol: [
            { id: 'c1', name: 'Circuito Metabólico - Vuelta 1', target: 'Dominadas + Fondos + Flexiones', sets: [{ weight: 0, reps: 15, rpe: 9 }] },
            { id: 'c2', name: 'Circuito Metabólico - Vuelta 2', target: 'Dominadas + Fondos + Flexiones', sets: [{ weight: 0, reps: 15, rpe: 9 }] }
        ],
        neat: [
            { id: 'n1', name: 'Ruta Centro ➔ Ávila Camacho', target: '3-4 km con pendientes', sets: [{ km: 3.5, mins: 45, rpe: 5 }] },
            { id: 'n2', name: 'Caminata nocturna de descarga', target: '30 mins ritmo ligero', sets: [{ km: 2.0, mins: 30, rpe: 4 }] }
]
    };

    const achievementBadges = [
        { id: 'b_first', name: 'Primer Paso', icon: 'fa-shoe-prints', desc: 'Registra tu primer día' },
        { id: 'b_streak7', name: '7 Días Invicto', icon: 'fa-fire-flame-curved', desc: 'Racha de 7 días' },
        { id: 'b_water', name: 'Tanque de Agua', icon: 'fa-faucet-drip', desc: 'Alcanza 3.0L de agua' },
        { id: 'b_level5', name: 'Cyber Guerrero', icon: 'fa-shield-halved', desc: 'Alcanza el Nivel 5' }
    ];

    let state = JSON.parse(localStorage.getItem('cyberFit_state')) || {
        streak: { count: 0, lastDate: null, history: {} },
        water: { current: 0, max: 3.0, date: new Date().toDateString(), history: {} },
        notes: '',
        xp: 0,
        level: 1,
        unlockedBadges: [],
        completedExercises: {},
        routines: defaultRoutines,
        activeTab: 'push'
    };

    // --- HELPER AUDIO SINTETIZADOR (WEB AUDIO API) ---
    function playSound(type) {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);

            if (type === 'checkin') {
                osc.frequency.setValueAtTime(440, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.2);
                gain.gain.setValueAtTime(0.3, ctx.currentTime);
                osc.start();
                osc.stop(ctx.currentTime + 0.2);
            } else if (type === 'timer_end') {
                osc.type = 'square';
                osc.frequency.setValueAtTime(600, ctx.currentTime);
                gain.gain.setValueAtTime(0.4, ctx.currentTime);
                osc.start();
                osc.stop(ctx.currentTime + 0.4);
            }
        } catch(e) {}
    }

    function saveState() {
        localStorage.setItem('cyberFit_state', JSON.stringify(state));
    }

    function showToast(msg) {
        const toast = document.getElementById('toast');
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }

    // --- GAMIFICACIÓN & XP ---
    function addXP(amount) {
        state.xp += amount;
        const nextLevelXP = state.level * 100;
        if (state.xp >= nextLevelXP) {
            state.level += 1;
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
            showToast(`¡SUBISTE DE NIVEL! Ahora eres Nivel ${state.level} 🚀`);
        }
        checkBadges();
        renderHeaderXP();
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

    // --- RACHA & HEATMAP ---
    const btnCheckin = document.getElementById('btn-checkin');
    function renderStreak() {
        document.getElementById('streak-count').textContent = state.streak.count;
        const todayStr = new Date().toDateString();
        if (state.streak.lastDate === todayStr) {
            btnCheckin.disabled = true;
            btnCheckin.textContent = 'Día Registrado ✓';
        } else {
            btnCheckin.disabled = false;
            btnCheckin.innerHTML = '<i class="fa-solid fa-check"></i> Registrar Día de Hoy (+50 XP)';
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
            const active = state.streak.history[dateStr] ? 'active' : '';
            grid.innerHTML += `<div class="heatmap-day ${active}" title="${dateStr}"></div>`;
        }
    }

    btnCheckin.addEventListener('click', () => {
        const todayStr = new Date().toDateString();
        const isoToday = new Date().toISOString().split('T')[0];
        state.streak.count += 1;
        state.streak.lastDate = todayStr;
        state.streak.history[isoToday] = true;
        playSound('checkin');
        addXP(50);
        renderStreak();
        showToast('¡Día completado! +50 XP 🔥');
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

    // --- BITÁCORA RÁPIDA ---
    const notesEl = document.getElementById('daily-notes');
    notesEl.value = state.notes || '';
    document.getElementById('btn-save-notes').addEventListener('click', () => {
        state.notes = notesEl.value;
        saveState();
        showToast('Nota guardada correctamente 📝');
    });

    // --- RUTINAS Y EJERCICIOS (SET LOGGING & CRUD) ---
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
    const exercises = state.routines[state.activeTab] || [];
    
    // Detectamos si la pestaña actual es Cardio/NEAT
    const isCardio = state.activeTab === 'neat';

    area.innerHTML = exercises.map(ex => {
        const isCompleted = state.completedExercises[ex.id] || false;
        return `
        <div class="exercise-card ${isCompleted ? 'completed' : ''}">
            <div class="exercise-header">
                <div class="exercise-title">
                    <input type="checkbox" ${isCompleted ? 'checked' : ''} onchange="toggleExercise('${ex.id}')">
                    <span>${ex.name}</span>
                </div>
                <div style="display:flex; gap:10px; align-items:center;">
                    <span class="exercise-target">${ex.target}</span>
                    <button class="btn-del-ex" onclick="deleteExercise('${ex.id}')"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
            <table class="sets-table">
                <thead>
                    <tr>
                        <th>${isCardio ? 'Sesión' : 'Serie'}</th>
                        <th>${isCardio ? 'Km' : 'Kg'}</th>
                        <th>${isCardio ? 'Mins' : 'Reps'}</th>
                        <th>RPE</th>
                    </tr>
                </thead>
                <tbody>
                    ${(ex.sets || []).map((s, idx) => `
                        <tr>
                            <td>#${idx + 1}</td>
                            <td><input type="number" step="0.1" placeholder="${isCardio ? 'Km' : 'Kg'}" value="${s.weight ?? s.km ?? 0}" onchange="updateSet('${ex.id}', ${idx}, '${isCardio ? 'km' : 'weight'}', this.value)"></td>
                            <td><input type="number" placeholder="${isCardio ? 'Mins' : 'Reps'}" value="${s.reps ?? s.mins ?? 0}" onchange="updateSet('${ex.id}', ${idx}, '${isCardio ? 'mins' : 'reps'}', this.value)"></td>
                            <td><input type="number" placeholder="1-10" value="${s.rpe ?? 5}" onchange="updateSet('${ex.id}', ${idx}, 'rpe', this.value)"></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <button class="btn-add-set" onclick="addSet('${ex.id}')">+ Agregar ${isCardio ? 'Tramo / Sesión' : 'Serie'}</button>
        </div>`;
    }).join('');
}

    window.toggleExercise = function(id) {
        state.completedExercises[id] = !state.completedExercises[id];
        if (state.completedExercises[id]) {
            addXP(20);
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

    // --- TEMPORIZADOR DE DESCANSO ---
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
            if (timerTime <= 0) {
                clearInterval(timerInterval);
                playSound('timer_end');
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

    document.getElementById('btn-export-csv').addEventListener('click', () => {
        let csvContent = "data:text/csv;charset=utf-8,Categoria,Ejercicio,Objetivo\n";
        Object.keys(state.routines).forEach(cat => {
            state.routines[cat].forEach(ex => {
                csvContent += `"${cat}","${ex.name}","${ex.target}"\n`;
            });
        });
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "cyberfit_rutinas.csv");
        document.body.appendChild(link);
        link.click();
        link.remove();
    });

    // --- INICIALIZACIÓN ---
    renderHeaderXP();
    renderStreak();
    renderWater();
    renderBadges();
    renderExercises();
});